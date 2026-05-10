'use client';
import React, { useState } from 'react';
import { MessageSquare, CheckCircle, AlertCircle, FileText, Plus } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface Note {
  id: string;
  author: string;
  authorInitials: string;
  participant: string;
  content: string;
  type: 'note' | 'action' | 'alert' | 'update';
  time: string;
}

const notes: Note[] = [
  {
    id: 'note-001',
    author: 'Sarah Chen',
    authorInitials: 'SC',
    participant: 'Alex Rivera',
    content: 'Completed housing referral intake with Shelter Connect. Follow-up scheduled for Thursday. Alex expressed concern about timeline — reassured with process overview.',
    type: 'action',
    time: '2h ago',
  },
  {
    id: 'note-002',
    author: 'Marcus Williams',
    authorInitials: 'MW',
    participant: 'James Torres',
    content: 'Missed second consecutive weekly check-in. Attempted phone contact — no answer. Flagged for same-day outreach. Emergency contact notified per protocol.',
    type: 'alert',
    time: '4h ago',
  },
  {
    id: 'note-003',
    author: 'Priya Nair',
    authorInitials: 'PN',
    participant: 'Jordan Smith',
    content: 'Strong session today. Jordan secured part-time position at Metro Transit. Readiness score updated to 72. Recommended for employment track advancement.',
    type: 'update',
    time: 'Yesterday',
  },
  {
    id: 'note-004',
    author: 'Sarah Chen',
    authorInitials: 'SC',
    participant: 'Devon Kim',
    content: 'Behavioral health check-in completed. Devon reported elevated stress related to housing uncertainty. Referred to counseling services. Transportation support arranged for next session.',
    type: 'note',
    time: 'Yesterday',
  },
  {
    id: 'note-005',
    author: 'Marcus Williams',
    authorInitials: 'MW',
    participant: 'Taylor Chen',
    content: 'Program milestone reached — 90-day continuous attendance. Recognized in group session. Taylor expressed interest in peer mentor role. Escalated to program director.',
    type: 'update',
    time: '2 days ago',
  },
];

const typeConfig = {
  note: { icon: MessageSquare, color: 'text-[#72777D]', bg: 'bg-[#72777D]/08 border-[#72777D]/15', label: 'Note' },
  action: { icon: CheckCircle, color: 'text-[#173D35]', bg: 'bg-[#173D35]/08 border-[#173D35]/15', label: 'Action' },
  alert: { icon: AlertCircle, color: 'text-[#C83C3C]', bg: 'bg-[#C83C3C]/08 border-[#C83C3C]/15', label: 'Alert' },
  update: { icon: FileText, color: 'text-[#B8965E]', bg: 'bg-[#B8965E]/08 border-[#B8965E]/15', label: 'Update' },
};

export default function StaffNotesPanel() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-white border border-[#D9D4C9] rounded-xl shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAE6DE]">
        <div>
          <h3 className="font-serif text-[#101010] text-lg font-semibold">Staff Notes</h3>
          <p className="text-[#72777D] text-xs font-sans mt-0.5">Recent case notes and staff actions</p>
        </div>
        <button className="flex items-center gap-1.5 text-[11px] font-medium font-sans text-white bg-[#173D35] px-3 py-1.5 rounded-lg hover:bg-[#1E5247] transition-colors">
          <Plus size={12} />
          Add Note
        </button>
      </div>

      {/* Notes list */}
      <div className="divide-y divide-[#EAE6DE]">
        {notes.map((note) => {
          const config = typeConfig[note.type];
          const Icon = config.icon;
          const isExpanded = expanded === note.id;

          return (
            <div
              key={note.id}
              className="px-5 py-4 hover:bg-[#F5F2EB]/40 transition-colors duration-100 cursor-pointer"
              onClick={() => setExpanded(isExpanded ? null : note.id)}
            >
              <div className="flex items-start gap-3">
                {/* Author avatar */}
                <div className="w-8 h-8 rounded-full bg-[#173D35]/10 border border-[#173D35]/15 flex items-center justify-center text-[#173D35] text-xs font-semibold font-sans flex-shrink-0 mt-0.5">
                  {note.authorInitials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#101010] text-sm font-medium font-sans">{note.author}</span>
                      <span className="text-[#9DA2A8] text-xs font-sans">→</span>
                      <span className="text-[#173D35] text-xs font-medium font-sans">{note.participant}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest-label px-2 py-0.5 rounded-full border font-sans ${config.bg} ${config.color}`}>
                        <Icon size={9} />
                        {config.label}
                      </span>
                      <span className="text-[10px] text-[#9DA2A8] font-sans">{note.time}</span>
                    </div>
                  </div>
                  <p className={`text-[#72777D] text-sm font-sans leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                    {note.content}
                  </p>
                  {note.content.length > 100 && (
                    <button className="text-[11px] text-[#B8965E] font-sans font-medium mt-1 hover:text-[#C9A97A] transition-colors">
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
