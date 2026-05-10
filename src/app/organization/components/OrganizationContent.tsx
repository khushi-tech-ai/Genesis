'use client';
import React, { useState } from 'react';
import { Users, Building2, Shield, Settings, Link2, UserPlus, Plus, FileText, Lock, Activity } from 'lucide-react';

const staff = [
  { name: 'Sarah Chen', role: 'Case Manager', email: 'sarah.chen@genesis.org', participants: 18, status: 'active' },
  { name: 'Marcus Torres', role: 'Coach', email: 'm.torres@genesis.org', participants: 15, status: 'active' },
  { name: 'Riya Patel', role: 'Case Manager', email: 'r.patel@genesis.org', participants: 14, status: 'active' },
  { name: 'James Wilson', role: 'Supervisor', email: 'j.wilson@genesis.org', participants: 0, status: 'active' },
  { name: 'Admin User', role: 'Administrator', email: 'admin@genesis.org', participants: 0, status: 'active' },
];

const cohorts = [
  { name: 'Spring 2026', participants: 47, startDate: 'Jan 15, 2026', endDate: 'Jun 30, 2026', status: 'active' },
  { name: 'Fall 2025', participants: 52, startDate: 'Aug 1, 2025', endDate: 'Dec 20, 2025', status: 'completed' },
  { name: 'Summer 2025', participants: 38, startDate: 'May 15, 2025', endDate: 'Aug 30, 2025', status: 'completed' },
];

const auditLogs = [
  { action: 'Staff account created', user: 'Admin', target: 'R. Patel', time: 'May 10, 2026 9:00 AM' },
  { action: 'Cohort configuration updated', user: 'J. Wilson', target: 'Spring 2026', time: 'May 9, 2026 3:30 PM' },
  { action: 'Permission role changed', user: 'Admin', target: 'S. Chen → Case Manager', time: 'May 8, 2026 11:15 AM' },
  { action: 'Participant data exported', user: 'J. Wilson', target: 'Spring 2026 Report', time: 'May 7, 2026 2:00 PM' },
  { action: 'Integration connected', user: 'Admin', target: 'HMIS System', time: 'May 5, 2026 10:00 AM' },
];

const integrations = [
  { name: 'HMIS System', type: 'Housing Data', status: 'connected', lastSync: '2h ago' },
  { name: 'Workforce One', type: 'Employment Data', status: 'connected', lastSync: '4h ago' },
  { name: 'EHR Integration', type: 'Health Records', status: 'pending', lastSync: 'Not synced' },
  { name: 'SMS Gateway', type: 'Communications', status: 'connected', lastSync: 'Live' },
];

const roles = ['Participant', 'Coach', 'Case Manager', 'Supervisor', 'Administrator', 'Executive Viewer'];

