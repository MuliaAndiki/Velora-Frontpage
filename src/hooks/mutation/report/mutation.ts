import { useAlert } from '@/hooks/useAlert/costum-alert';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { useMutation } from '@tanstack/react-query';

interface GenerateReportParams {
  startDate: string;
  endDate: string;
  type: 'transactions' | 'budgets' | 'goals';
  format: 'pdf' | 'excel' | 'csv';
}

export function useGenerateReport(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();

  return useMutation<TResponse<any>, Error, GenerateReportParams>({
    mutationFn: (params: GenerateReportParams) => Api.Report.generateReport(params),
    onSuccess: async (res, variables) => {
      try {
        const blob = await Api.Report.downloadReport(res.data.fileUrl);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report-${variables.type}-${variables.format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        alert.toast({
          title: 'Success',
          message: 'Report generated successfully',
          icon: 'success',
          onVoid: () => {
            options?.onAfterSuccess?.();
          },
        });
      } catch (err) {
        console.error(err);
        alert.toast({
          title: 'Failed',
          message: 'Failed to download report',
          icon: 'error',
        });
      }
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Failed',
        message: 'Failed to generate report',
        icon: 'error',
      });
    },
  });
}
