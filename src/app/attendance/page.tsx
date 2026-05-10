import React from 'react';
import StaffLayout from '@/components/StaffLayout';
import AttendanceContent from './components/AttendanceContent';

export default function AttendancePage() {
  return (
    <StaffLayout>
      <AttendanceContent />
    </StaffLayout>
  );
}
