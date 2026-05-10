'use client';
import React, { useState } from 'react';
import { Home, Bus, Briefcase, Heart, BookOpen, DollarSign, ShoppingBag, MapPin, Phone, FileText, CheckCircle2, ArrowUpCircle, Search, ExternalLink } from 'lucide-react';

const categories = [
  { id: 'housing', label: 'Housing', icon: Home, color: '#173D35', count: 12 },
  { id: 'transportation', label: 'Transportation', icon: Bus, color: '#B8965E', count: 8 },
  { id: 'employment', label: 'Employment', icon: Briefcase, color: '#2E7D5A', count: 15 },
  { id: 'mental-wellbeing', label: 'Mental Wellbeing', icon: Heart, color: '#72777D', count: 10 },
  { id: 'education', label: 'Education', icon: BookOpen, color: '#173D35', count: 7 },
  { id: 'financial', label: 'Financial Support', icon: DollarSign, color: '#B8965E', count: 9 },
  { id: 'food', label: 'Food Assistance', icon: ShoppingBag, color: '#2E7D5A', count: 6 },
];

const partners = [
  { name: 'City Housing Authority', category: 'housing', availability: 'Open', eligibility: 'Income-based', location: '2.1 mi', status: 'active' },
  { name: 'Metro Transit Assistance', category: 'transportation', availability: 'Open', eligibility: 'Program participants', location: '0.5 mi', status: 'active' },
  { name: 'Workforce Solutions Center', category: 'employment', availability: 'Open', eligibility: 'All participants', location: '1.8 mi', status: 'active' },
  { name: 'Community Mental Health', category: 'mental-wellbeing', availability: 'Waitlist', eligibility: 'Referral required', location: '3.2 mi', status: 'waitlist' },
  { name: 'Adult Education Institute', category: 'education', availability: 'Open', eligibility: 'Age 18+', location: '2.5 mi', status: 'active' },
  { name: 'Emergency Financial Aid', category: 'financial', availability: 'Limited', eligibility: 'Crisis situations', location: 'Remote', status: 'limited' },
];

const referrals = [
  { participant: 'Marcus Thompson', resource: 'City Housing Authority', status: 'active', date: 'May 8, 2026', followUp: 'May 15' },
  { participant: 'Aaliyah Johnson', resource: 'Metro Transit Assistance', status: 'pending', date: 'May 9, 2026', followUp: 'May 12' },
  { participant: 'Devon Williams', resource: 'Community Mental Health', status: 'active', date: 'May 5, 2026', followUp: 'May 19' },
  { participant: 'Carlos Mendez', resource: 'Workforce Solutions Center', status: 'completed', date: 'Apr 28, 2026', followUp: '—' },
  { participant: 'Tanya Brooks', resource: 'Emergency Financial Aid', status: 'unsuccessful', date: 'Apr 20, 2026', followUp: 'Reassign' },
];

const utilization = [
  { resource: 'Workforce Solutions Center', uses: 18, success: 89 },
  { resource: 'City Housing Authority', uses: 14, success: 78 },
  { resource: 'Metro Transit Assistance', uses: 22, success: 95 },
  { resource: 'Community Mental Health', uses: 11, success: 72 },
  { resource: 'Adult Education Institute', uses: 8, success: 85 },
];

