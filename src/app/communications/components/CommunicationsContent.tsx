'use client';
import React, { useState } from 'react';
import { MessageSquare, Send, Phone, FileText, ArrowUpCircle, Clock, Bell, CheckCircle2 } from 'lucide-react';

const messages = [
  { id: 1, participant: 'Marcus Thompson', preview: 'I missed the session today because...', time: '10:32 AM', unread: true, type: 'incoming' },
  { id: 2, participant: 'Jasmine Rivera', preview: 'Thank you for the housing referral!', time: '9:15 AM', unread: false, type: 'incoming' },
  { id: 3, participant: 'Devon Williams', preview: 'Can we reschedule our check-in?', time: 'Yesterday', unread: true, type: 'incoming' },
  { id: 4, participant: 'Carlos Mendez', preview: 'Resume is ready for review.', time: 'Yesterday', unread: false, type: 'incoming' },
  { id: 5, participant: 'Tanya Brooks', preview: 'Outreach sent — awaiting response', time: '2 days ago', unread: false, type: 'outgoing' },
];

const outreachQueue = [
  { participant: 'Marcus Thompson', reason: 'Missed check-in — 2nd time this week', urgency: 'high', due: 'Today 2:00 PM' },
  { participant: 'Devon Williams', reason: 'No-show — 3 consecutive sessions', urgency: 'critical', due: 'Today 12:00 PM' },
  { participant: 'Tanya Brooks', reason: 'Engagement recovery follow-up', urgency: 'moderate', due: 'Tomorrow' },
  { participant: 'Aaliyah Johnson', reason: 'Transportation barrier check-in', urgency: 'moderate', due: 'Tomorrow' },
];

const notifications = [
  { id: 1, type: 'escalation', message: 'Tanya Brooks escalated to supervisor', time: '5m ago', urgent: true },
  { id: 2, type: 'intervention', message: 'New intervention assigned — Devon Williams', time: '22m ago', urgent: true },
  { id: 3, type: 'note', message: 'Staff note added by R. Patel — Marcus T.', time: '1h ago', urgent: false },
  { id: 4, type: 'reminder', message: 'Outreach reminder: Carlos Mendez — 3:00 PM', time: '2h ago', urgent: false },
];

const responseTracking = [
  { participant: 'Carlos Mendez', rate: 95, consistency: 'excellent', lastResponse: '2h ago' },
  { participant: 'Jasmine Rivera', rate: 88, consistency: 'good', lastResponse: '4h ago' },
  { participant: 'Aaliyah Johnson', rate: 72, consistency: 'moderate', lastResponse: '1d ago' },
  { participant: 'Marcus Thompson', rate: 55, consistency: 'low', lastResponse: '2d ago' },
  { participant: 'Devon Williams', rate: 38, consistency: 'poor', lastResponse: '4d ago' },
];

