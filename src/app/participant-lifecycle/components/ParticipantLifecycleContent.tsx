'use client';
import React, { useState } from 'react';
import { CheckCircle2, Clock, AlertTriangle, Briefcase, TrendingDown, ChevronRight, Activity, Phone, FileText, ArrowUpCircle, Award, Home, Zap } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const stages = [
  { id: 'intake', label: 'Intake', status: 'completed', timeInStage: '3 days', coach: 'S. Chen', risk: null },
  { id: 'baseline', label: 'Baseline Assessment', status: 'completed', timeInStage: '5 days', coach: 'S. Chen', risk: null },
  { id: 'engagement', label: 'Engagement', status: 'completed', timeInStage: '18 days', coach: 'S. Chen', risk: 'moderate' },
  { id: 'intervention', label: 'Intervention', status: 'active', timeInStage: '12 days', coach: 'M. Torres', risk: 'high' },
  { id: 'stabilization', label: 'Stabilization', status: 'pending', timeInStage: '—', coach: '—', risk: null },
  { id: 'workforce', label: 'Workforce Ready', status: 'pending', timeInStage: '—', coach: '—', risk: null },
  { id: 'graduation', label: 'Graduation', status: 'pending', timeInStage: '—', coach: '—', risk: null },
];

const timelineEvents = [
  { id: 1, date: 'May 10, 2026', time: '9:14 AM', event: 'Coaching session logged', type: 'coaching', severity: 'info', staff: 'M. Torres', action: 'Review session notes' },
  { id: 2, date: 'May 8, 2026', time: '2:30 PM', event: 'Housing referral completed', type: 'housing', severity: 'positive', staff: 'S. Chen', action: 'Confirm placement status' },
  { id: 3, date: 'May 6, 2026', time: '10:00 AM', event: 'Intervention triggered — attendance decline', type: 'intervention', severity: 'warning', staff: 'M. Torres', action: 'Schedule follow-up' },
  { id: 4, date: 'May 3, 2026', time: '8:45 AM', event: 'Missed check-in', type: 'missed', severity: 'alert', staff: 'System', action: 'Initiate same-day outreach' },
  { id: 5, date: 'Apr 29, 2026', time: '3:00 PM', event: 'Attendance improvement noted', type: 'attendance', severity: 'positive', staff: 'S. Chen', action: 'Continue monitoring' },
  { id: 6, date: 'Apr 25, 2026', time: '11:15 AM', event: 'Employment milestone — resume completed', type: 'employment', severity: 'positive', staff: 'M. Torres', action: 'Submit to employer partners' },
];

const trajectoryData = [
  { week: 'W1', confidence: 42, attendance: 60, wellbeing: 50, employment: 30 },
  { week: 'W2', confidence: 48, attendance: 65, wellbeing: 55, employment: 35 },
  { week: 'W3', confidence: 44, attendance: 58, wellbeing: 48, employment: 38 },
  { week: 'W4', confidence: 52, attendance: 70, wellbeing: 60, employment: 42 },
  { week: 'W5', confidence: 58, attendance: 75, wellbeing: 65, employment: 48 },
  { week: 'W6', confidence: 63, attendance: 72, wellbeing: 68, employment: 52 },
];

const escalations = [
  { id: 1, signal: '2 missed check-ins in 14 days', urgency: 'high', recommendation: 'Recommend same-day outreach' },
  { id: 2, signal: 'Housing instability detected', urgency: 'high', recommendation: 'Assign housing navigator' },
  { id: 3, signal: 'Engagement declining — 28% drop', urgency: 'moderate', recommendation: 'Schedule coaching session' },
  { id: 4, signal: 'Confidence recovering post-intervention', urgency: 'low', recommendation: 'Reinforce positive momentum' },
];

