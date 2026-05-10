'use client';
import React, { useState } from 'react';
import { Clock, User, Search, Home, Bus, Briefcase, Heart, Calendar, Shield, FileText, Phone, ArrowUpCircle, CheckCircle2 } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  housing: <Home size={13} />,
  transportation: <Bus size={13} />,
  employment: <Briefcase size={13} />,
  'mental wellbeing': <Heart size={13} />,
  attendance: <Calendar size={13} />,
  'relapse prevention': <Shield size={13} />,
};

const categoryColors: Record<string, string> = {
  housing: 'bg-blue-100 text-blue-700',
  transportation: 'bg-purple-100 text-purple-700',
  employment: 'bg-emerald-100 text-emerald-700',
  'mental wellbeing': 'bg-pink-100 text-pink-700',
  attendance: 'bg-amber-100 text-amber-700',
  'relapse prevention': 'bg-red-100 text-red-700',
};

const urgencyColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  moderate: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const statusColors: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700',
  'in progress': 'bg-amber-100 text-amber-700',
  escalated: 'bg-red-100 text-red-700',
  resolved: 'bg-emerald-100 text-emerald-700',
};

const interventions = [
  {
    id: 'INT-001', participant: 'Marcus Thompson', category: 'housing', urgency: 'critical',
    status: 'escalated', assignedStaff: 'M. Torres', slaHours: 2, slaRemaining: 0.5,
    description: 'Participant reported loss of housing. Emergency placement required.',
    outreachAttempts: 3, lastContact: '2h ago', riskSignals: ['Housing instability', 'Stress elevated'],
    notes: 'Contacted shelter network. Awaiting confirmation.',
  },
  {
    id: 'INT-002', participant: 'Jasmine Rivera', category: 'attendance', urgency: 'high',
    status: 'in progress', assignedStaff: 'S. Chen', slaHours: 24, slaRemaining: 8,
    description: '3 consecutive missed sessions. Engagement declining significantly.',
    outreachAttempts: 2, lastContact: '1d ago', riskSignals: ['Attendance decline', 'Disengagement risk'],
    notes: 'Left voicemail. Text sent. Awaiting response.',
  },
  {
    id: 'INT-003', participant: 'Devon Williams', category: 'mental wellbeing', urgency: 'high',
    status: 'open', assignedStaff: 'R. Patel', slaHours: 12, slaRemaining: 5,
    description: 'Participant reported elevated stress and anxiety during check-in.',
    outreachAttempts: 1, lastContact: '3h ago', riskSignals: ['Emotional distress', 'Confidence declining'],
    notes: 'Referred to counseling services.',
  },
  {
    id: 'INT-004', participant: 'Aaliyah Johnson', category: 'transportation', urgency: 'moderate',
    status: 'in progress', assignedStaff: 'S. Chen', slaHours: 48, slaRemaining: 24,
    description: 'No reliable transportation to program site. Missing sessions.',
    outreachAttempts: 2, lastContact: '6h ago', riskSignals: ['Transportation barrier'],
    notes: 'Bus pass requested. Processing.',
  },
  {
    id: 'INT-005', participant: 'Carlos Mendez', category: 'employment', urgency: 'moderate',
    status: 'open', assignedStaff: 'M. Torres', slaHours: 72, slaRemaining: 48,
    description: 'Job placement opportunity identified. Needs resume and interview prep.',
    outreachAttempts: 1, lastContact: '1d ago', riskSignals: ['Employment readiness gap'],
    notes: 'Scheduled mock interview for Friday.',
  },
  {
    id: 'INT-006', participant: 'Tanya Brooks', category: 'relapse prevention', urgency: 'critical',
    status: 'escalated', assignedStaff: 'R. Patel', slaHours: 4, slaRemaining: 1,
    description: 'Participant disclosed relapse risk during session. Immediate support needed.',
    outreachAttempts: 4, lastContact: '30m ago', riskSignals: ['Relapse risk', 'Support network gap'],
    notes: 'Supervisor notified. Crisis protocol initiated.',
  },
];

