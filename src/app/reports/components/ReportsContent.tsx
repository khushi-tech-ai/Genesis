'use client';
import React, { useState } from 'react';
import { Download, FileText, Presentation, BarChart3, Users, Award, Home, Briefcase } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const cohortData = [
  { cohort: 'Spring 25', retention: 82, graduation: 74, employment: 68, attendance: 85 },
  { cohort: 'Summer 25', retention: 78, graduation: 70, employment: 72, attendance: 82 },
  { cohort: 'Fall 25', retention: 85, graduation: 78, employment: 75, attendance: 88 },
  { cohort: 'Spring 26', retention: 88, graduation: 80, employment: 78, attendance: 90 },
];

const outcomeData = [
  { month: 'Jan', housing: 65, employment: 48, engagement: 72, confidence: 58 },
  { month: 'Feb', housing: 70, employment: 52, engagement: 75, confidence: 63 },
  { month: 'Mar', housing: 72, employment: 58, engagement: 78, confidence: 68 },
  { month: 'Apr', housing: 75, employment: 63, engagement: 80, confidence: 72 },
  { month: 'May', housing: 78, employment: 68, engagement: 83, confidence: 76 },
];

const fundingData = [
  { name: 'Participants Served', value: 47, icon: Users, color: '#173D35' },
  { name: 'Interventions Completed', value: 124, icon: Award, color: '#B8965E' },
  { name: 'Housing Stabilized', value: 31, icon: Home, color: '#2E7D5A' },
  { name: 'Employment Placed', value: 18, icon: Briefcase, color: '#72777D' },
];

const pieData = [
  { name: 'Housing', value: 28, color: '#173D35' },
  { name: 'Employment', value: 22, color: '#B8965E' },
  { name: 'Mental Health', value: 18, color: '#2E7D5A' },
  { name: 'Transportation', value: 15, color: '#72777D' },
  { name: 'Attendance', value: 17, color: '#D9D4C9' },
];

