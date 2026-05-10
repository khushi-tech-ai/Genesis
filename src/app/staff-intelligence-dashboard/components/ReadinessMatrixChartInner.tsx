'use client';
import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,  } from 'recharts';

const data = [
  { name: 'Alex R.', readiness: 72, attendance: 65, trend: 68, risk: 'high' },
  { name: 'Jordan S.', readiness: 58, attendance: 85, trend: 71, risk: 'moderate' },
  { name: 'Taylor C.', readiness: 88, attendance: 98, trend: 93, risk: 'low' },
  { name: 'Sam W.', readiness: 41, attendance: 50, trend: 45, risk: 'high' },
  { name: 'Maria G.', readiness: 79, attendance: 90, trend: 84, risk: 'low' },
  { name: 'Devon K.', readiness: 63, attendance: 78, trend: 70, risk: 'moderate' },
  { name: 'Priya N.', readiness: 91, attendance: 95, trend: 93, risk: 'low' },
  { name: 'James T.', readiness: 34, attendance: 45, trend: 39, risk: 'high' },
];

const riskColors: Record<string, string> = {
  high: '#C83C3C',
  moderate: '#B8965E',
  low: '#173D35',
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#D9D4C9] rounded-xl p-3.5 shadow-elevated text-xs font-sans min-w-[140px]">
        <p className="text-[#101010] font-semibold mb-2 font-sans">{label}</p>
        {payload.map((p, i) => (
          <div key={`tt-${i}`} className="flex items-center justify-between gap-4 mt-1">
            <span className="text-[#72777D]">
              {p.dataKey === 'readiness' ? 'Readiness' : p.dataKey === 'attendance' ? 'Attendance' : 'Avg Trend'}
            </span>
            <span className="text-[#101010] font-semibold">{p.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = () => (
  <div className="flex items-center gap-5 mt-3">
    <div className="flex items-center gap-1.5">
      <div className="w-3 h-3 rounded-sm bg-[#173D35]" />
      <span className="text-[11px] text-[#72777D] font-sans">Readiness (risk-colored)</span>
    </div>
    <div className="flex items-center gap-1.5">
      <div className="w-3 h-3 rounded-sm bg-[#B8965E]/40" />
      <span className="text-[11px] text-[#72777D] font-sans">Attendance</span>
    </div>
    <div className="flex items-center gap-1.5">
      <div className="w-6 h-0.5 bg-[#173D35]/50 rounded" style={{ borderTop: '2px dashed #173D35' }} />
      <span className="text-[11px] text-[#72777D] font-sans">Progress Trend</span>
    </div>
  </div>
);

export default function ReadinessMatrixChartInner() {
  return (
    <div className="bg-white border border-[#D9D4C9] rounded-xl p-5 shadow-soft">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="font-serif text-[#101010] text-lg font-semibold">Readiness Matrix</h3>
          <p className="text-[#72777D] text-xs font-sans mt-0.5">Participant progress trends — readiness, attendance & trajectory</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C83C3C]" />
            <span className="text-[10px] text-[#72777D] font-sans">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B8965E]" />
            <span className="text-[10px] text-[#72777D] font-sans">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#173D35]" />
            <span className="text-[10px] text-[#72777D] font-sans">Low</span>
          </div>
        </div>
      </div>

      <CustomLegend />

      <div className="mt-4">
        <ResponsiveContainer width="100%" height={230}>
          <ComposedChart data={data} barCategoryGap="22%" barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAE6DE" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: '#72777D', fontFamily: 'Inter, sans-serif' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: '#72777D', fontFamily: 'Inter, sans-serif' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="readiness" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-r-${index}`} fill={riskColors[entry.risk]} fillOpacity={0.82} />
              ))}
            </Bar>
            <Bar dataKey="attendance" fill="#B8965E" fillOpacity={0.30} radius={[4, 4, 0, 0]} />
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#173D35"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              dot={{ fill: '#173D35', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#173D35' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[10px] text-[#9DA2A8] font-sans mt-2 text-center">
        Bar color = risk level · Dashed line = progress trajectory · Gold bars = attendance
      </p>
    </div>
  );
}