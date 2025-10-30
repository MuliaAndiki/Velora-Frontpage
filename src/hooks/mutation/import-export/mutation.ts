import { useMutation } from '@tanstack/react-query';

import { useAlert } from '@/hooks/useAlert/costum-alert';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';

interface ExportParams {
  type: 'all' | 'transactions' | 'budgets' | 'goals' | 'categories';
  format: 'json' | 'csv';
}

interface ImportParams {
  file: File;
  type: 'transactions' | 'budgets' | 'goals' | 'categories';
}

export function useExportData(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();

  return useMutation<TResponse<any>, Error, ExportParams>({
    mutationFn: (params: ExportParams) => Api.ImportExport.exportData(params),
    onSuccess: async (res, variables) => {
      try {
        const blob = await Api.ImportExport.downloadExport(res.data.fileUrl);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export-${variables.type}-${variables.format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        alert.toast({
          title: 'Success',
          message: 'Data exported successfully',
          icon: 'success',
          onVoid: () => {
            options?.onAfterSuccess?.();
          },
        });
      } catch (err) {
        console.error(err);
        alert.toast({
          title: 'Failed',
          message: 'Failed to download export',
          icon: 'error',
        });
      }
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Failed',
        message: 'Failed to export data',
        icon: 'error',
      });
    },
  });
}

export function useImportData(options?: { onAfterSuccess?: () => void }) {
  const alert = useAlert();

  return useMutation<TResponse<any>, Error, ImportParams>({
    mutationFn: (params: ImportParams) => Api.ImportExport.importData(params.file, params.type),
    onSuccess: (res) => {
      alert.toast({
        title: 'Success',
        message: 'Data imported successfully',
        icon: 'success',
        onVoid: () => {
          options?.onAfterSuccess?.();
        },
      });
    },
    onError: (err) => {
      console.error(err);
      alert.toast({
        title: 'Failed',
        message: 'Failed to import data',
        icon: 'error',
      });
    },
  });
}