export default function ReportsContent() {
  const [mode, setMode] = useState<'executive' | 'cohort' | 'outcomes' | 'funding'>('executive');

  return (
    <div className="p-6 xl:p-8 space-y-6 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[#101010] text-3xl font-semibold">Reports & Analytics</h1>
          <p className="text-[#72777D] text-sm font-sans mt-1">Executive reporting, cohort analytics, and funding impact measurement</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D9D4C9] rounded-lg text-sm font-medium font-sans text-[#101010] hover:bg-[#F5F2EB] transition-colors">
            <Download size={14} />Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#173D35] text-white rounded-lg text-sm font-medium font-sans hover:bg-[#1a4a40] transition-colors">
            <Presentation size={14} />Board Mode
          </button>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1 bg-white border border-[#E8E3DA] rounded-xl p-1 w-fit">
        {[
          { key: 'executive', label: 'Executive KPIs' },
          { key: 'cohort', label: 'Cohort Analytics' },
          { key: 'outcomes', label: 'Outcomes' },
          { key: 'funding', label: 'Funding Impact' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setMode(tab.key as typeof mode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium font-sans transition-colors ${
              mode === tab.key ? 'bg-[#173D35] text-white' : 'text-[#72777D] hover:text-[#101010]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {mode === 'executive' && (
        <>
          {/* Executive KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Retention Rate', value: '88%', change: '+6% vs last cycle', positive: true },
              { label: 'Graduation Rate', value: '80%', change: '+4% vs last cycle', positive: true },
              { label: 'Employment Placement', value: '78%', change: '+10% vs last cycle', positive: true },
              { label: 'Attendance Recovery', value: '68%', change: '+3% this month', positive: true },
              { label: 'Intervention Success', value: '74%', change: '+6% this cycle', positive: true },
              { label: 'Readiness Improvement', value: '+24pts', change: 'Avg per participant', positive: null },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
                <p className="text-xs text-[#72777D] font-sans mb-2">{kpi.label}</p>
                <p className="text-4xl font-semibold text-[#101010] font-serif">{kpi.value}</p>
                <p className={`text-xs font-sans mt-2 ${kpi.positive ? 'text-emerald-600' : 'text-[#9DA2A8]'}`}>{kpi.change}</p>
              </div>
            ))}
          </div>

          {/* Trend chart */}
          <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
            <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Outcome Trends — Spring 2026</h2>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={outcomeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE6" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9DA2A8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9DA2A8' }} axisLine={false} tickLine={false} domain={[30, 100]} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E8E3DA' }} />
                  <Line type="monotone" dataKey="housing" stroke="#173D35" strokeWidth={2.5} dot={false} name="Housing Stability" />
                  <Line type="monotone" dataKey="employment" stroke="#B8965E" strokeWidth={2} dot={false} name="Employment" />
                  <Line type="monotone" dataKey="engagement" stroke="#2E7D5A" strokeWidth={2} dot={false} name="Engagement" />
                  <Line type="monotone" dataKey="confidence" stroke="#72777D" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Confidence" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {mode === 'cohort' && (
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
          <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Cohort Comparison</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cohortData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE6" />
                <XAxis dataKey="cohort" tick={{ fontSize: 11, fill: '#9DA2A8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9DA2A8' }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E8E3DA' }} />
                <Bar dataKey="retention" fill="#173D35" radius={[4, 4, 0, 0]} name="Retention %" />
                <Bar dataKey="graduation" fill="#B8965E" radius={[4, 4, 0, 0]} name="Graduation %" />
                <Bar dataKey="employment" fill="#2E7D5A" radius={[4, 4, 0, 0]} name="Employment %" />
                <Bar dataKey="attendance" fill="#D9D4C9" radius={[4, 4, 0, 0]} name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {mode === 'outcomes' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
            <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Outcome Measurement</h2>
            <div className="space-y-4">
              {[
                { label: 'Housing Stabilization', value: 78, color: '#173D35' },
                { label: 'Employment Progression', value: 68, color: '#B8965E' },
                { label: 'Engagement Recovery', value: 74, color: '#2E7D5A' },
                { label: 'Confidence Growth', value: 72, color: '#72777D' },
                { label: 'Long-term Retention', value: 88, color: '#173D35' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-[#101010] font-sans">{item.label}</span>
                    <span className="text-xs font-semibold text-[#101010] font-sans">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-[#E8E3DA] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${item.value}%`, backgroundColor: item.color}} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
            <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Intervention Distribution</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E8E3DA' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: d.color}} />
                  <span className="text-[11px] text-[#72777D] font-sans">{d.name} {d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === 'funding' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {fundingData.map((item) => (
              <div key={item.name} className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{backgroundColor: item.color + '20'}}>
                  <item.icon size={18} style={{color: item.color}} />
                </div>
                <p className="text-3xl font-semibold text-[#101010] font-serif">{item.value}</p>
                <p className="text-xs text-[#72777D] font-sans mt-1">{item.name}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
            <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Estimated Social Impact</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {[
                { label: 'Estimated Cost Savings', value: '$2.4M', sub: 'Reduced recidivism & emergency services' },
                { label: 'Operational Efficiency', value: '94%', sub: 'Resource utilization rate' },
                { label: 'Grant Compliance Rate', value: '100%', sub: 'All reporting requirements met' },
              ].map((item) => (
                <div key={item.label} className="bg-[#F5F2EB] rounded-xl p-4">
                  <p className="text-xs text-[#72777D] font-sans mb-1">{item.label}</p>
                  <p className="text-3xl font-semibold text-[#173D35] font-serif">{item.value}</p>
                  <p className="text-[11px] text-[#9DA2A8] font-sans mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export tools */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
        <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Export & Presentation Tools</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'PDF Export', icon: Download },
            { label: 'Executive Summary', icon: FileText },
            { label: 'Board Presentation', icon: Presentation },
            { label: 'Grant Reporting', icon: Award },
            { label: 'Monthly Operational Report', icon: BarChart3 },
          ].map((tool) => (
            <button key={tool.label} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium font-sans border border-[#D9D4C9] text-[#101010] hover:bg-[#F5F2EB] transition-colors">
              <tool.icon size={14} />
              {tool.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
