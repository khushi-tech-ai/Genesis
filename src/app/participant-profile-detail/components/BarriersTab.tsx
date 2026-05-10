'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Home, Bus, Briefcase, Wifi, AlertTriangle, CheckCircle2, Plus } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const barriers = [
  {
    id: 'barrier-housing',
    type: 'Housing',
    icon: Home,
    severity: 'high' as const,
    description: 'Reported living situation is unstable. Currently staying with a family member temporarily. Referral submitted to housing authority.',
    reportedDate: 'Apr 21, 2026',
    status: 'active' as const,
    actions: ['Housing Referral Submitted', 'Follow-up Scheduled: May 15'],
  },
  {
    id: 'barrier-transport',
    type: 'Transportation',
    icon: Bus,
    severity: 'moderate' as const,
    description: 'No reliable transportation to program site. Bus pass issued in Week 3 — improved attendance temporarily.',
    reportedDate: 'Mar 17, 2026',
    status: 'monitored' as const,
    actions: ['Bus Pass Issued: Mar 28'],
  },
  {
    id: 'barrier-employment',
    type: 'Employment',
    icon: Briefcase,
    severity: 'low' as const,
    description: 'Participant is interested in warehouse and logistics roles. Skills assessment scheduled for Week 9.',
    reportedDate: 'Mar 17, 2026',
    status: 'in_progress' as const,
    actions: ['Skills Assessment Scheduled: May 18', 'Job Board Access Granted'],
  },
  {
    id: 'barrier-digital',
    type: 'Digital Access',
    icon: Wifi,
    severity: 'moderate' as const,
    description: 'Limited smartphone data. Relies on program facility WiFi for check-ins. May miss mobile notifications.',
    reportedDate: 'Mar 17, 2026',
    status: 'active' as const,
    actions: ['Data Assistance Requested'],
  },
];

const severityConfig = {
  high: { label: 'HIGH', className: 'risk-badge-high', dot: 'bg-[#C83C3C]' },
  moderate: { label: 'MODERATE', className: 'risk-badge-moderate', dot: 'bg-[#B8965E]' },
  low: { label: 'LOW', className: 'risk-badge-low', dot: 'bg-[#2E7D5A]' },
};

const statusConfig = {
  active: { label: 'Active', icon: AlertTriangle, color: 'text-[#C83C3C]' },
  monitored: { label: 'Monitored', icon: CheckCircle2, color: 'text-[#B8965E]' },
  in_progress: { label: 'In Progress', icon: CheckCircle2, color: 'text-[#2E7D5A]' },
  resolved: { label: 'Resolved', icon: CheckCircle2, color: 'text-[#72777D]' },
};

