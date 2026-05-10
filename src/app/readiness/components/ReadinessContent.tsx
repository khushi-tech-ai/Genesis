'use client';
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Home, Bus, Briefcase, Heart, MessageSquare, Calendar, Target, FileText, Phone, Award } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const trajectoryData = [
  { month: 'Jan', readiness: 45, confidence: 40, engagement: 50 },
  { month: 'Feb', readiness: 52, confidence: 48, engagement: 55 },
  { month: 'Mar', readiness: 58, confidence: 55, engagement: 60 },
  { month: 'Apr', readiness: 63, confidence: 62, engagement: 65 },
  { month: 'May', readiness: 70, confidence: 68, engagement: 72 },
];

const radarData = [
  { dimension: 'Attendance', value: 79 },
  { dimension: 'Wellbeing', value: 68 },
  { dimension: 'Confidence', value: 72 },
  { dimension: 'Employment', value: 58 },
  { dimension: 'Housing', value: 75 },
  { dimension: 'Transport', value: 82 },
  { dimension: 'Communication', value: 70 },
];

const participants = [
  { name: 'Carlos Mendez', score: 84, confidence: 'up', stability: 'stable', engagement: 'active', growth: 'strong', coach: 'M. Torres' },
  { name: 'Jasmine Rivera', score: 78, confidence: 'up', stability: 'stable', engagement: 'active', growth: 'improving', coach: 'S. Chen' },
  { name: 'James Carter', score: 75, confidence: 'stable', stability: 'stable', engagement: 'active', growth: 'improving', coach: 'S. Chen' },
  { name: 'Aaliyah Johnson', score: 68, confidence: 'stable', stability: 'moderate', engagement: 'moderate', growth: 'stable', coach: 'S. Chen' },
  { name: 'Marcus Thompson', score: 63, confidence: 'down', stability: 'unstable', engagement: 'declining', growth: 'at-risk', coach: 'M. Torres' },
  { name: 'Devon Williams', score: 55, confidence: 'down', stability: 'unstable', engagement: 'declining', growth: 'declining', coach: 'R. Patel' },
  { name: 'Tanya Brooks', score: 48, confidence: 'down', stability: 'unstable', engagement: 'disengaged', growth: 'critical', coach: 'R. Patel' },
];

const dimensions = [
  { label: 'Attendance Consistency', icon: Calendar, value: 79, color: '#173D35' },
  { label: 'Emotional Wellbeing', icon: Heart, value: 68, color: '#B8965E' },
  { label: 'Confidence', icon: Target, value: 72, color: '#2E7D5A' },
  { label: 'Employment Readiness', icon: Briefcase, value: 58, color: '#72777D' },
  { label: 'Housing Stability', icon: Home, value: 75, color: '#173D35' },
  { label: 'Transportation Stability', icon: Bus, value: 82, color: '#B8965E' },
  { label: 'Communication Responsiveness', icon: MessageSquare, value: 70, color: '#2E7D5A' },
];