export default function ResourcesContent() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredPartners = partners.filter(p =>
    (activeCategory === 'all' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700',
    waitlist: 'bg-amber-100 text-amber-700',
    limited: 'bg-orange-100 text-orange-700',
  };

  const referralStatusColor: Record<string, string> = {
    active: 'bg-blue-100 text-blue-700',
    pending: 'bg-amber-100 text-amber-700',
    completed: 'bg-emerald-100 text-emerald-700',
    unsuccessful: 'bg-red-100 text-red-700',
  };

  return (
    <div className="p-6 xl:p-8 space-y-6 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[#101010] text-3xl font-semibold">Resources</h1>
          <p className="text-[#72777D] text-sm font-sans mt-1">Community resources, referral partners, and support services</p>
        </div>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-4 lg:grid-cols-7 gap-3">
        <button
          onClick={() => setActiveCategory('all')}
          className={`rounded-xl border p-3 text-center transition-colors ${activeCategory === 'all' ? 'bg-[#173D35] border-[#173D35] text-white' : 'bg-white border-[#E8E3DA] text-[#72777D] hover:border-[#D9D4C9]'}`}
        >
          <p className="text-xs font-semibold font-sans">All</p>
          <p className="text-lg font-semibold font-sans">67</p>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-xl border p-3 text-center transition-colors ${activeCategory === cat.id ? 'border-[#173D35] bg-[#F5F2EB]' : 'bg-white border-[#E8E3DA] hover:border-[#D9D4C9]'}`}
          >
            <cat.icon size={16} className="mx-auto mb-1" style={{color: cat.color}} />
            <p className="text-[10px] font-semibold font-sans text-[#72777D] leading-tight">{cat.label}</p>
            <p className="text-sm font-semibold font-sans text-[#101010]">{cat.count}</p>
          </button>
        ))}
      </div>

      {/* Partner Directory */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-[#101010] text-lg font-semibold">Partner Organizations</h2>
          <div className="flex items-center gap-2 bg-[#F5F2EB] border border-[#E8E3DA] rounded-lg px-3 py-1.5">
            <Search size={13} className="text-[#9DA2A8]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search partners..."
              className="text-xs font-sans outline-none bg-transparent text-[#101010] placeholder-[#9DA2A8] w-40"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filteredPartners.map((partner) => (
            <div key={partner.name} className="flex items-start justify-between p-4 rounded-xl bg-[#FAFAF8] border border-[#E8E3DA]">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-[#101010] font-sans">{partner.name}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans capitalize ${statusColor[partner.status]}`}>{partner.availability}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#72777D] font-sans">
                  <span className="flex items-center gap-1"><MapPin size={10} />{partner.location}</span>
                  <span>{partner.eligibility}</span>
                </div>
              </div>
              <button className="ml-3 flex-shrink-0 p-1.5 text-[#173D35] hover:bg-[#F5F2EB] rounded-lg transition-colors">
                <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Tracking + Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Tracking */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
          <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Referral Tracking</h2>
          <div className="space-y-2">
            {referrals.map((ref) => (
              <div key={ref.participant + ref.resource} className="flex items-center justify-between p-3 rounded-xl bg-[#FAFAF8] border border-[#E8E3DA]">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-semibold text-[#101010] font-sans">{ref.participant}</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold font-sans capitalize ${referralStatusColor[ref.status]}`}>{ref.status}</span>
                  </div>
                  <p className="text-[10px] text-[#72777D] font-sans">{ref.resource}</p>
                  <p className="text-[9px] text-[#9DA2A8] font-sans">{ref.date} · Follow-up: {ref.followUp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Utilization */}
        <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
          <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Resource Utilization</h2>
          <div className="space-y-3">
            {utilization.map((item) => (
              <div key={item.resource}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-[#101010] font-sans">{item.resource}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#9DA2A8] font-sans">{item.uses} uses</span>
                    <span className="text-xs font-semibold text-emerald-600 font-sans">{item.success}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-[#E8E3DA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#173D35] rounded-full" style={{width:`${item.success}%`}} />
                </div>
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
            { label: 'Create Referral', icon: FileText, primary: true },
            { label: 'Assign Resource', icon: CheckCircle2, primary: false },
            { label: 'Contact Partner Agency', icon: Phone, primary: false },
            { label: 'Add Resource Note', icon: FileText, primary: false },
            { label: 'Track Support Outcome', icon: ArrowUpCircle, primary: false },
          ].map((action) => (
            <button key={action.label} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium font-sans transition-colors ${
              action.primary ? 'bg-[#173D35] text-white hover:bg-[#1a4a40]' : 'border border-[#D9D4C9] text-[#101010] hover:bg-[#F5F2EB]'
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