export default function ParticipantLifecycleContent() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'trajectory'>('timeline');

  const severityColor: Record<string, string> = {
    alert: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
    positive: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
  };

  const urgencyColor: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    moderate: 'bg-amber-100 text-amber-700',
    low: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <div className="p-6 xl:p-8 space-y-6 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[#101010] text-3xl font-semibold">Participant Lifecycle</h1>
          <p className="text-[#72777D] text-sm font-sans mt-1">Full journey tracker — operational workflow coordination</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-[#D9D4C9] rounded-lg px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5A] animate-pulse" />
          <span className="text-[10px] text-[#72777D] uppercase tracking-widest font-sans">Live Tracking</span>
        </div>
      </div>

      {/* Lifecycle Stage Tracker */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-6">
        <h2 className="font-serif text-[#101010] text-xl font-semibold mb-5">Journey Progress</h2>
        <div className="flex items-start gap-0 overflow-x-auto pb-2">
          {stages.map((stage, idx) => (
            <div key={stage.id} className="flex items-start flex-shrink-0">
              <div className="flex flex-col items-center min-w-[120px]">
                {/* Stage circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  stage.status === 'completed' ? 'bg-[#173D35] border-[#173D35]' :
                  stage.status === 'active' ? 'bg-white border-[#B8965E] shadow-md' :
                  'bg-white border-[#D9D4C9]'
                }`}>
                  {stage.status === 'completed' ? (
                    <CheckCircle2 size={18} className="text-white" />
                  ) : stage.status === 'active' ? (
                    <div className="w-3 h-3 rounded-full bg-[#B8965E] animate-pulse" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-[#D9D4C9]" />
                  )}
                </div>
                {/* Label */}
                <p className={`text-xs font-medium font-sans mt-2 text-center leading-tight ${
                  stage.status === 'active' ? 'text-[#B8965E]' :
                  stage.status === 'completed' ? 'text-[#173D35]' : 'text-[#9DA2A8]'
                }`}>{stage.label}</p>
                {/* Meta */}
                {stage.status !== 'pending' && (
                  <div className="mt-1.5 space-y-0.5 text-center">
                    <p className="text-[10px] text-[#9DA2A8] font-sans flex items-center gap-1 justify-center">
                      <Clock size={9} />{stage.timeInStage}
                    </p>
                    {stage.risk && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-sans font-semibold ${
                        stage.risk === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                      }`}>{stage.risk}</span>
                    )}
                  </div>
                )}
              </div>
              {idx < stages.length - 1 && (
                <div className={`h-0.5 w-8 mt-5 flex-shrink-0 ${
                  stage.status === 'completed' ? 'bg-[#173D35]' : 'bg-[#E8E3DA]'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Snapshot + Escalation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Participant Snapshot */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-6">
          <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Participant Snapshot</h2>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-14 h-14 rounded-full bg-[#173D35] flex items-center justify-center text-[#F5F2EB] text-xl font-semibold font-serif">MT</div>
            <div>
              <p className="font-semibold text-[#101010] font-sans">Marcus Thompson</p>
              <p className="text-xs text-[#72777D] font-sans">ID: GEN-2026-0047 · Spring Cohort</p>
              <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-sans font-semibold">Active Intervention</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-[#F0EDE6]">
              <span className="text-xs text-[#72777D] font-sans">Readiness Score</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-[#E8E3DA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#173D35] rounded-full" style={{width:'63%'}} />
                </div>
                <span className="text-sm font-semibold text-[#101010] font-sans">63</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#F0EDE6]">
              <span className="text-xs text-[#72777D] font-sans">Attendance</span>
              <span className="text-sm font-semibold text-[#101010] font-sans">72%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#F0EDE6]">
              <span className="text-xs text-[#72777D] font-sans">Engagement Trend</span>
              <div className="flex items-center gap-1 text-amber-600">
                <TrendingDown size={13} />
                <span className="text-xs font-sans font-medium">Declining</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#F0EDE6]">
              <span className="text-xs text-[#72777D] font-sans">Interventions</span>
              <span className="text-sm font-semibold text-[#101010] font-sans">3 active</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#F0EDE6]">
              <span className="text-xs text-[#72777D] font-sans flex items-center gap-1"><Home size={11} />Housing</span>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-sans">Transitional</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#F0EDE6]">
              <span className="text-xs text-[#72777D] font-sans flex items-center gap-1"><Briefcase size={11} />Employment</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-sans">Job Search</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-[#72777D] font-sans">Next Required Action</span>
              <span className="text-xs text-[#173D35] font-semibold font-sans">Schedule outreach</span>
            </div>
          </div>
        </div>

        {/* Escalation Logic */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-[#B8965E]" />
            <h2 className="font-serif text-[#101010] text-lg font-semibold">Escalation Intelligence</h2>
          </div>
          <div className="space-y-3">
            {escalations.map((e) => (
              <div key={e.id} className="p-3 rounded-xl border border-[#E8E3DA] bg-[#FAFAF8]">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-sm font-medium text-[#101010] font-sans leading-snug">{e.signal}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans flex-shrink-0 ${urgencyColor[e.urgency]}`}>
                    {e.urgency}
                  </span>
                </div>
                <p className="text-xs text-[#72777D] font-sans flex items-center gap-1">
                  <ChevronRight size={11} className="text-[#B8965E]" />{e.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Actions */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-6">
          <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Staff Actions</h2>
          <div className="space-y-2.5">
            {[
              { icon: AlertTriangle, label: 'Assign Intervention', color: 'bg-[#173D35] text-white hover:bg-[#1a4a40]' },
              { icon: Phone, label: 'Schedule Outreach', color: 'bg-white border border-[#D9D4C9] text-[#101010] hover:bg-[#F5F2EB]' },
              { icon: FileText, label: 'Add Case Note', color: 'bg-white border border-[#D9D4C9] text-[#101010] hover:bg-[#F5F2EB]' },
              { icon: ArrowUpCircle, label: 'Escalate to Supervisor', color: 'bg-white border border-red-200 text-red-700 hover:bg-red-50' },
              { icon: Award, label: 'Mark Stabilized', color: 'bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50' },
            ].map((action) => (
              <button key={action.label} className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium font-sans transition-colors ${action.color}`}>
                <action.icon size={15} />
                {action.label}
              </button>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-[#E8E3DA]">
            <p className="text-[10px] text-[#9DA2A8] font-sans uppercase tracking-widest mb-2">Assigned Coach</p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#173D35] flex items-center justify-center text-[#F5F2EB] text-xs font-semibold">MT</div>
              <div>
                <p className="text-sm font-medium text-[#101010] font-sans">M. Torres</p>
                <p className="text-[10px] text-[#72777D] font-sans">Case Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline + Trajectory */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-6">
        <div className="flex items-center gap-4 mb-5">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`text-sm font-medium font-sans pb-1 border-b-2 transition-colors ${activeTab === 'timeline' ? 'border-[#173D35] text-[#173D35]' : 'border-transparent text-[#72777D] hover:text-[#101010]'}`}
          >
            Timeline Activity Feed
          </button>
          <button
            onClick={() => setActiveTab('trajectory')}
            className={`text-sm font-medium font-sans pb-1 border-b-2 transition-colors ${activeTab === 'trajectory' ? 'border-[#173D35] text-[#173D35]' : 'border-transparent text-[#72777D] hover:text-[#101010]'}`}
          >
            Readiness Trajectory
          </button>
        </div>

        {activeTab === 'timeline' ? (
          <div className="space-y-3">
            {timelineEvents.map((event) => (
              <div key={event.id} className={`flex gap-4 p-3 rounded-xl border ${severityColor[event.severity]}`}>
                <div className="flex-shrink-0 pt-0.5">
                  <Activity size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium font-sans">{event.event}</p>
                    <span className="text-[10px] font-sans flex-shrink-0 opacity-70">{event.date} · {event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] font-sans opacity-70">Staff: {event.staff}</span>
                    <span className="text-[11px] font-sans font-medium">→ {event.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {[
                { label: 'Confidence', color: '#173D35', key: 'confidence', value: 63 },
                { label: 'Attendance', color: '#B8965E', key: 'attendance', value: 72 },
                { label: 'Wellbeing', color: '#72777D', key: 'wellbeing', value: 68 },
                { label: 'Employment Readiness', color: '#2E7D5A', key: 'employment', value: 52 },
              ].map((dim) => (
                <div key={dim.key} className="bg-[#FAFAF8] rounded-xl p-3 border border-[#E8E3DA]">
                  <p className="text-xs text-[#72777D] font-sans mb-1">{dim.label}</p>
                  <p className="text-2xl font-semibold text-[#101010] font-sans">{dim.value}</p>
                  <div className="h-8 mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trajectoryData}>
                        <Line type="monotone" dataKey={dim.key} stroke={dim.color} strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trajectoryData}>
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9DA2A8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E8E3DA' }} />
                  <Line type="monotone" dataKey="confidence" stroke="#173D35" strokeWidth={2} dot={false} name="Confidence" />
                  <Line type="monotone" dataKey="attendance" stroke="#B8965E" strokeWidth={2} dot={false} name="Attendance" />
                  <Line type="monotone" dataKey="wellbeing" stroke="#72777D" strokeWidth={2} dot={false} name="Wellbeing" />
                  <Line type="monotone" dataKey="employment" stroke="#2E7D5A" strokeWidth={2} dot={false} name="Employment" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