export default function BarriersTab() {
  const [addingBarrier, setAddingBarrier] = useState(false);

  const handleAddBarrier = () => {
    toast('Barrier recorded', { description: 'Added to participant barrier tracker.' });
    setAddingBarrier(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-serif text-[#101010] text-xl font-semibold">Barrier Tracker</h3>
          <p className="text-[#72777D] text-xs font-sans mt-0.5">4 barriers identified — 2 active, 1 monitored, 1 in progress</p>
        </div>
        <button
          onClick={() => setAddingBarrier(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium font-sans text-[#F5F2EB] bg-[#173D35] rounded-xl hover:bg-[#1F4A40] transition-colors"
        >
          <Plus size={13} /> Add Barrier
        </button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {[
          { id: 'bs-housing', icon: Home, label: 'Housing', severity: 'high' as const },
          { id: 'bs-transport', icon: Bus, label: 'Transport', severity: 'moderate' as const },
          { id: 'bs-employment', icon: Briefcase, label: 'Employment', severity: 'low' as const },
          { id: 'bs-digital', icon: Wifi, label: 'Digital', severity: 'moderate' as const },
        ].map(({ id, icon: Icon, label, severity }) => {
          const config = severityConfig[severity];
          return (
            <div key={id} className="bg-white border border-[#D9D4C9] rounded-xl p-3 flex items-center gap-3 shadow-soft">
              <div className="w-8 h-8 rounded-lg bg-[#173D35]/08 border border-[#173D35]/12 flex items-center justify-center flex-shrink-0" style={{backgroundColor:'rgba(23,61,53,0.06)'}}>
                <Icon size={14} className="text-[#173D35]" />
              </div>
              <div>
                <p className="text-xs text-[#101010] font-medium font-sans">{label}</p>
                <span className={`text-[9px] font-semibold uppercase tracking-widest-label px-1.5 py-0.5 rounded-full border font-sans ${config.className}`}>
                  {config.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Barrier detail cards */}
      {barriers.map((barrier) => {
        const Icon = barrier.icon;
        const severity = severityConfig[barrier.severity];
        const status = statusConfig[barrier.status];
        const StatusIcon = status.icon;
        return (
          <div key={barrier.id} className="bg-white border border-[#D9D4C9] rounded-xl p-5 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#173D35]/08 border border-[#173D35]/12 flex items-center justify-center flex-shrink-0" style={{backgroundColor:'rgba(23,61,53,0.06)'}}>
                  <Icon size={16} className="text-[#173D35]" />
                </div>
                <div>
                  <p className="text-[#101010] text-sm font-semibold font-sans">{barrier.type}</p>
                  <p className="text-[#72777D] text-xs font-sans">Reported {barrier.reportedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold uppercase tracking-widest-label px-2 py-0.5 rounded-full border font-sans ${severity.className}`}>
                  {severity.label}
                </span>
                <span className={`text-[10px] font-sans flex items-center gap-1 ${status.color}`}>
                  <StatusIcon size={11} />
                  {status.label}
                </span>
              </div>
            </div>

            <p className="text-[#72777D] text-xs font-sans leading-relaxed mb-3">{barrier.description}</p>

            {barrier.actions.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[9px] text-[#9DA2A8] uppercase tracking-widest-label font-sans font-medium">Actions Taken</p>
                {barrier.actions.map((action) => (
                  <div key={`${barrier.id}-action-${action.slice(0, 20)}`} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#173D35] flex-shrink-0" />
                    <span className="text-xs text-[#101010] font-sans">{action}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Add barrier inline form */}
      {addingBarrier && (
        <div className="bg-white border border-[#173D35]/25 rounded-xl p-5 fade-in shadow-soft">
          <h4 className="font-serif text-[#101010] text-lg font-semibold mb-4">Record New Barrier</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-[#72777D] font-medium font-sans mb-1.5">Barrier Type</label>
              <select className="w-full bg-[#F5F2EB] border border-[#D9D4C9] rounded-xl px-4 py-3 text-sm text-[#101010] font-sans outline-none focus:border-[#173D35]">
                <option value="">Select barrier type</option>
                <option value="housing">Housing</option>
                <option value="transportation">Transportation</option>
                <option value="employment">Employment</option>
                <option value="digital">Digital Access</option>
                <option value="mental_health">Mental Health</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#72777D] font-medium font-sans mb-1.5">Severity</label>
              <div className="grid grid-cols-3 gap-2">
                {['Low', 'Moderate', 'High'].map((level) => (
                  <button
                    key={`severity-${level}`}
                    type="button"
                    className="py-2 rounded-xl border border-[#D9D4C9] text-[#72777D] text-xs font-sans hover:border-[#173D35]/40 hover:text-[#101010] transition-colors"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#72777D] font-medium font-sans mb-1.5">Description</label>
              <textarea
                placeholder="Describe the barrier and context..."
                className="w-full bg-[#F5F2EB] border border-[#D9D4C9] rounded-xl px-4 py-3 text-sm text-[#101010] font-sans placeholder-[#9DA2A8] outline-none focus:border-[#173D35] resize-none h-20"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setAddingBarrier(false)}
                className="flex-1 py-2.5 text-xs text-[#72777D] font-sans border border-[#D9D4C9] rounded-xl hover:bg-[#F5F2EB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBarrier}
                className="flex-1 py-2.5 text-xs text-[#F5F2EB] font-sans bg-[#173D35] rounded-xl hover:bg-[#1F4A40] transition-colors"
              >
                Save Barrier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}