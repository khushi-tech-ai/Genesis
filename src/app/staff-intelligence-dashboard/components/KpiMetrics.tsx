'use client';
import React from 'react';
import { Users, AlertTriangle, TrendingUp, Calendar, Zap, Activity } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const metrics = [
  {
    id: 'kpi-participants',
    label: 'Total Participants',
    value: '124',
    sub: '+12 this cycle',
    subColor: 'text-[#2E7D5A]',
    icon: Users,
    iconColor: 'text-[#173D35]',
    border: 'border-[#D9D4C9]',
    accent: false,
  },
  {
    id: 'kpi-alerts',
    label: 'Active Alerts',
    value: '14',
    sub: '3 critical',
    subColor: 'text-[#C83C3C]',
    icon: AlertTriangle,
    iconColor: 'text-[#C83C3C]',
    border: 'border-[#C83C3C]/25',
    accent: true,
  },
  {
    id: 'kpi-engagement',
    label: 'Engagement Rate',
    value: '78%',
    sub: '+6% vs last week',
    subColor: 'text-[#2E7D5A]',
    icon: Activity,
    iconColor: 'text-[#173D35]',
    border: 'border-[#D9D4C9]',
    accent: false,
  },
  {
    id: 'kpi-attendance',
    label: 'Attendance %',
    value: '82%',
    sub: 'Program avg.',
    subColor: 'text-[#72777D]',
    icon: Calendar,
    iconColor: 'text-[#173D35]',
    border: 'border-[#D9D4C9]',
    accent: false,
  },
  {
    id: 'kpi-interventions',
    label: 'Intervention Queue',
    value: '9',
    sub: 'Pending action',
    subColor: 'text-[#B8965E]',
    icon: Zap,
    iconColor: 'text-[#B8965E]',
    border: 'border-[#B8965E]/25',
    accent: false,
  },
  {
    id: 'kpi-readiness',
    label: 'Readiness Gain',
    value: '+18%',
    sub: 'Avg. delta this cycle',
    subColor: 'text-[#2E7D5A]',
    icon: TrendingUp,
    iconColor: 'text-[#2E7D5A]',
    border: 'border-[#D9D4C9]',
    accent: false,
  },
];

export default function KpiMetrics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics?.map((m) => {
        const Icon = m?.icon;
        return (
          <div
            key={m?.id}
            className={`rounded-xl border p-5 bg-white hover-lift shadow-soft transition-all duration-150 ${m?.border}`}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium leading-tight pr-1">{m?.label}</p>
              <Icon size={15} className={`flex-shrink-0 ${m?.iconColor}`} />
            </div>
            <p className="font-serif text-[#101010] text-3xl font-semibold text-tabular">{m?.value}</p>
            <p className={`text-[11px] font-sans mt-1.5 font-medium ${m?.subColor}`}>{m?.sub}</p>
          </div>
        );
      })}
    </div>
  );
}