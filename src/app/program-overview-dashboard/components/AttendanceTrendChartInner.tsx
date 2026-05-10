'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { week: 'Wk 1', attendance: 71, checkIns: 65 },
  { week: 'Wk 2', attendance: 78, checkIns: 72 },
  { week: 'Wk 3', attendance: 74, checkIns: 68 },
  { week: 'Wk 4', attendance: 83, checkIns: 79 },
  { week: 'Wk 5', attendance: 80, checkIns: 75 },
  { week: 'Wk 6', attendance: 88, checkIns: 82 },
  { week: 'Wk 7', attendance: 86, checkIns: 80 },
  { week: 'Wk 8', attendance: 92, checkIns: 88 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#D9D4C9] rounded-xl p-3 shadow-elevated text-xs font-sans">
        <p className="text-[#101010] font-semibold mb-2">{label}</p>
        {payload.map((p, i) => (
          <p key={`att-tt-${i}`} className="text-[#72777D]">
            {p.name}: <span className="text-[#101010] font-medium">{p.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AttendanceTrendChartInner() {
  return (
    <div className="bg-white border border-[#D9D4C9] rounded-xl p-5 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-[#101010] text-lg font-semibold">Attendance & Check-In Trend</h3>
          <p className="text-[#72777D] text-xs font-sans mt-0.5">8-week pilot cohort performance</p>
        </div>
        <div className="flex gap-4">
          {[
            { id: 'legend-att', color: '#173D35', label: 'Attendance' },
            { id: 'legend-ci', color: '#B8965E', label: 'Check-Ins' },
          ].map(({ id, color, label }) => (
            <div key={id} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[11px] text-[#72777D] font-sans">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#173D35" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#173D35" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="checkInsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B8965E" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#B8965E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#EAE6DE" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: '#72777D', fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[50, 100]}
            tick={{ fontSize: 11, fill: '#72777D', fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="attendance"
            name="Attendance"
            stroke="#173D35"
            strokeWidth={2}
            fill="url(#attendanceGrad)"
          />
          <Area
            type="monotone"
            dataKey="checkIns"
            name="Check-Ins"
            stroke="#B8965E"
            strokeWidth={2}
            fill="url(#checkInsGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}