export default function CommunicationsContent() {
  const [activeMessage, setActiveMessage] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');

  const urgencyColor: Record<string, string> = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    moderate: 'bg-amber-100 text-amber-700',
  };

  const consistencyColor: Record<string, string> = {
    excellent: 'text-emerald-600',
    good: 'text-blue-600',
    moderate: 'text-amber-600',
    low: 'text-orange-600',
    poor: 'text-red-600',
  };

  return (
    <div className="p-6 xl:p-8 space-y-6 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[#101010] text-3xl font-semibold">Communications</h1>
          <p className="text-[#72777D] text-sm font-sans mt-1">Outreach coordination, messaging, and engagement tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-sans">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="text-[#72777D]">3 unread</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-sans">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-[#72777D]">4 pending outreach</span>
          </div>
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Unread Messages', value: '3', color: 'text-red-600' },
          { label: 'Pending Outreach', value: '4', color: 'text-amber-600' },
          { label: 'Escalation Alerts', value: '2', color: 'text-orange-600' },
          { label: 'Avg Response Rate', value: '70%', color: 'text-[#101010]' },
          { label: 'Follow-ups Complete', value: '12', color: 'text-emerald-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-[#E8E3DA] p-4">
            <p className="text-xs text-[#72777D] font-sans mb-1">{stat.label}</p>
            <p className={`text-2xl font-semibold font-sans ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messaging Center */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden">
          <div className="flex h-96">
            {/* Message list */}
            <div className="w-56 border-r border-[#E8E3DA] flex flex-col">
              <div className="p-3 border-b border-[#E8E3DA]">
                <p className="text-xs font-semibold text-[#101010] font-sans">Messages</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setActiveMessage(msg.id)}
                    className={`p-3 cursor-pointer border-b border-[#F0EDE6] transition-colors ${activeMessage === msg.id ? 'bg-[#F5F2EB]' : 'hover:bg-[#FAFAF8]'}`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <p className={`text-xs font-sans ${msg.unread ? 'font-semibold text-[#101010]' : 'font-medium text-[#72777D]'}`}>{msg.participant}</p>
                      {msg.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#173D35]"></span>}
                    </div>
                    <p className="text-[10px] text-[#9DA2A8] font-sans line-clamp-1">{msg.preview}</p>
                    <p className="text-[9px] text-[#9DA2A8] font-sans mt-0.5">{msg.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Message thread */}
            <div className="flex-1 flex flex-col">
              <div className="p-3 border-b border-[#E8E3DA] flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#173D35] flex items-center justify-center text-white text-xs font-semibold">MT</div>
                <div>
                  <p className="text-sm font-semibold text-[#101010] font-sans">Marcus Thompson</p>
                  <p className="text-[10px] text-[#9DA2A8] font-sans">Last seen 2h ago</p>
                </div>
              </div>
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                <div className="flex justify-start">
                  <div className="bg-[#F5F2EB] rounded-xl rounded-tl-sm px-3 py-2 max-w-xs">
                    <p className="text-xs font-sans text-[#101010]">I missed the session today because my transportation fell through again.</p>
                    <p className="text-[9px] text-[#9DA2A8] font-sans mt-1">10:32 AM</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#173D35] rounded-xl rounded-tr-sm px-3 py-2 max-w-xs">
                    <p className="text-xs font-sans text-white">Thank you for letting us know. We're working on a transportation referral for you. Can we connect at 2pm today?</p>
                    <p className="text-[9px] text-white/60 font-sans mt-1">10:45 AM · S. Chen</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-[#E8E3DA] flex items-center gap-2">
                <input
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 text-sm font-sans bg-[#F5F2EB] rounded-lg px-3 py-2 outline-none text-[#101010] placeholder-[#9DA2A8]"
                />
                <button className="w-8 h-8 bg-[#173D35] rounded-lg flex items-center justify-center text-white hover:bg-[#1a4a40] transition-colors">
                  <Send size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={15} className="text-[#173D35]" />
            <h2 className="font-serif text-[#101010] text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-2">
            {notifications.map((n) => (
              <div key={n.id} className={`p-3 rounded-xl border ${n.urgent ? 'bg-red-50 border-red-200' : 'bg-[#FAFAF8] border-[#E8E3DA]'}`}>
                <p className={`text-xs font-medium font-sans ${n.urgent ? 'text-red-700' : 'text-[#101010]'}`}>{n.message}</p>
                <p className="text-[10px] text-[#9DA2A8] font-sans mt-0.5">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outreach Queue + Response Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outreach Queue */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
          <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Outreach Queue</h2>
          <div className="space-y-3">
            {outreachQueue.map((item) => (
              <div key={item.participant} className="flex items-start justify-between p-3 rounded-xl bg-[#FAFAF8] border border-[#E8E3DA]">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-[#101010] font-sans">{item.participant}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans capitalize ${urgencyColor[item.urgency]}`}>{item.urgency}</span>
                  </div>
                  <p className="text-xs text-[#72777D] font-sans">{item.reason}</p>
                  <p className="text-[10px] text-[#9DA2A8] font-sans mt-0.5 flex items-center gap-1"><Clock size={9} />Due: {item.due}</p>
                </div>
                <button className="ml-3 flex-shrink-0 px-3 py-1.5 bg-[#173D35] text-white rounded-lg text-xs font-medium font-sans hover:bg-[#1a4a40] transition-colors">
                  Contact
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Response Tracking */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
          <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Participant Response Tracking</h2>
          <div className="space-y-3">
            {responseTracking.map((p) => (
              <div key={p.participant} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#173D35] flex items-center justify-center text-white text-[10px] font-semibold flex-shrink-0">
                  {p.participant.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-[#101010] font-sans">{p.participant}</span>
                    <span className={`text-xs font-semibold font-sans capitalize ${consistencyColor[p.consistency]}`}>{p.consistency}</span>
                  </div>
                  <div className="h-1.5 bg-[#E8E3DA] rounded-full overflow-hidden">
                    <div className="h-full bg-[#173D35] rounded-full" style={{width:`${p.rate}%`}} />
                  </div>
                </div>
                <span className="text-[10px] text-[#9DA2A8] font-sans flex-shrink-0">{p.rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Staff Actions */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
        <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Staff Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Send Message', icon: MessageSquare, primary: true },
            { label: 'Schedule Outreach', icon: Phone, primary: false },
            { label: 'Assign Follow-Up', icon: CheckCircle2, primary: false },
            { label: 'Add Communication Note', icon: FileText, primary: false },
            { label: 'Escalate Concern', icon: ArrowUpCircle, primary: false, danger: true },
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
