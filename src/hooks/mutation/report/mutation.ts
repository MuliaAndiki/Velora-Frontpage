import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAlert } from '@/hooks/useAlert/costum-alert';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormCreateReport } from '@/types/form/report.form';

const ReportMutation = {
  useCreateReport() {
    const namespace = useAppNameSpase();

    return useMutation<TResponse<any>, Error, FormCreateReport>({
      mutationFn: (payload: FormCreateReport) => Api.Report.create(payload),
      onSuccess: (res) => {
        namespace.queryClient.invalidateQueries({ queryKey: ['reports'] });
        namespace.alert.toast({
          title: 'Success',
          message: 'Report created successfully',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'Failed',
          message: 'Failed to create report',
          icon: 'error',
        });
      },
    });
  },
  useDeleteReport() {
    const namespace = useAppNameSpase();

    return useMutation<TResponse<any>, Error, string>({
      mutationFn: (id: string) => Api.Report.delete(id),
      onSuccess: (res) => {
        namespace.queryClient.invalidateQueries({ queryKey: ['reports'] });
        namespace.alert.toast({
          title: 'Success',
          message: 'Report deleted successfully',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'Failed',
          message: 'Failed to delete report',
          icon: 'error',
        });
      },
    });
  },
  useDownloadReport() {
    const namespace = useAppNameSpase();

    return useMutation<Blob, Error, string>({
      mutationFn: (fileUrl: string) => Api.Report.downloadReport(fileUrl),
      onSuccess: (blob, fileUrl) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report-${new Date().getTime()}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        namespace.alert.toast({
          title: 'Success',
          message: 'Report downloaded successfully',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'Failed',
          message: 'Failed to download report',
          icon: 'error',
        });
      },
    });
  },
};

export default ReportMutation;
