import React from 'react';

export default function ProfileOverviewTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
      {/* Left column */}
      <div className="lg:col-span-2 space-y-5">
        {/* Current Status */}
        <div className="bg-white border border-[#C83C3C]/20 rounded-xl p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C83C3C]" />
            <p className="text-[10px] text-[#C83C3C] uppercase tracking-widest-label font-sans font-semibold">Attention Required</p>
          </div>
          <p className="font-serif text-[#101010] text-lg font-semibold mb-2">Support recommended — two missed sessions this week.</p>
          <p className="text-[#72777D] text-sm font-sans leading-relaxed">
            Jane has not completed her weekly check-in. Attendance dropped from 85% to 68% over the past two weeks. A same-day outreach is recommended.
          </p>
        </div>

        {/* Recent Check-In Summary */}
        <div className="bg-white border border-[#D9D4C9] rounded-xl p-5 shadow-soft">
          <h3 className="font-serif text-[#101010] text-lg font-semibold mb-4">Last Check-In Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'ci-mood', label: 'Mood', value: '2/5', note: 'Low', color: 'text-[#C83C3C]' },
              { id: 'ci-stress', label: 'Stress', value: '8/10', note: 'High', color: 'text-[#C83C3C]' },
              { id: 'ci-confidence', label: 'Confidence', value: '3/10', note: 'Below avg', color: 'text-[#B8965E]' },
              { id: 'ci-readiness', label: 'Readiness', value: '4/10', note: 'Improving', color: 'text-[#B8965E]' },
            ]?.map(({ id, label, value, note, color }) => (
              <div key={id} className="bg-[#F5F2EB] rounded-xl p-3 text-center border border-[#D9D4C9]">
                <p className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans mb-1">{label}</p>
                <p className={`font-serif text-xl font-semibold text-tabular ${color}`}>{value}</p>
                <p className="text-[10px] text-[#9DA2A8] font-sans mt-0.5">{note}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-[#B8965E]/05 border border-[#B8965E]/20 rounded-xl p-3" style={{backgroundColor:'rgba(184,150,94,0.04)'}}>
            <p className="text-[10px] text-[#B8965E] uppercase tracking-widest-label font-sans font-medium mb-1">Support Needs Reported</p>
            <p className="text-[#101010] text-xs font-sans">Housing instability, Transportation barriers flagged in last check-in.</p>
          </div>
        </div>

        {/* Engagement Trend */}
        <div className="bg-white border border-[#D9D4C9] rounded-xl p-5 shadow-soft">
          <h3 className="font-serif text-[#101010] text-lg font-semibold mb-4">Engagement Trend — 8 Weeks</h3>
          <div className="space-y-3">
            {[
              { id: 'week-1', week: 'Week 1', attendance: 90, checkin: true, riskScore: 22 },
              { id: 'week-2', week: 'Week 2', attendance: 85, checkin: true, riskScore: 28 },
              { id: 'week-3', week: 'Week 3', attendance: 80, checkin: true, riskScore: 35 },
              { id: 'week-4', week: 'Week 4', attendance: 75, checkin: false, riskScore: 52 },
              { id: 'week-5', week: 'Week 5', attendance: 70, checkin: true, riskScore: 48 },
              { id: 'week-6', week: 'Week 6', attendance: 65, checkin: false, riskScore: 65 },
              { id: 'week-7', week: 'Week 7', attendance: 60, checkin: false, riskScore: 74 },
              { id: 'week-8', week: 'Week 8', attendance: 68, checkin: false, riskScore: 82 },
            ]?.map(({ id, week, attendance, checkin, riskScore }) => (
              <div key={id} className="flex items-center gap-4">
                <span className="text-[11px] text-[#72777D] font-sans w-14 flex-shrink-0">{week}</span>
                <div className="flex-1 bg-[#EAE6DE] rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${attendance}%`,
                      backgroundColor: attendance >= 80 ? '#2E7D5A' : attendance >= 65 ? '#B8965E' : '#C83C3C',
                    }}
                  />
                </div>
                <span className="text-[11px] text-[#101010] font-sans w-8 text-right text-tabular">{attendance}%</span>
                <span className={`text-[10px] font-sans w-16 text-center px-1.5 py-0.5 rounded-full ${checkin ? 'text-[#2E7D5A] bg-[#2E7D5A]/08' : 'text-[#9DA2A8] bg-[#EAE6DE]'}`} style={checkin ? {backgroundColor:'rgba(46,125,90,0.06)'} : {}}>
                  {checkin ? 'Check-in ✓' : 'No check-in'}
                </span>
                <span className={`text-[11px] font-semibold font-sans w-8 text-right text-tabular ${
                  riskScore >= 70 ? 'text-[#C83C3C]' : riskScore >= 40 ? 'text-[#B8965E]' : 'text-[#2E7D5A]'
                }`}>{riskScore}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#EAE6DE]">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#2E7D5A]" />
              <span className="text-[10px] text-[#72777D] font-sans">Good (80%+)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#B8965E]" />
              <span className="text-[10px] text-[#72777D] font-sans">Moderate (65–79%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#C83C3C]" />
              <span className="text-[10px] text-[#72777D] font-sans">At Risk (&lt;65%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-5">
        {/* Assigned Coach */}
        <div className="bg-white border border-[#D9D4C9] rounded-xl p-5 shadow-soft">
          <p className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium mb-3">Assigned Coach</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#173D35]/10 border border-[#173D35]/15 flex items-center justify-center text-[#173D35] text-sm font-semibold font-sans">
              SC
            </div>
            <div>
              <p className="text-[#101010] text-sm font-medium font-sans">Sarah Chen</p>
              <p className="text-[#72777D] text-xs font-sans">Case Manager · District 4</p>
            </div>
          </div>
          <button className="w-full py-2.5 text-xs text-[#F5F2EB] font-sans font-medium bg-[#173D35] rounded-xl hover:bg-[#1F4A40] transition-colors">
            Send Message
          </button>
        </div>

        {/* Program Pathway */}
        <div className="bg-white border border-[#D9D4C9] rounded-xl p-5 shadow-soft">
          <p className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium mb-3">Program Pathway</p>
          <div className="space-y-2.5">
            {[
              { id: 'ph-intake', label: 'Intake & Baseline', status: 'complete', date: 'Mar 3' },
              { id: 'ph-engage', label: 'Weekly Engagement', status: 'active', date: 'Ongoing' },
              { id: 'ph-intervention', label: 'Intervention Phase', status: 'active', date: 'Week 6' },
              { id: 'ph-outcome', label: 'Outcome Assessment', status: 'upcoming', date: 'Week 10' },
            ]?.map(({ id, label, status, date }) => (
              <div key={id} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  status === 'complete' ? 'bg-[#2E7D5A]' : status === 'active' ? 'bg-[#B8965E] pulse-gold' : 'bg-[#D9D4C9]'
                }`} />
                <span className={`text-xs font-sans flex-1 ${status === 'upcoming' ? 'text-[#9DA2A8]' : 'text-[#101010]'}`}>{label}</span>
                <span className="text-[10px] text-[#9DA2A8] font-sans">{date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Score History */}
        <div className="bg-white border border-[#D9D4C9] rounded-xl p-5 shadow-soft">
          <p className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium mb-3">Risk Score Trajectory</p>
          <div className="text-center mb-3">
            <span className="font-serif text-[#C83C3C] text-4xl font-semibold text-tabular">82</span>
            <p className="text-[10px] text-[#C83C3C] uppercase tracking-widest-label font-sans mt-1">High Risk — Trending Up</p>
          </div>
          <div className="space-y-1.5">
            {[
              { id: 'rs-w6', week: 'Week 6', score: 65, pct: 65 },
              { id: 'rs-w7', week: 'Week 7', score: 74, pct: 74 },
              { id: 'rs-w8', week: 'Week 8', score: 82, pct: 82 },
            ]?.map(({ id, week, score, pct }) => (
              <div key={id} className="flex items-center gap-2">
                <span className="text-[10px] text-[#72777D] font-sans w-12">{week}</span>
                <div className="flex-1 bg-[#EAE6DE] rounded-full h-1">
                  <div
                    className="bg-[#C83C3C] h-1 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[11px] text-[#C83C3C] font-semibold font-sans w-6 text-right text-tabular">{score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}