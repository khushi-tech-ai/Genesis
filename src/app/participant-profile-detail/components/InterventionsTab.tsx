'use client';
import React from 'react';
import { toast } from 'sonner';
import { Phone, Home, Bus, Heart, MessageSquare, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const interventions = [
  { id: 'intv-005', type: 'Same-day Outreach', reason: 'Missed workshop session — Week 8', date: 'May 6, 2026', staff: 'Sarah Chen', status: 'open' as const, icon: Phone, outcome: null },
  { id: 'intv-004', type: 'Housing Referral', reason: 'Reported housing instability in check-in', date: 'Apr 22, 2026', staff: 'Sarah Chen', status: 'in_progress' as const, icon: Home, outcome: 'Referral submitted to District 4 Housing Authority. Awaiting callback.' },
  { id: 'intv-003', type: 'Coaching Session', reason: 'High stress score (8/10) — emotional support needed', date: 'Apr 15, 2026', staff: 'Marcus Williams', status: 'completed' as const, icon: MessageSquare, outcome: 'Session completed. Participant reported feeling more supported. Readiness improved from 3 to 5.' },
  { id: 'intv-002', type: 'Transport Support', reason: 'Transportation barrier flagged — Week 3', date: 'Apr 1, 2026', staff: 'Sarah Chen', status: 'completed' as const, icon: Bus, outcome: 'Bus pass issued. Attendance improved following week.' },
  { id: 'intv-001', type: 'Motivation Coaching', reason: 'Low confidence score at baseline', date: 'Mar 18, 2026', staff: 'Marcus Williams', status: 'completed' as const, icon: Heart, outcome: 'Baseline session completed. Goals set. Pathway confirmed.' },
];

const statusConfig = {
  open: { label: 'Open', color: 'text-[#C83C3C]', bg: 'bg-[#C83C3C]/08 border-[#C83C3C]/20', icon: AlertCircle },
  in_progress: { label: 'In Progress', color: 'text-[#B8965E]', bg: 'bg-[#B8965E]/08 border-[#B8965E]/20', icon: Clock },
  completed: { label: 'Completed', color: 'text-[#2E7D5A]', bg: 'bg-[#2E7D5A]/08 border-[#2E7D5A]/20', icon: CheckCircle2 },
};

export default function InterventionsTab() {
  const handleResolve = (id: string) => {
    toast('Intervention marked resolved', { description: 'Status updated and outcome logged.' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-serif text-[#101010] text-xl font-semibold">Intervention Timeline</h3>
          <p className="text-[#72777D] text-xs font-sans mt-0.5">5 total — 1 open, 1 in progress, 3 completed</p>
        </div>
        <button
          onClick={() => toast('Intervention triggered', { description: 'Added to queue.' })}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium font-sans text-[#F5F2EB] bg-[#173D35] rounded-xl hover:bg-[#1F4A40] transition-colors"
        >
          + New Intervention
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-5 bottom-5 w-px bg-[#D9D4C9]" />
        <div className="space-y-4">
          {interventions.map((item) => {
            const Icon = item.icon;
            const config = statusConfig[item.status];
            const StatusIcon = config.icon;
            return (
              <div key={item.id} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border ${
                  item.status === 'open' ? 'bg-white border-[#C83C3C]/25' :
                  item.status === 'in_progress' ? 'bg-white border-[#B8965E]/25' : 'bg-white border-[#D9D4C9]'
                }`}>
                  <Icon size={16} className={
                    item.status === 'open' ? 'text-[#C83C3C]' :
                    item.status === 'in_progress' ? 'text-[#B8965E]' : 'text-[#2E7D5A]'
                  } />
                </div>

                <div className={`flex-1 bg-white border rounded-xl p-4 shadow-soft ${
                  item.status === 'open' ? 'border-[#C83C3C]/20' : 'border-[#D9D4C9]'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[#101010] text-sm font-medium font-sans">{item.type}</p>
                      <p className="text-[#72777D] text-xs font-sans mt-0.5">{item.date} · {item.staff}</p>
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-widest-label px-2 py-0.5 rounded-full border font-sans flex items-center gap-1 ${config.bg} ${config.color}`} style={item.status === 'open' ? {backgroundColor:'rgba(200,60,60,0.05)'} : item.status === 'in_progress' ? {backgroundColor:'rgba(184,150,94,0.05)'} : {backgroundColor:'rgba(46,125,90,0.05)'}}>
                      <StatusIcon size={10} />
                      {config.label}
                    </span>
                  </div>

                  <p className="text-[#72777D] text-xs font-sans leading-relaxed">{item.reason}</p>

                  {item.outcome && (
                    <div className="mt-3 bg-[#F5F2EB] rounded-lg p-3 border-l-2 border-[#173D35]">
                      <p className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans mb-1">Outcome</p>
                      <p className="text-[#101010] text-xs font-sans leading-relaxed">{item.outcome}</p>
                    </div>
                  )}

                  {item.status === 'open' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleResolve(item.id)}
                        className="text-[11px] text-[#2E7D5A] font-semibold font-sans uppercase tracking-widest-label border border-[#2E7D5A]/20 bg-[#2E7D5A]/06 px-3 py-1.5 rounded-lg hover:bg-[#2E7D5A]/12 transition-colors"
                        style={{backgroundColor:'rgba(46,125,90,0.04)'}}
                      >
                        Mark Resolved
                      </button>
                      <button className="text-[11px] text-[#B8965E] font-semibold font-sans uppercase tracking-widest-label border border-[#B8965E]/20 bg-[#B8965E]/06 px-3 py-1.5 rounded-lg hover:bg-[#B8965E]/12 transition-colors" style={{backgroundColor:'rgba(184,150,94,0.04)'}}>
                        Add Note
                      </button>
                    </div>
                  )}

                  {item.status === 'in_progress' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleResolve(item.id)}
                        className="text-[11px] text-[#F5F2EB] font-semibold font-sans uppercase tracking-widest-label bg-[#173D35] px-3 py-1.5 rounded-lg hover:bg-[#1F4A40] transition-colors"
                      >
                        Complete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}