'use client';
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Calendar, Phone, FileText, ArrowUpCircle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

const weeklyTrend = [
  { week: 'W1', attendance: 78, recovery: 65 },
  { week: 'W2', attendance: 82, recovery: 70 },
  { week: 'W3', attendance: 75, recovery: 68 },
  { week: 'W4', attendance: 80, recovery: 72 },
  { week: 'W5', attendance: 85, recovery: 78 },
  { week: 'W6', attendance: 83, recovery: 80 },
];

const heatmapData = [
  { day: 'Mon', w1: 90, w2: 85, w3: 78, w4: 88, w5: 92 },
  { day: 'Tue', w1: 82, w2: 90, w3: 85, w4: 80, w5: 88 },
  { day: 'Wed', w1: 75, w2: 78, w3: 90, w4: 85, w5: 82 },
  { day: 'Thu', w1: 88, w2: 82, w3: 80, w4: 92, w5: 85 },
  { day: 'Fri', w1: 70, w2: 75, w3: 72, w4: 78, w5: 80 },
];

const participants = [
  { name: 'Marcus Thompson', attendance: 72, sessions: 18, missed: 7, trend: 'down', risk: 'high', coach: 'M. Torres', trajectory: 'declining' },
  { name: 'Jasmine Rivera', attendance: 88, sessions: 22, missed: 3, trend: 'up', risk: 'low', coach: 'S. Chen', trajectory: 'improving' },
  { name: 'Devon Williams', attendance: 65, sessions: 16, missed: 9, trend: 'down', risk: 'high', coach: 'R. Patel', trajectory: 'at-risk' },
  { name: 'Aaliyah Johnson', attendance: 79, sessions: 20, missed: 5, trend: 'stable', risk: 'moderate', coach: 'S. Chen', trajectory: 'stable' },
  { name: 'Carlos Mendez', attendance: 91, sessions: 23, missed: 2, trend: 'up', risk: 'low', coach: 'M. Torres', trajectory: 'improving' },
  { name: 'Tanya Brooks', attendance: 58, sessions: 14, missed: 11, trend: 'down', risk: 'high', coach: 'R. Patel', trajectory: 'declining' },
  { name: 'James Carter', attendance: 84, sessions: 21, missed: 4, trend: 'up', risk: 'low', coach: 'S. Chen', trajectory: 'improving' },
];

const alerts = [
  { participant: 'Tanya Brooks', type: 'Repeated Absence', detail: '4 missed sessions in 2 weeks', urgency: 'critical' },
  { participant: 'Devon Williams', type: 'No-Show Pattern', detail: '3 consecutive no-shows', urgency: 'high' },
  { participant: 'Marcus Thompson', type: 'Disengagement Risk', detail: 'Attendance dropped 18% this month', urgency: 'high' },
  { participant: 'Aaliyah Johnson', type: 'Same-Day Outreach', detail: 'Missed today — recommend immediate contact', urgency: 'moderate' },
];

