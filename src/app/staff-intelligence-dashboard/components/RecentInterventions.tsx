import React from 'react';
import Link from 'next/link';
import { ChevronRight, Phone, Home, Bus, Heart, MessageSquare } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const interventions = [
  {
    id: 'int-001',
    type: 'Same-day Outreach',
    participant: 'Alex Rivera',
    reason: 'Missed workshop session',
    time: '2h ago',
    status: 'open' as const,
    icon: Phone,
  },
  {
    id: 'int-002',
    type: 'Housing Referral',
    participant: 'Robert Okafor',
    reason: 'Reported housing instability',
    time: '5h ago',
    status: 'open' as const,
    icon: Home,
  },
  {
    id: 'int-003',
    type: 'Transport Support',
    participant: 'Maria Gonzalez',
    reason: 'Transportation barrier flagged',
    time: 'Yesterday',
    status: 'in_progress' as const,
    icon: Bus,
  },
  {
    id: 'int-004',
    type: 'Motivation Coaching',
    participant: 'Devon Kim',
    reason: 'Low confidence score — 3/10',
    time: 'Yesterday',
    status: 'completed' as const,
    icon: Heart,
  },
  {
    id: 'int-005',
    type: 'Coaching Session',
    participant: 'Sam Washington',
    reason: 'High stress reported in check-in',
    time: '2 days ago',
    status: 'in_progress' as const,
    icon: MessageSquare,
  },
];

const statusConfig = {
  open: { label: 'Open', color: 'text-[#C83C3C]', bg: 'bg-[#C83C3C]/08 border-[#C83C3C]/20' },
  in_progress: { label: 'In Progress', color: 'text-[#B8965E]', bg: 'bg-[#B8965E]/08 border-[#B8965E]/20' },
  completed: { label: 'Completed', color: 'text-[#2E7D5A]', bg: 'bg-[#2E7D5A]/08 border-[#2E7D5A]/20' },
};

export default function RecentInterventions() {
  return (
    <div className="bg-white border border-[#D9D4C9] rounded-xl p-5 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-[#101010] text-lg font-semibold">Recent Interventions</h3>
          <p className="text-[#72777D] text-xs font-sans mt-0.5">Active intervention queue — this week</p>
        </div>
        <Link href="/program-overview-dashboard" className="text-[10px] text-[#B8965E] uppercase tracking-widest-label font-sans font-medium hover:text-[#C9A97A] transition-colors flex items-center gap-1">
          View All <ChevronRight size={12} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-3">
        {interventions.map((item) => {
          const Icon = item.icon;
          const config = statusConfig[item.status];
          return (
            <div
              key={item.id}
              className="bg-[#F5F2EB] border border-[#D9D4C9] rounded-xl p-4 hover:border-[#173D35]/25 transition-all duration-150 hover-lift"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#173D35]/08 border border-[#173D35]/12 flex items-center justify-center" style={{backgroundColor:'rgba(23,61,53,0.07)'}}>
                  <Icon size={14} className="text-[#173D35]" />
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-widest-label px-2 py-0.5 rounded-full border font-sans ${config.bg} ${config.color}`} style={{backgroundColor: item.status === 'open' ? 'rgba(200,60,60,0.06)' : item.status === 'in_progress' ? 'rgba(184,150,94,0.06)' : 'rgba(46,125,90,0.06)'}}>
                  {config.label}
                </span>
              </div>
              <p className="text-[#101010] text-sm font-medium font-sans leading-snug mb-1">{item.type}</p>
              <p className="text-[#72777D] text-xs font-sans">{item.participant}</p>
              <p className="text-[#9DA2A8] text-[11px] font-sans mt-1 leading-snug">{item.reason}</p>
              <p className="text-[#9DA2A8] text-[10px] font-sans mt-2">{item.time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}