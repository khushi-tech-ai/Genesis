'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const AttendanceTrendChartInner = dynamic(() => import('./AttendanceTrendChartInner'), { ssr: false });

export default function AttendanceTrendChart() {
  return <AttendanceTrendChartInner />;
}