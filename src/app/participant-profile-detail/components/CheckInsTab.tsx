import React from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const checkIns = [
  { id: 'ci-w8', week: 'Week 8', date: 'May 5, 2026', status: 'missed' as const, mood: null, stress: null, confidence: null, readiness: null, attendance: false, supportNeeds: [] },
  { id: 'ci-w7', week: 'Week 7', date: 'Apr 28, 2026', status: 'missed' as const, mood: null, stress: null, confidence: null, readiness: null, attendance: false, supportNeeds: [] },
  { id: 'ci-w6', week: 'Week 6', date: 'Apr 21, 2026', status: 'completed' as const, mood: 2, stress: 8, confidence: 3, readiness: 4, attendance: true, supportNeeds: ['Housing', 'Transportation'] },
  { id: 'ci-w5', week: 'Week 5', date: 'Apr 14, 2026', status: 'completed' as const, mood: 3, stress: 6, confidence: 5, readiness: 5, attendance: true, supportNeeds: ['Housing'] },
  { id: 'ci-w4', week: 'Week 4', date: 'Apr 7, 2026', status: 'missed' as const, mood: null, stress: null, confidence: null, readiness: null, attendance: false, supportNeeds: [] },
  { id: 'ci-w3', week: 'Week 3', date: 'Mar 31, 2026', status: 'completed' as const, mood: 4, stress: 5, confidence: 6, readiness: 6, attendance: true, supportNeeds: [] },
  { id: 'ci-w2', week: 'Week 2', date: 'Mar 24, 2026', status: 'completed' as const, mood: 4, stress: 4, confidence: 7, readiness: 7, attendance: true, supportNeeds: [] },
  { id: 'ci-w1', week: 'Week 1 (Baseline)', date: 'Mar 17, 2026', status: 'completed' as const, mood: 3, stress: 5, confidence: 6, readiness: 6, attendance: true, supportNeeds: ['Transportation'] },
];

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-[#2E7D5A]', label: 'Completed', bg: 'bg-[#2E7D5A]/08 border-[#2E7D5A]/20' },
  missed: { icon: XCircle, color: 'text-[#C83C3C]', label: 'Missed', bg: 'bg-[#C83C3C]/08 border-[#C83C3C]/20' },
  pending: { icon: Clock, color: 'text-[#B8965E]', label: 'Pending', bg: 'bg-[#B8965E]/08 border-[#B8965E]/20' },
};

export default function CheckInsTab() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-[#101010] text-xl font-semibold">Check-In History</h3>
          <p className="text-[#72777D] text-xs font-sans mt-0.5">5 of 8 completed — 3 missed</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-sans">
          <span className="text-[#2E7D5A]">5 Completed</span>
          <span className="text-[#C83C3C]">3 Missed</span>
        </div>
      </div>

      {checkIns.map((ci) => {
        const config = statusConfig[ci.status];
        const Icon = config.icon;
        return (
          <div
            key={ci.id}
            className={`bg-white border rounded-xl p-4 shadow-soft ${
              ci.status === 'missed' ? 'border-[#C83C3C]/15' : 'border-[#D9D4C9]'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Icon size={16} className={config.color} />
                <div>
                  <p className="text-[#101010] text-sm font-medium font-sans">{ci.week}</p>
                  <p className="text-[#72777D] text-xs font-sans">{ci.date}</p>
                </div>
              </div>
              <span className={`text-[10px] font-semibold uppercase tracking-widest-label px-2.5 py-1 rounded-full border font-sans ${config.bg} ${config.color}`} style={ci.status === 'completed' ? {backgroundColor:'rgba(46,125,90,0.05)'} : ci.status === 'missed' ? {backgroundColor:'rgba(200,60,60,0.05)'} : {backgroundColor:'rgba(184,150,94,0.05)'}}>
                {config.label}
              </span>
            </div>

            {ci.status === 'completed' && ci.mood !== null && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[
                  { id: `${ci.id}-mood`, label: 'Mood', value: `${ci.mood}/5` },
                  { id: `${ci.id}-stress`, label: 'Stress', value: `${ci.stress}/10` },
                  { id: `${ci.id}-conf`, label: 'Confidence', value: `${ci.confidence}/10` },
                  { id: `${ci.id}-ready`, label: 'Readiness', value: `${ci.readiness}/10` },
                ].map(({ id, label, value }) => (
                  <div key={id} className="bg-[#F5F2EB] rounded-lg p-2 text-center border border-[#D9D4C9]">
                    <p className="text-[9px] text-[#9DA2A8] uppercase tracking-widest-label font-sans">{label}</p>
                    <p className="text-[#101010] text-sm font-semibold font-sans text-tabular mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {ci.supportNeeds.length > 0 && (
              <div className="flex gap-1.5 mt-2 flex-wrap">
                <span className="text-[10px] text-[#72777D] font-sans">Support needed:</span>
                {ci.supportNeeds.map((need) => (
                  <span key={`${ci.id}-need-${need}`} className="text-[10px] text-[#B8965E] bg-[#B8965E]/08 border border-[#B8965E]/20 px-2 py-0.5 rounded-full font-sans" style={{backgroundColor:'rgba(184,150,94,0.06)'}}>
                    {need}
                  </span>
                ))}
              </div>
            )}

            {ci.status === 'missed' && (
              <p className="text-[#9DA2A8] text-xs font-sans italic mt-1">No check-in submitted this week.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}