export default function AttendanceContent() {
  const [riskFilter, setRiskFilter] = useState('all');

  const filtered = participants.filter(p => riskFilter === 'all' || p.risk === riskFilter);

  const trendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp size={13} className="text-emerald-600" />;
    if (trend === 'down') return <TrendingDown size={13} className="text-red-500" />;
    return <Minus size={13} className="text-[#72777D]" />;
  };

  const riskBadge = (risk: string) => {
    const colors: Record<string, string> = { high: 'bg-red-100 text-red-700', moderate: 'bg-amber-100 text-amber-700', low: 'bg-emerald-100 text-emerald-700' };
    return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans capitalize ${colors[risk]}`}>{risk}</span>;
  };

  const heatColor = (val: number) => {
    if (val >= 90) return 'bg-[#173D35] text-white';
    if (val >= 80) return 'bg-[#2E7D5A] text-white';
    if (val >= 70) return 'bg-[#B8965E] text-white';
    return 'bg-red-400 text-white';
  };

  return (
    <div className="p-6 xl:p-8 space-y-6 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[#101010] text-3xl font-semibold">Attendance Intelligence</h1>
          <p className="text-[#72777D] text-sm font-sans mt-1">Patterns, engagement consistency, and recovery tracking</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: 'Overall Attendance', value: '79%', sub: '+2% this week', positive: true },
          { label: 'Active Participants', value: '47', sub: '3 at-risk', positive: null },
          { label: 'Missed Sessions', value: '41', sub: 'This month', positive: false },
          { label: 'Recovery Rate', value: '68%', sub: 'Returning after miss', positive: true },
          { label: 'At-Risk Alerts', value: '4', sub: 'Require outreach', positive: false },
          { label: 'Avg Sessions/Week', value: '4.2', sub: 'Per participant', positive: null },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-[#E8E3DA] p-4">
            <p className="text-xs text-[#72777D] font-sans mb-1">{kpi.label}</p>
            <p className="text-2xl font-semibold text-[#101010] font-sans">{kpi.value}</p>
            <p className={`text-[11px] font-sans mt-0.5 ${kpi.positive === true ? 'text-emerald-600' : kpi.positive === false ? 'text-red-500' : 'text-[#9DA2A8]'}`}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend chart */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
          <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Weekly Attendance Trend</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE6" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9DA2A8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9DA2A8' }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E8E3DA' }} />
                <Line type="monotone" dataKey="attendance" stroke="#173D35" strokeWidth={2.5} dot={{ fill: '#173D35', r: 3 }} name="Attendance %" />
                <Line type="monotone" dataKey="recovery" stroke="#B8965E" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Recovery %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
          <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Weekly Participation Heatmap</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-sans">
              <thead>
                <tr>
                  <th className="text-left text-[#9DA2A8] font-medium pb-2 pr-3">Day</th>
                  {['W1', 'W2', 'W3', 'W4', 'W5'].map(w => (
                    <th key={w} className="text-center text-[#9DA2A8] font-medium pb-2 px-1">{w}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmapData.map(row => (
                  <tr key={row.day}>
                    <td className="text-[#72777D] font-medium pr-3 py-1">{row.day}</td>
                    {[row.w1, row.w2, row.w3, row.w4, row.w5].map((val, i) => (
                      <td key={i} className="px-1 py-1 text-center">
                        <div className={`rounded-md px-2 py-1.5 font-semibold ${heatColor(val)}`}>{val}%</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
        <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Missed Session Alerts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {alerts.map((alert) => {
            const urgencyColor: Record<string, string> = { critical: 'border-red-200 bg-red-50', high: 'border-orange-200 bg-orange-50', moderate: 'border-amber-200 bg-amber-50' };
            const badgeColor: Record<string, string> = { critical: 'bg-red-100 text-red-700', high: 'bg-orange-100 text-orange-700', moderate: 'bg-amber-100 text-amber-700' };
            return (
              <div key={alert.participant} className={`flex items-start gap-3 p-3 rounded-xl border ${urgencyColor[alert.urgency]}`}>
                <AlertTriangle size={15} className={alert.urgency === 'critical' ? 'text-red-500 mt-0.5' : 'text-amber-500 mt-0.5'} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-[#101010] font-sans">{alert.participant}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans ${badgeColor[alert.urgency]}`}>{alert.type}</span>
                  </div>
                  <p className="text-xs text-[#72777D] font-sans">{alert.detail}</p>
                </div>
                <button className="text-xs text-[#173D35] font-semibold font-sans hover:underline flex-shrink-0">Outreach</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Participant Table */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-[#101010] text-lg font-semibold">Participant Attendance</h2>
          <div className="flex gap-1">
            {['all', 'high', 'moderate', 'low'].map(f => (
              <button key={f} onClick={() => setRiskFilter(f)} className={`px-3 py-1 rounded-lg text-xs font-medium font-sans capitalize transition-colors ${riskFilter === f ? 'bg-[#173D35] text-white' : 'bg-[#F5F2EB] text-[#72777D] hover:bg-[#E8E3DA]'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-[#E8E3DA]">
                {['Participant', 'Attendance %', 'Sessions', 'Missed', 'Trend', 'Risk', 'Coach', 'Trajectory'].map(h => (
                  <th key={h} className="text-left text-[10px] text-[#9DA2A8] uppercase tracking-widest font-semibold pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.name} className="border-b border-[#F0EDE6] hover:bg-[#FAFAF8] transition-colors">
                  <td className="py-3 pr-4 font-medium text-[#101010]">{p.name}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#E8E3DA] rounded-full overflow-hidden">
                        <div className="h-full bg-[#173D35] rounded-full" style={{width:`${p.attendance}%`}} />
                      </div>
                      <span className="font-semibold text-[#101010]">{p.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-[#72777D]">{p.sessions}</td>
                  <td className="py-3 pr-4 text-[#72777D]">{p.missed}</td>
                  <td className="py-3 pr-4">{trendIcon(p.trend)}</td>
                  <td className="py-3 pr-4">{riskBadge(p.risk)}</td>
                  <td className="py-3 pr-4 text-[#72777D]">{p.coach}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans capitalize ${
                      p.trajectory === 'improving' ? 'bg-emerald-100 text-emerald-700' :
                      p.trajectory === 'declining' ? 'bg-red-100 text-red-700' :
                      p.trajectory === 'at-risk' ? 'bg-orange-100 text-orange-700' : 'bg-[#F0EDE6] text-[#72777D]'
                    }`}>{p.trajectory}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff Actions */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
        <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Staff Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Log Attendance', icon: Calendar, primary: true },
            { label: 'Trigger Outreach', icon: Phone, primary: false },
            { label: 'Add Attendance Note', icon: FileText, primary: false },
            { label: 'Escalate Attendance Concern', icon: ArrowUpCircle, primary: false, danger: true },
            { label: 'Schedule Follow-Up', icon: Clock, primary: false },
          ].map((action) => (
            <button key={action.label} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium font-sans transition-colors ${
              action.primary ? 'bg-[#173D35] text-white hover:bg-[#1a4a40]' :
              action.danger ? 'border border-red-200 text-red-700 hover:bg-red-50': 'border border-[#D9D4C9] text-[#101010] hover:bg-[#F5F2EB]'
            }`}>
              <action.icon size={14} />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