export default function OrganizationContent() {
  const [activeTab, setActiveTab] = useState<'overview' | 'staff' | 'cohorts' | 'governance' | 'integrations'>('overview');

  const roleColor: Record<string, string> = {
    'Participant': 'bg-[#F0EDE6] text-[#72777D]',
    'Coach': 'bg-blue-100 text-blue-700',
    'Case Manager': 'bg-[#173D35]/10 text-[#173D35]',
    'Supervisor': 'bg-[#B8965E]/20 text-[#B8965E]',
    'Administrator': 'bg-purple-100 text-purple-700',
    'Executive Viewer': 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="p-6 xl:p-8 space-y-6 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[#101010] text-3xl font-semibold">Organization</h1>
          <p className="text-[#72777D] text-sm font-sans mt-1">Programs, staff, permissions, and institutional governance</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-[#E8E3DA] rounded-xl p-1 w-fit">
        {[
          { key: 'overview', label: 'Overview', icon: Building2 },
          { key: 'staff', label: 'Staff', icon: Users },
          { key: 'cohorts', label: 'Cohorts', icon: Activity },
          { key: 'governance', label: 'Governance', icon: Shield },
          { key: 'integrations', label: 'Integrations', icon: Link2 },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium font-sans transition-colors ${
              activeTab === tab.key ? 'bg-[#173D35] text-white' : 'text-[#72777D] hover:text-[#101010]'
            }`}
          >
            <tab.icon size={13} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Active Programs', value: '3', sub: 'Spring, Summer, Reentry' },
              { label: 'Total Participants', value: '47', sub: 'Spring 2026 cohort' },
              { label: 'Staff Count', value: '5', sub: '3 case managers, 1 coach' },
              { label: 'Operational Health', value: '94%', sub: 'System utilization' },
              { label: 'Intervention Load', value: '6', sub: 'Active interventions' },
              { label: 'System Uptime', value: '99.9%', sub: 'Last 30 days' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
                <p className="text-xs text-[#72777D] font-sans mb-1">{kpi.label}</p>
                <p className="text-3xl font-semibold text-[#101010] font-serif">{kpi.value}</p>
                <p className="text-[11px] text-[#9DA2A8] font-sans mt-1">{kpi.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'staff' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif text-[#101010] text-lg font-semibold">Staff Management</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#173D35] text-white rounded-lg text-sm font-medium font-sans hover:bg-[#1a4a40] transition-colors">
              <UserPlus size={14} />Add Staff
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-[#E8E3DA] bg-[#FAFAF8]">
                  {['Staff Member', 'Role', 'Email', 'Participants', 'Status'].map(h => (
                    <th key={h} className="text-left text-[10px] text-[#9DA2A8] uppercase tracking-widest font-semibold p-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.name} className="border-b border-[#F0EDE6] hover:bg-[#FAFAF8] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#173D35] flex items-center justify-center text-white text-[10px] font-semibold">
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-[#101010]">{s.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans ${roleColor[s.role]}`}>{s.role}</span>
                    </td>
                    <td className="p-4 text-[#72777D]">{s.email}</td>
                    <td className="p-4 text-[#72777D]">{s.participants > 0 ? s.participants : '—'}</td>
                    <td className="p-4">
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold font-sans capitalize">{s.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
            <h3 className="font-serif text-[#101010] text-base font-semibold mb-3">Role Definitions</h3>
            <div className="flex flex-wrap gap-2">
              {roles.map(role => (
                <span key={role} className={`text-xs px-3 py-1.5 rounded-full font-semibold font-sans ${roleColor[role]}`}>{role}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cohorts' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif text-[#101010] text-lg font-semibold">Cohort & Program Management</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#173D35] text-white rounded-lg text-sm font-medium font-sans hover:bg-[#1a4a40] transition-colors">
              <Plus size={14} />Create Cohort
            </button>
          </div>
          <div className="space-y-3">
            {cohorts.map((cohort) => (
              <div key={cohort.name} className="bg-white rounded-xl border border-[#E8E3DA] p-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold text-[#101010] font-sans">{cohort.name}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans capitalize ${cohort.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-[#F0EDE6] text-[#72777D]'}`}>{cohort.status}</span>
                  </div>
                  <p className="text-xs text-[#72777D] font-sans">{cohort.startDate} — {cohort.endDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-[#101010] font-serif">{cohort.participants}</p>
                  <p className="text-[10px] text-[#9DA2A8] font-sans">participants</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'governance' && (
        <div className="space-y-4">
          <h2 className="font-serif text-[#101010] text-lg font-semibold">Governance & Security</h2>
          <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={15} className="text-[#173D35]" />
              <h3 className="font-serif text-[#101010] text-base font-semibold">Audit Log</h3>
            </div>
            <div className="space-y-2">
              {auditLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAF8] border border-[#E8E3DA]">
                  <Lock size={13} className="text-[#72777D] mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-[#101010] font-sans">{log.action}</p>
                      <p className="text-[10px] text-[#9DA2A8] font-sans">{log.time}</p>
                    </div>
                    <p className="text-[10px] text-[#72777D] font-sans">By: {log.user} · Target: {log.target}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <h2 className="font-serif text-[#101010] text-lg font-semibold">Integrations Panel</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <div key={integration.name} className="bg-white rounded-xl border border-[#E8E3DA] p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F2EB] flex items-center justify-center">
                    <Link2 size={16} className="text-[#173D35]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#101010] font-sans text-sm">{integration.name}</p>
                    <p className="text-[10px] text-[#72777D] font-sans">{integration.type} · Sync: {integration.lastSync}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-sans capitalize ${integration.status === 'connected' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{integration.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Actions */}
      <div className="bg-white rounded-2xl border border-[#E8E3DA] p-5">
        <h2 className="font-serif text-[#101010] text-lg font-semibold mb-4">Administrative Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Add Staff', icon: UserPlus, primary: true },
            { label: 'Create Cohort', icon: Plus, primary: false },
            { label: 'Configure Program', icon: Settings, primary: false },
            { label: 'Adjust Permissions', icon: Lock, primary: false },
            { label: 'Generate Audit Report', icon: FileText, primary: false },
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
