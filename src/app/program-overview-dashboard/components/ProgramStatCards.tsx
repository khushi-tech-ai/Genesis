import React from 'react';
import { Users, AlertTriangle, Clock, Activity } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const stats = [
  {
    id: 'stat-active',
    label: 'Active',
    value: '42',
    icon: Users,
    iconColor: 'text-[#2E7D5A]',
    bg: 'bg-white',
    border: 'border-[#D9D4C9]',
    valueColor: 'text-[#101010]',
  },
  {
    id: 'stat-atrisk',
    label: 'At Risk',
    value: '5',
    icon: AlertTriangle,
    iconColor: 'text-[#C83C3C]',
    bg: 'bg-white',
    border: 'border-[#C83C3C]/25',
    valueColor: 'text-[#C83C3C]',
  },
  {
    id: 'stat-pending',
    label: 'Pending',
    value: '3',
    icon: Clock,
    iconColor: 'text-[#B8965E]',
    bg: 'bg-white',
    border: 'border-[#D9D4C9]',
    valueColor: 'text-[#B8965E]',
  },
  {
    id: 'stat-attendance',
    label: 'Attendance',
    value: '92%',
    icon: Activity,
    iconColor: 'text-[#2E7D5A]',
    bg: 'bg-white',
    border: 'border-[#D9D4C9]',
    valueColor: 'text-[#101010]',
  },
];

export default function ProgramStatCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {stats?.map((s) => {
        const Icon = s?.icon;
        return (
          <div key={s?.id} className={`${s?.bg} border ${s?.border} rounded-xl p-5 hover-lift shadow-soft`}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-[11px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium">{s?.label}</p>
              <Icon size={16} className={s?.iconColor} />
            </div>
            <p className={`font-serif text-4xl font-semibold text-tabular ${s?.valueColor}`}>{s?.value}</p>
          </div>
        );
      })}
    </div>
  );
}