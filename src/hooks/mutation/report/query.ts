import { useQuery } from '@tanstack/react-query';

import Api from '@/services/props.service';

export function useReportData(id?: string) {
  const useGetReports = useQuery({
    queryKey: ['reports'],
    queryFn: () => Api.Report.getAll(),
    staleTime: 1000 * 60 * 5,
  });
  const useGetReportById = useQuery({
    queryKey: ['reports', id],
    queryFn: () => Api.Report.getById(id!),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
  const useGetReportSummary = useQuery({
    queryKey: ['report'],
    queryFn: () => Api.Report.getSummary(),
    staleTime: 1000 * 60 * 5,
  });
  return {
    useGetReports: useGetReports.data?.data ?? [],
    useGetReportById: useGetReportById.data?.data ?? '',
    useGetReportSummary: useGetReportSummary.data?.data ?? '',
    isLoading:
      useGetReports.isLoading || useGetReportById.isLoading || useGetReportSummary.isLoading,
    isError: useGetReports.error || useGetReportById.error || useGetReportSummary.error,
    refectAll: () => {
      useGetReports.refetch();
      useGetReportById.refetch();
      useGetReportSummary.refetch();
    },
  };
}
