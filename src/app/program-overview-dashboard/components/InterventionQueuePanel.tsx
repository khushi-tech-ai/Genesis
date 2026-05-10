'use client';
import React from 'react';
import { toast } from 'sonner';
import { Phone, Home, Plus } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const interventions = [
  {
    id: 'iq-001',
    type: 'Same-day Outreach',
    participant: 'Jane Smith missed workshop',
    time: '2H AGO',
    icon: Phone,
    urgent: true,
  },
  {
    id: 'iq-002',
    type: 'Housing Referral',
    participant: 'Robert reported instability',
    time: '5H AGO',
    icon: Home,
    urgent: false,
  },
];

export default function InterventionQueuePanel() {
  const handleAct = (id: string) => {
    toast('Intervention actioned', { description: 'Staff note logged and participant notified.' });
  };

  return (
    <div className="bg-white border border-[#D9D4C9] rounded-xl p-5 h-full shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-[#101010] text-lg font-semibold">Intervention Queue</h3>
        <span className="text-[10px] text-[#C83C3C] font-sans font-semibold bg-[#C83C3C]/08 border border-[#C83C3C]/20 px-2 py-0.5 rounded-full" style={{backgroundColor:'rgba(200,60,60,0.06)'}}>
          {interventions.length} Active
        </span>
      </div>

      <div className="space-y-3 mb-4">
        {interventions.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`rounded-xl p-4 border ${item.urgent ? 'bg-[#B8965E]/05 border-[#B8965E]/25' : 'bg-[#F5F2EB] border-[#D9D4C9]'}`}
              style={item.urgent ? {backgroundColor:'rgba(184,150,94,0.04)'} : {}}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.urgent ? 'bg-[#B8965E]/12 border border-[#B8965E]/20' : 'bg-[#173D35]/08 border border-[#173D35]/12'}`} style={item.urgent ? {backgroundColor:'rgba(184,150,94,0.08)'} : {backgroundColor:'rgba(23,61,53,0.06)'}}>
                  <Icon size={14} className={item.urgent ? 'text-[#B8965E]' : 'text-[#173D35]'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#101010] text-sm font-medium font-sans">{item.type}</p>
                  <p className="text-[#72777D] text-xs font-sans mt-0.5 leading-snug">{item.participant}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] text-[#9DA2A8] uppercase tracking-widest-label font-sans">{item.time}</span>
                <button
                  onClick={() => handleAct(item.id)}
                  className="text-[11px] text-[#B8965E] font-semibold font-sans uppercase tracking-widest-label hover:text-[#C9A97A] transition-colors flex items-center gap-1"
                >
                  Act <span className="text-[#9DA2A8]">›</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => toast('Staff note saved', { description: 'Note added to intervention log.' })}
        className="w-full flex items-center justify-center gap-2 border border-dashed border-[#D9D4C9] rounded-xl py-3 text-[#72777D] text-xs font-sans font-medium hover:bg-[#F5F2EB] hover:text-[#101010] hover:border-[#173D35]/25 transition-all duration-150"
      >
        <Plus size={14} />
        Add Staff Note
      </button>

      {/* Barrier Tracker */}
      <div className="mt-5 pt-5 border-t border-[#EAE6DE]">
        <p className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium mb-3">Barrier Distribution</p>
        <div className="space-y-2.5">
          {[
            { id: 'barrier-housing', label: 'Housing', count: 8, pct: 65 },
            { id: 'barrier-transport', label: 'Transportation', count: 5, pct: 40 },
            { id: 'barrier-employment', label: 'Employment', count: 6, pct: 48 },
            { id: 'barrier-digital', label: 'Digital Access', count: 3, pct: 24 },
          ].map(({ id, label, count, pct }) => (
            <div key={id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#72777D] font-sans">{label}</span>
                <span className="text-xs text-[#101010] font-sans font-medium text-tabular">{count}</span>
              </div>
              <div className="w-full bg-[#EAE6DE] rounded-full h-1">
                <div className="bg-[#173D35] h-1 rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}