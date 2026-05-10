import React from 'react';
import StaffLayout from '@/components/StaffLayout';
import ParticipantLifecycleContent from '@/app/participant-lifecycle/components/ParticipantLifecycleContent';

export default function JourneyPage() {
  return (
    <StaffLayout>
      <ParticipantLifecycleContent />
    </StaffLayout>
  );
}
