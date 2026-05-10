'use client';
import React from 'react';
import { Phone, Home, Bus, AlertCircle, Heart, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';


interface InterventionItem {
  id: string;
  type: string;
  participant: string;
  priority: 'urgent' | 'high' | 'medium';
  time: string;
  icon: React.ElementType;
}

const queue: InterventionItem[] = [
  {
    id: 'iq-001',
    type: 'Missed Weekly Check-in',
    participant: 'James Torres',
    priority: 'urgent',
    time: '2h ago',
    icon: Clock,
  },
  {
    id: 'iq-002',
    type: 'Housing Referral Needed',
    participant: 'Alex Rivera',
    priority: 'urgent',
    time: '4h ago',
    icon: Home,
  },
  {
    id: 'iq-003',
    type: 'Transportation Barrier',
    participant: 'Maria Gonzalez',
    priority: 'high',
    time: 'Yesterday',
    icon: Bus,
  },
  {
    id: 'iq-004',
    type: 'Same-day Outreach',
    participant: 'Sam Washington',
    priority: 'urgent',
    time: '1h ago',
    icon: Phone,
  },
  {
    id: 'iq-005',
    type: 'Relapse Risk Increase',
    participant: 'Devon Kim',
    priority: 'high',
    time: 'Yesterday',
    icon: AlertCircle,
  },
  {
    id: 'iq-006',
    type: 'Motivation Coaching',
    participant: 'Jordan Smith',
    priority: 'medium',
    time: '2 days ago',
    icon: Heart,
  },
];

const priorityConfig = {
  urgent: {
    label: 'Urgent',
    dot: 'bg-[#C83C3C]',
    badge: 'bg-[#C83C3C]/08 text-[#C83C3C] border-[#C83C3C]/20',
    bar: 'bg-[#C83C3C]',
  },
  high: {
    label: 'High',
    dot: 'bg-[#B8965E]',
    badge: 'bg-[#B8965E]/08 text-[#B8965E] border-[#B8965E]/20',
    bar: 'bg-[#B8965E]',
  },
  medium: {
    label: 'Medium',
    dot: 'bg-[#72777D]',
    badge: 'bg-[#72777D]/08 text-[#72777D] border-[#72777D]/20',
    bar: 'bg-[#72777D]',
  },
};

export default function InterventionQueuePanel() {
  const urgentCount = queue.filter((q) => q.priority === 'urgent').length;

  return (
    <div className="bg-white border border-[#D9D4C9] rounded-xl shadow-soft h-full flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#EAE6DE]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-[#101010] text-lg font-semibold">Intervention Queue</h3>
            <p className="text-[#72777D] text-xs font-sans mt-0.5">Pending actions requiring staff response</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C83C3C] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#C83C3C] font-sans">{urgentCount} urgent</span>
          </div>
        </div>
      </div>

      {/* Queue items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {queue.map((item) => {
          const config = priorityConfig[item.priority];
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3.5 bg-[#F5F2EB] border border-[#D9D4C9] rounded-xl hover:border-[#173D35]/25 transition-all duration-150 cursor-pointer group"
            >
              {/* Priority bar */}
              <div className={`w-0.5 self-stretch rounded-full flex-shrink-0 ${config.bar}`} />

              {/* Icon */}
              <div className="w-8 h-8 rounded-lg bg-white border border-[#D9D4C9] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={14} className="text-[#173D35]" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[#101010] text-sm font-medium font-sans leading-snug">{item.type}</p>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest-label px-2 py-0.5 rounded-full border font-sans flex-shrink-0 ${config.badge}`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-[#72777D] text-xs font-sans mt-0.5">{item.participant}</p>
                <p className="text-[#9DA2A8] text-[10px] font-sans mt-1">{item.time}</p>
              </div>

              <ChevronRight size={13} className="text-[#9DA2A8] group-hover:text-[#173D35] transition-colors flex-shrink-0 mt-1" />
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[#EAE6DE]">
        <Link
          href="/program-overview-dashboard"
          className="flex items-center justify-center gap-1.5 text-[11px] text-[#B8965E] uppercase tracking-widest-label font-sans font-medium hover:text-[#C9A97A] transition-colors"
        >
          View Full Queue <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}