export default function InterventionManagementContent() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = interventions.filter(i => {
    const matchFilter = filter === 'all' || i.urgency === filter || i.status === filter || i.category === filter;
    const matchSearch = i.participant.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const selectedIntervention = interventions.find(i => i.id === selected);

  return (
    <div className="p-6 xl:p-8 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-[#101010] text-3xl font-semibold">Intervention Management</h1>
          <p className="text-[#72777D] text-sm font-sans mt-1">Assign, track, and resolve interventions across participants</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-sans">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="text-[#72777D]">2 Critical</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-sans">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            <span className="text-[#72777D]">2 High</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total Open', value: '6', color: 'text-[#101010]' },
          { label: 'Critical', value: '2', color: 'text-red-600' },
          { label: 'Escalated', value: '2', color: 'text-orange-600' },
          { label: 'In Progress', value: '2', color: 'text-amber-600' },
          { label: 'Resolved Today', value: '4', color: 'text-emerald-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-[#E8E3DA] p-4">
            <p className="text-xs text-[#72777D] font-sans mb-1">{stat.label}</p>
            <p className={`text-2xl font-semibold font-sans ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Queue */}
        <div className="flex-1 min-w-0">
          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-white border border-[#E8E3DA] rounded-lg px-3 py-2 flex-1 max-w-xs">
              <Search size={14} className="text-[#9DA2A8]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search interventions..."
                className="text-sm font-sans outline-none flex-1 bg-transparent text-[#101010] placeholder-[#9DA2A8]"
              />
            </div>
            <div className="flex items-center gap-1">
              {['all', 'critical', 'high', 'moderate'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans transition-colors capitalize ${
                    filter === f ? 'bg-[#173D35] text-white' : 'bg-white border border-[#E8E3DA] text-[#72777D] hover:bg-[#F5F2EB]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Intervention cards */}
          <div className="space-y-3">
            {filtered.map((intervention) => {
              const slaPercent = Math.max(0, (intervention.slaRemaining / intervention.slaHours) * 100);
              const slaColor = slaPercent < 20 ? 'bg-red-400' : slaPercent < 50 ? 'bg-amber-400' : 'bg-emerald-400';
              return (
                <div
                  key={intervention.id}
                  onClick={() => setSelected(selected === intervention.id ? null : intervention.id)}
                  className={`bg-white rounded-xl border p-4 cursor-pointer transition-all ${
                    selected === intervention.id ? 'border-[#173D35] shadow-md' : 'border-[#E8E3DA] hover:border-[#D9D4C9] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold font-sans flex-shrink-0 ${categoryColors[intervention.category]}`}>
                        {categoryIcons[intervention.category]}
                        <span className="capitalize">{intervention.category}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-[#101010] font-sans text-sm">{intervention.participant}</p>
                          <span className="text-[10px] text-[#9DA2A8] font-sans">{intervention.id}</span>
                        </div>
                        <p className="text-xs text-[#72777D] font-sans leading-snug line-clamp-1">{intervention.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans border ${urgencyColors[intervention.urgency]} capitalize`}>
                        {intervention.urgency}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans capitalize ${statusColors[intervention.status]}`}>
                        {intervention.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#72777D] font-sans">
                      <User size={11} />{intervention.assignedStaff}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#72777D] font-sans">
                      <Phone size={11} />{intervention.outreachAttempts} attempts
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#72777D] font-sans">
                      <Clock size={11} />Last: {intervention.lastContact}
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-[10px] text-[#9DA2A8] font-sans">SLA</span>
                      <div className="w-16 h-1.5 bg-[#E8E3DA] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${slaColor}`} style={{width:`${slaPercent}%`}} />
                      </div>
                      <span className="text-[10px] font-semibold font-sans text-[#72777D]">{intervention.slaRemaining}h</span>
                    </div>
                  </div>

                  {selected === intervention.id && (
                    <div className="mt-4 pt-4 border-t border-[#E8E3DA] space-y-3">
                      <div>
                        <p className="text-[10px] text-[#9DA2A8] font-sans uppercase tracking-widest mb-1">Risk Signals</p>
                        <div className="flex flex-wrap gap-1.5">
                          {intervention.riskSignals.map(s => (
                            <span key={s} className="text-[11px] bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-full font-sans">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#9DA2A8] font-sans uppercase tracking-widest mb-1">Latest Note</p>
                        <p className="text-xs text-[#101010] font-sans bg-[#FAFAF8] rounded-lg p-2 border border-[#E8E3DA]">{intervention.notes}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#173D35] text-white rounded-lg text-xs font-medium font-sans hover:bg-[#1a4a40] transition-colors">
                          <Phone size={12} />Outreach
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#D9D4C9] text-[#101010] rounded-lg text-xs font-medium font-sans hover:bg-[#F5F2EB] transition-colors">
                          <FileText size={12} />Add Note
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 text-red-700 rounded-lg text-xs font-medium font-sans hover:bg-red-50 transition-colors">
                          <ArrowUpCircle size={12} />Escalate
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 text-emerald-700 rounded-lg text-xs font-medium font-sans hover:bg-emerald-50 transition-colors ml-auto">
                          <CheckCircle2 size={12} />Resolve
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel — categories */}
        <div className="w-64 flex-shrink-0 space-y-4">
          <div className="bg-white rounded-xl border border-[#E8E3DA] p-4">
            <h3 className="font-serif text-[#101010] text-base font-semibold mb-3">By Category</h3>
            <div className="space-y-2">
              {Object.entries(categoryColors).map(([cat, color]) => {
                const count = interventions.filter(i => i.category === cat).length;
                return (
                  <div key={cat} className="flex items-center justify-between">
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-semibold font-sans ${color}`}>
                      {categoryIcons[cat]}
                      <span className="capitalize">{cat}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#101010] font-sans">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E3DA] p-4">
            <h3 className="font-serif text-[#101010] text-base font-semibold mb-3">Escalation Workflow</h3>
            <div className="space-y-2">
              {['Identify Risk Signal', 'Assign Intervention', 'Outreach Attempt', 'Supervisor Review', 'Resolution'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-sans flex-shrink-0 ${i < 3 ? 'bg-[#173D35] text-white' : 'bg-[#E8E3DA] text-[#9DA2A8]'}`}>{i+1}</div>
                  <p className="text-xs text-[#72777D] font-sans">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
