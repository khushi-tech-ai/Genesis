'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import ProfileHeader from './ProfileHeader';
import ProfileOverviewTab from './ProfileOverviewTab';
import CheckInsTab from './CheckInsTab';
import InterventionsTab from './InterventionsTab';
import BarriersTab from './BarriersTab';

const tabs = [
  { id: 'tab-overview', label: 'Overview' },
  { id: 'tab-checkins', label: 'Check-Ins' },
  { id: 'tab-interventions', label: 'Interventions' },
  { id: 'tab-barriers', label: 'Barriers' },
];

export default function ParticipantProfileContent() {
  const [activeTab, setActiveTab] = useState('tab-overview');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    toast('Note saved', { description: 'Staff observation added to participant record.' });
    setShowNoteModal(false);
    setNoteText('');
  };

  const handleTriggerIntervention = () => {
    toast('Intervention triggered', { description: 'Task added to intervention queue.' });
  };

  return (
    <div className="p-6 xl:p-8 2xl:p-10 max-w-screen-2xl space-y-6">
      <ProfileHeader
        onAddNote={() => setShowNoteModal(true)}
        onTriggerIntervention={handleTriggerIntervention}
      />
      {/* Tabs */}
      <div className="border-b border-[#D9D4C9]">
        <div className="flex gap-0">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`px-5 py-3 text-sm font-medium font-sans transition-all border-b-2 -mb-px ${
                activeTab === tab?.id
                  ? 'text-[#101010] border-[#B8965E]'
                  : 'text-[#72777D] border-transparent hover:text-[#101010] hover:border-[#D9D4C9]'
              }`}
            >
              {tab?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Tab content */}
      <div className="fade-in">
        {activeTab === 'tab-overview' && <ProfileOverviewTab />}
        {activeTab === 'tab-checkins' && <CheckInsTab />}
        {activeTab === 'tab-interventions' && <InterventionsTab />}
        {activeTab === 'tab-barriers' && <BarriersTab />}
      </div>
      {/* Note modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-[#101010]/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-[#D9D4C9] rounded-2xl p-6 w-full max-w-md shadow-elevated fade-in">
            <h3 className="font-serif text-[#101010] text-xl font-semibold mb-1">Add Staff Note</h3>
            <p className="text-[#72777D] text-xs font-sans mb-4">This note will be added to the participant&apos;s confidential record.</p>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e?.target?.value)}
              placeholder="Describe your observation, concern, or update..."
              className="w-full bg-[#F5F2EB] border border-[#D9D4C9] rounded-xl px-4 py-3 text-sm text-[#101010] font-sans placeholder-[#9DA2A8] outline-none focus:border-[#173D35] resize-none h-28"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowNoteModal(false)}
                className="flex-1 py-2.5 text-sm text-[#72777D] font-sans font-medium border border-[#D9D4C9] rounded-xl hover:bg-[#F5F2EB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="flex-1 py-2.5 text-sm text-[#F5F2EB] font-sans font-medium bg-[#173D35] rounded-xl hover:bg-[#1F4A40] transition-colors"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}