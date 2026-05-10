import React from 'react';
import ProgramStatCards from './ProgramStatCards';
import RiskListTable from './RiskListTable';
import InterventionQueuePanel from './InterventionQueuePanel';
import AttendanceTrendChart from './AttendanceTrendChart';

export default function ProgramOverviewContent() {
  return (
    <div className="p-6 xl:p-8 2xl:p-10 space-y-6 max-w-screen-2xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[#101010] text-3xl font-semibold">Pilot Overview</h1>
          <p className="text-[#72777D] text-sm font-sans mt-1">Manage participants and risk interventions</p>
        </div>
        <button className="flex items-center gap-2 bg-[#173D35] text-[#F5F2EB] text-xs font-medium font-sans px-4 py-2.5 rounded-lg hover:bg-[#1F4A40] transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8M4 6l3 3 3-3M2 10v2a1 1 0 001 1h8a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Export Report
        </button>
      </div>

      <ProgramStatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RiskListTable />
          <AttendanceTrendChart />
        </div>
        <div className="lg:col-span-1">
          <InterventionQueuePanel />
        </div>
      </div>
    </div>
  );
}