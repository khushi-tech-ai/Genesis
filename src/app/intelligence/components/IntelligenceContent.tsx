'use client';
import React, { useState } from 'react';
import { Brain, TrendingUp, TrendingDown, ChevronRight, Zap, Eye, Activity, Phone, ArrowUpCircle, BarChart3 } from 'lucide-react';
import { XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';

const recommendations = [
  {
    id: 1, signal: 'Transportation instability detected', urgency: 'high', confidence: 87,
    explanation: 'Participant reported transportation issues for 2 consecutive weeks. Attendance dropped 22% and 3 sessions were missed. Pattern matches pre-disengagement profile.',
    nextStep: 'Assign transportation support referral within 24 hours.',
    category: 'transportation',
  },
  {
    id: 2, signal: 'Engagement decline predicted', urgency: 'high', confidence: 82,
    explanation: 'Engagement responsiveness declined 28% over 3 weeks. Check-in response time increased from 2h to 18h. Confidence score dropped 8 points.',
    nextStep: 'Schedule same-day coaching session. Review support plan.',
    category: 'engagement',
  },
  {
    id: 3, signal: 'Same-day outreach recommended', urgency: 'critical', confidence: 94,
    explanation: 'Participant reported elevated stress for 3 weeks, missed 2 sessions, and engagement responsiveness declined by 28%. Housing instability also flagged.',
    nextStep: 'Initiate same-day phone outreach. Escalate to supervisor if no response.',
    category: 'outreach',
  },
  {
    id: 4, signal: 'Housing stabilization improving readiness', urgency: 'low', confidence: 78,
    explanation: 'Participant secured stable housing 3 weeks ago. Attendance improved 15%. Confidence score increased 12 points. Positive trajectory confirmed.',
    nextStep: 'Reinforce momentum. Update readiness plan to reflect housing stability.',
    category: 'positive',
  },
  {
    id: 5, signal: 'Confidence recovering after intervention', urgency: 'low', confidence: 71,
    explanation: 'Post-intervention confidence score increased from 48 to 63 over 4 weeks. Attendance stabilized at 80%. Engagement responsiveness improved.',
    nextStep: 'Continue current support plan. Schedule milestone review.',
    category: 'positive',
  },
];

const riskData = [
  { week: 'W1', risk: 72, disengagement: 65, attendance: 60 },
  { week: 'W2', risk: 68, disengagement: 60, attendance: 65 },
  { week: 'W3', risk: 75, disengagement: 70, attendance: 58 },
  { week: 'W4', risk: 65, disengagement: 62, attendance: 70 },
  { week: 'W5', risk: 58, disengagement: 55, attendance: 75 },
  { week: 'W6', risk: 52, disengagement: 48, attendance: 80 },
];

const patterns = [
  { pattern: 'Missed check-in cycles', participants: 4, trend: 'increasing', severity: 'high' },
  { pattern: 'Emotional wellbeing decline', participants: 3, trend: 'stable', severity: 'moderate' },
  { pattern: 'Attendance inconsistency', participants: 6, trend: 'decreasing', severity: 'moderate' },
  { pattern: 'Intervention effectiveness', participants: 8, trend: 'improving', severity: 'positive' },
  { pattern: 'Hidden positive trends', participants: 5, trend: 'emerging', severity: 'positive' },
];

export default function IntelligenceContent() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const urgencyColor: Record<string, string> = {
    critical: 'border-red-200 bg-red-50',
    high: 'border-orange-200 bg-orange-50',
    low: 'border-emerald-200 bg-emerald-50',
  };

  const urgencyBadge: Record<string, string> = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    low: 'bg-emerald-100 text-emerald-700',
  };

  const categoryIcon: Record<string, React.ReactNode> = {
    transportation: <Activity size={14} />,
    engagement: <TrendingDown size={14} />,
    outreach: <Zap size={14} />,
    positive: <TrendingUp size={14} />,
  };

  return (
    <div className="p-6 xl:p-8 space-y-6 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[#101010] text-3xl font-semibold">Intelligence Center</h1>
          <p className="text-[#72777D] text-sm font-sans mt-1">Predictive insights, risk detection, and AI-supported recommendations</p>
        </div>
        <div className="flex items-center gap-2 bg-[#173D35] text-white rounded-lg px-3 py-1.5">
          <Brain size={14} />
          <span className="text-xs font-sans font-medium">Intelligence Active</span>
        </div>
      </div>

      {/* Overview KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Active Risk Alerts', value: '8', color: 'text-red-600' },
          { label: 'Disengagement Signals', value: '5', color: 'text-orange-600' },
          { label: 'Intervention Recs', value: '12', color: 'text-amber-600' },
          { label: 'Escalation Trends', value: '3', color: 'text-[#101010]' },
          { label: 'Positive Recoveries', value: '7', color: 'text-emerald-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-[#E8E3DA] p-4">
            <p className="text-xs text-[#72777D] font-sans mb-1">{kpi.label}</p>
            <p className={`text-2xl font-semibold font-sans ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* AI Recommendations + Risk Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Recommendations */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E3DA] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain size={16} className="text-[#173D35]" />
            <h2 className="font-serif text-[#101010] text-lg font-semibold">AI Recommendation Feed</h2>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div key={rec.id} className={`rounded-xl border p-4 cursor-pointer transition-all ${urgencyColor[rec.urgency]}`} onClick={() => setExpanded(expanded === rec.id ? null : rec.id)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1">
                    <div className="mt-0.5 flex-shrink-0">{categoryIcon[rec.category]}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#101010] font-sans">{rec.signal}</p>
                      {expanded !== rec.id && (
                        <p className="text-xs text-[#72777D] font-sans mt-0.5 line-clamp-1">{rec.explanation}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans ${urgencyBadge[rec.urgency]}`}>{rec.urgency}</span>
                    <span className="text-[10px] text-[#9DA2A8] font-sans">{rec.confidence}% conf.</span>
                    <ChevronRight size={14} className={`text-[#9DA2A8] transition-transform ${expanded === rec.id ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {expanded === rec.id && (
                  <div className="mt-3 pt-3 border-t border-current border-opacity-20 space-y-2">
                    <div>
                      <p className="text-[10px] font-semibold font-sans uppercase tracking-widest opacity-60 mb-1">Why this recommendation exists</p>
                      <p className="text-xs font-sans leading-relaxed text-[#101010]">{rec.explanation}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold font-sans uppercase tracking-widest opacity-60 mb-1">Suggested Next Step</p>
                      <p className="text-xs font-semibold font-sans flex items-center gap-1">
                        <ChevronRight size={11} />{rec.nextStep}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Risk Engine */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
          <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Predictive Risk Engine</h2>
          <div className="h-44 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE6" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#9DA2A8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9DA2A8' }} axisLine={false} tickLine={false} domain={[30, 100]} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E8E3DA' }} />
                <Area type="monotone" dataKey="risk" stroke="#C83C3C" fill="#FEE2E2" strokeWidth={2} name="Risk Score" />
                <Area type="monotone" dataKey="disengagement" stroke="#B8965E" fill="#FBF7F0" strokeWidth={1.5} name="Disengagement" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Avg Risk Score', value: '58', change: '-14 this month', positive: true },
              { label: 'Disengagement Prob.', value: '32%', change: '-8% improving', positive: true },
              { label: 'Intervention Success', value: '74%', change: '+6% this cycle', positive: true },
              { label: 'Recovery Likelihood', value: '68%', change: 'Stable', positive: null },
            ].map((metric) => (
              <div key={metric.label} className="flex justify-between items-center py-1.5 border-b border-[#F0EDE6]">
                <span className="text-xs text-[#72777D] font-sans">{metric.label}</span>
                <div className="text-right">
                  <span className="text-sm font-semibold text-[#101010] font-sans">{metric.value}</span>
                  <p className={`text-[10px] font-sans ${metric.positive === true ? 'text-emerald-600' : 'text-[#9DA2A8]'}`}>{metric.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Eye size={16} className="text-[#173D35]" />
          <h2 className="font-serif text-[#101010] text-lg font-semibold">Pattern Recognition</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          {patterns.map((p) => {
            const severityColor: Record<string, string> = {
              high: 'bg-red-50 border-red-200',
              moderate: 'bg-amber-50 border-amber-200',
              positive: 'bg-emerald-50 border-emerald-200',
            };
            const trendColor: Record<string, string> = {
              increasing: 'text-red-600',
              stable: 'text-amber-600',
              decreasing: 'text-emerald-600',
              improving: 'text-emerald-600',
              emerging: 'text-blue-600',
            };
            return (
              <div key={p.pattern} className={`rounded-xl border p-3 ${severityColor[p.severity]}`}>
                <p className="text-xs font-semibold text-[#101010] font-sans mb-2 leading-snug">{p.pattern}</p>
                <p className="text-2xl font-semibold text-[#101010] font-sans">{p.participants}</p>
                <p className="text-[10px] text-[#72777D] font-sans">participants</p>
                <p className={`text-[10px] font-semibold font-sans mt-1 capitalize ${trendColor[p.trend]}`}>{p.trend}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Staff Actions */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
        <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Staff Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Trigger Intervention', icon: Zap, primary: true },
            { label: 'Assign Outreach', icon: Phone, primary: false },
            { label: 'Escalate Participant', icon: ArrowUpCircle, primary: false, danger: true },
            { label: 'Review Risk History', icon: Eye, primary: false },
            { label: 'Generate Intelligence Summary', icon: BarChart3, primary: false },
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
