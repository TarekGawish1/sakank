import React from 'react';
import { EmptyState as SharedEmptyState } from '../../../components';

export const EmptyState = () => {
  return (
    <SharedEmptyState
      icon="Inbox"
      title="لا توجد طلبات"
      description="ابدأ بإرسال أول طلب سكن."
      primaryButtonTitle="استكشف العقارات"
      primaryButtonOnPress={() => {}}
    />
  );
};