export default function ReadinessContent() {
  const [view, setView] = useState<'table' | 'radar'>('table');

  const trendIcon = (t: string) => {
    if (t === 'up') return <TrendingUp size={13} className="text-emerald-600" />;
    if (t === 'down') return <TrendingDown size={13} className="text-red-500" />;
    return <Minus size={13} className="text-[#72777D]" />;
  };

  const growthBadge = (g: string) => {
    const map: Record<string, string> = {
      strong: 'bg-emerald-100 text-emerald-700',
      improving: 'bg-blue-100 text-blue-700',
      stable: 'bg-[#F0EDE6] text-[#72777D]',
      'at-risk': 'bg-amber-100 text-amber-700',
      declining: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-100 text-red-700',
    };
    return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans capitalize ${map[g] || ''}`}>{g}</span>;
  };

  return (
    <div className="p-6 xl:p-8 space-y-6 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[#101010] text-3xl font-semibold">Readiness Intelligence</h1>
          <p className="text-[#72777D] text-sm font-sans mt-1">Participant growth, confidence, and workforce readiness progression</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: 'Avg Readiness Score', value: '69', sub: '+4 this month' },
          { label: 'Confidence Growth', value: '+12%', sub: 'Cohort average' },
          { label: 'Engagement Progress', value: '74%', sub: 'Active participants' },
          { label: 'Wellbeing Trend', value: '68%', sub: 'Stable or improving' },
          { label: 'Milestones Completed', value: '38', sub: 'This cycle' },
          { label: 'Workforce Ready', value: '31%', sub: '15 participants' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-[#E8E3DA] p-4">
            <p className="text-xs text-[#72777D] font-sans mb-1">{kpi.label}</p>
            <p className="text-2xl font-semibold text-[#101010] font-sans">{kpi.value}</p>
            <p className="text-[11px] text-[#9DA2A8] font-sans mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Dimensions + Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dimensions */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
          <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Readiness Dimensions</h2>
          <div className="space-y-3">
            {dimensions.map((dim) => (
              <div key={dim.label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: dim.color + '20'}}>
                  <dim.icon size={13} style={{color: dim.color}} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-[#101010] font-sans">{dim.label}</span>
                    <span className="text-xs font-semibold text-[#101010] font-sans">{dim.value}%</span>
                  </div>
                  <div className="h-1.5 bg-[#E8E3DA] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{width:`${dim.value}%`, backgroundColor: dim.color}} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trajectory */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
          <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Readiness Trajectory</h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trajectoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE6" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9DA2A8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9DA2A8' }} axisLine={false} tickLine={false} domain={[30, 100]} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E8E3DA' }} />
                <Line type="monotone" dataKey="readiness" stroke="#173D35" strokeWidth={2.5} dot={{ fill: '#173D35', r: 3 }} name="Readiness" />
                <Line type="monotone" dataKey="confidence" stroke="#B8965E" strokeWidth={2} dot={false} name="Confidence" />
                <Line type="monotone" dataKey="engagement" stroke="#72777D" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Engagement" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk vs Readiness */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
        <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Risk vs Readiness Intelligence</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { label: 'Improving', count: 3, color: 'bg-emerald-50 border-emerald-200 text-emerald-700', participants: ['Carlos M.', 'Jasmine R.', 'James C.'] },
            { label: 'Plateauing', count: 1, color: 'bg-blue-50 border-blue-200 text-blue-700', participants: ['Aaliyah J.'] },
            { label: 'Confidence Decline', count: 2, color: 'bg-amber-50 border-amber-200 text-amber-700', participants: ['Marcus T.', 'Devon W.'] },
            { label: 'Hidden Disengagement', count: 1, color: 'bg-orange-50 border-orange-200 text-orange-700', participants: ['Tanya B.'] },
            { label: 'Positive Recovery', count: 2, color: 'bg-[#F5F2EB] border-[#D9D4C9] text-[#173D35]', participants: ['Jasmine R.', 'James C.'] },
          ].map((cat) => (
            <div key={cat.label} className={`rounded-xl border p-3 ${cat.color}`}>
              <p className="text-xs font-semibold font-sans mb-1">{cat.label}</p>
              <p className="text-2xl font-semibold font-sans mb-2">{cat.count}</p>
              <div className="space-y-0.5">
                {cat.participants.map(p => <p key={p} className="text-[10px] font-sans opacity-80">{p}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Participant Table */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
        <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Participant Readiness Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-[#E8E3DA]">
                {['Participant', 'Readiness Score', 'Confidence', 'Stability', 'Engagement', 'Growth', 'Coach'].map(h => (
                  <th key={h} className="text-left text-[10px] text-[#9DA2A8] uppercase tracking-widest font-semibold pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.name} className="border-b border-[#F0EDE6] hover:bg-[#FAFAF8] transition-colors">
                  <td className="py-3 pr-4 font-medium text-[#101010]">{p.name}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 bg-[#E8E3DA] rounded-full overflow-hidden">
                        <div className="h-full bg-[#173D35] rounded-full" style={{width:`${p.score}%`}} />
                      </div>
                      <span className="font-semibold text-[#101010]">{p.score}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">{trendIcon(p.confidence)}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans capitalize ${
                      p.stability === 'stable' ? 'bg-emerald-100 text-emerald-700' :
                      p.stability === 'moderate' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>{p.stability}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans capitalize ${
                      p.engagement === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      p.engagement === 'moderate' ? 'bg-blue-100 text-blue-700' :
                      p.engagement === 'declining' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>{p.engagement}</span>
                  </td>
                  <td className="py-3 pr-4">{growthBadge(p.growth)}</td>
                  <td className="py-3 pr-4 text-[#72777D]">{p.coach}</td>
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
            { label: 'Update Readiness Plan', icon: FileText, primary: true },
            { label: 'Add Coaching Note', icon: MessageSquare, primary: false },
            { label: 'Assign Goal', icon: Target, primary: false },
            { label: 'Schedule Check-In', icon: Phone, primary: false },
            { label: 'Mark Milestone Complete', icon: Award, primary: false, accent: true },
          ].map((action) => (
            <button key={action.label} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium font-sans transition-colors ${
              action.primary ? 'bg-[#173D35] text-white hover:bg-[#1a4a40]' :
              action.accent ? 'border border-[#B8965E] text-[#B8965E] hover:bg-[#FBF7F0]': 'border border-[#D9D4C9] text-[#101010] hover:bg-[#F5F2EB]'
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
