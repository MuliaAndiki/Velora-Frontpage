'use client';
import { useState } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import ReportHeroSection from '@/core/section/private/report/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { PopupInterface } from '@/types/ui';

const ReportContainer = () => {
  const [popUpModal, setPopUpModal] = useState<PopupInterface>(null);
  const namespace = useAppNameSpase();
  const service = useServices();
  const reportQuery = service.Report.query();
  const reportCreate = service.Report.mutation.useCreateReport();
  const reportDelete = service.Report.mutation.useDeleteReport();
  const reportDownload = service.Report.mutation.useDownloadReport();

  const handleDelete = (id: string): void => {
    reportDelete.mutate(id);
  };

  const handleDownload = (fileUrl: string): void => {
    reportDownload.mutate(fileUrl);
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <ReportHeroSection
          reports={reportQuery.useGetReports ?? []}
          reportSummary={reportQuery.useGetReportSummary ?? {}}
          isLoading={reportQuery.isLoading}
          isPending={reportCreate.isPending || reportDelete.isPending}
          onDelete={handleDelete}
          onDownload={handleDownload}
          popUpModal={popUpModal}
          setPopUpModal={setPopUpModal}
          createReportMutation={reportCreate}
        />
      </Container>
    </SidebarLayout>
  );
};

export default ReportContainer;
