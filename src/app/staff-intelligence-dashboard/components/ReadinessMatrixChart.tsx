'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const ReadinessMatrixChartInner = dynamic(() => import('./ReadinessMatrixChartInner'), { ssr: false });

export default function ReadinessMatrixChart() {
  return <ReadinessMatrixChartInner />;
}