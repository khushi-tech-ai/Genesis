'use client';
import React, { useState } from 'react';
import { User, Bell, Eye, Palette, Lock, Settings, Camera, Moon, Sun, Monitor, Check } from 'lucide-react';

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'accessibility' | 'appearance' | 'security' | 'workflow'>('profile');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [interventionAlerts, setInterventionAlerts] = useState(true);
  const [escalationReminders, setEscalationReminders] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [twoFactor, setTwoFactor] = useState(false);

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'accessibility', label: 'Accessibility', icon: Eye },
    { key: 'appearance', label: 'Appearance', icon: Palette },
    { key: 'security', label: 'Security', icon: Lock },
    { key: 'workflow', label: 'Workflow', icon: Settings },
  ];

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${value ? 'bg-[#173D35]' : 'bg-[#D9D4C9]'}`}
    >
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );

  return (
    <div className="p-6 xl:p-8 max-w-screen-xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif text-[#101010] text-3xl font-semibold">Settings</h1>
        <p className="text-[#72777D] text-sm font-sans mt-1">Manage your preferences, security, and workflow</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-[#E8E3DA] p-2 space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium font-sans transition-colors ${
                  activeTab === tab.key ? 'bg-[#173D35] text-white' : 'text-[#72777D] hover:bg-[#F5F2EB] hover:text-[#101010]'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-[#E8E3DA] p-6 space-y-5">
              <h2 className="font-serif text-[#101010] text-xl font-semibold">Profile Settings</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#173D35] flex items-center justify-center text-white text-xl font-semibold">SC</div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border border-[#D9D4C9] rounded-full flex items-center justify-center hover:bg-[#F5F2EB] transition-colors">
                    <Camera size={11} className="text-[#72777D]" />
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-[#101010] font-sans">Sarah Chen</p>
                  <p className="text-xs text-[#72777D] font-sans">Case Manager · Spring 2026</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[
                  { label: 'First Name', value: 'Sarah' },
                  { label: 'Last Name', value: 'Chen' },
                  { label: 'Email', value: 'sarah.chen@genesis.org' },
                  { label: 'Phone', value: '+1 (555) 234-5678' },
                  { label: 'Role', value: 'Case Manager' },
                  { label: 'Organization', value: 'Genesis Program' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs text-[#72777D] font-sans font-medium block mb-1">{field.label}</label>
                    <input
                      defaultValue={field.value}
                      className="w-full px-3 py-2 rounded-lg border border-[#D9D4C9] text-sm font-sans text-[#101010] bg-[#FAFAF8] outline-none focus:border-[#173D35] transition-colors"
                    />
                  </div>
                ))}
              </div>
              <button className="px-5 py-2.5 bg-[#173D35] text-white rounded-xl text-sm font-medium font-sans hover:bg-[#1a4a40] transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-[#E8E3DA] p-6 space-y-5">
              <h2 className="font-serif text-[#101010] text-xl font-semibold">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: 'Email Alerts', sub: 'Receive daily digest and urgent notifications', value: emailAlerts, onChange: setEmailAlerts },
                  { label: 'SMS Notifications', sub: 'Text alerts for critical escalations', value: smsNotifications, onChange: setSmsNotifications },
                  { label: 'Intervention Alerts', sub: 'Notify when new interventions are assigned', value: interventionAlerts, onChange: setInterventionAlerts },
                  { label: 'Escalation Reminders', sub: 'Reminders for unresolved escalations', value: escalationReminders, onChange: setEscalationReminders },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#F0EDE6]">
                    <div>
                      <p className="text-sm font-medium text-[#101010] font-sans">{item.label}</p>
                      <p className="text-xs text-[#9DA2A8] font-sans">{item.sub}</p>
                    </div>
                    <Toggle value={item.value} onChange={item.onChange} />
                  </div>
                ))}
                <div className="pt-2">
                  <label className="text-xs text-[#72777D] font-sans font-medium block mb-2">Digest Frequency</label>
                  <div className="flex gap-2">
                    {['Daily', 'Weekly', 'Real-time'].map(freq => (
                      <button key={freq} className="px-3 py-1.5 rounded-lg border border-[#D9D4C9] text-xs font-medium font-sans text-[#72777D] hover:bg-[#F5F2EB] transition-colors first:bg-[#173D35] first:text-white first:border-[#173D35]">{freq}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div className="bg-white rounded-2xl border border-[#E8E3DA] p-6 space-y-5">
              <h2 className="font-serif text-[#101010] text-xl font-semibold">Accessibility Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Reduced Motion', sub: 'Minimize animations and transitions', value: reducedMotion, onChange: setReducedMotion },
                  { label: 'High Contrast', sub: 'Increase contrast for better visibility', value: highContrast, onChange: setHighContrast },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#F0EDE6]">
                    <div>
                      <p className="text-sm font-medium text-[#101010] font-sans">{item.label}</p>
                      <p className="text-xs text-[#9DA2A8] font-sans">{item.sub}</p>
                    </div>
                    <Toggle value={item.value} onChange={item.onChange} />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-[#72777D] font-sans font-medium block mb-2">Font Scale</label>
                  <input type="range" min="80" max="130" defaultValue="100" className="w-full accent-[#173D35]" />
                  <div className="flex justify-between text-[10px] text-[#9DA2A8] font-sans mt-1">
                    <span>Small</span><span>Default</span><span>Large</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-white rounded-2xl border border-[#E8E3DA] p-6 space-y-5">
              <h2 className="font-serif text-[#101010] text-xl font-semibold">Appearance Settings</h2>
              <div>
                <label className="text-xs text-[#72777D] font-sans font-medium block mb-3">Theme</label>
                <div className="flex gap-3">
                  {[
                    { key: 'light', label: 'Light', icon: Sun },
                    { key: 'dark', label: 'Institutional Dark', icon: Moon },
                    { key: 'system', label: 'System', icon: Monitor },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTheme(t.key as typeof theme)}
                      className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${theme === t.key ? 'border-[#173D35] bg-[#F5F2EB]' : 'border-[#E8E3DA] hover:border-[#D9D4C9]'}`}
                    >
                      <t.icon size={18} className={theme === t.key ? 'text-[#173D35]' : 'text-[#72777D]'} />
                      <span className="text-xs font-medium font-sans text-[#101010]">{t.label}</span>
                      {theme === t.key && <Check size={12} className="text-[#173D35]" />}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-[#72777D] font-sans font-medium block mb-3">Density</label>
                <div className="flex gap-3">
                  {['comfortable', 'compact'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDensity(d as typeof density)}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-medium font-sans capitalize transition-colors ${density === d ? 'border-[#173D35] bg-[#F5F2EB] text-[#173D35]' : 'border-[#E8E3DA] text-[#72777D] hover:border-[#D9D4C9]'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl border border-[#E8E3DA] p-6 space-y-5">
              <h2 className="font-serif text-[#101010] text-xl font-semibold">Security Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-[#FAFAF8] rounded-xl border border-[#E8E3DA]">
                  <p className="text-sm font-semibold text-[#101010] font-sans mb-1">Change Password</p>
                  <div className="space-y-2 mt-3">
                    {['Current Password', 'New Password', 'Confirm New Password'].map(field => (
                      <input key={field} type="password" placeholder={field} className="w-full px-3 py-2 rounded-lg border border-[#D9D4C9] text-sm font-sans text-[#101010] bg-white outline-none focus:border-[#173D35] transition-colors" />
                    ))}
                  </div>
                  <button className="mt-3 px-4 py-2 bg-[#173D35] text-white rounded-lg text-sm font-medium font-sans hover:bg-[#1a4a40] transition-colors">Update Password</button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[#F0EDE6]">
                  <div>
                    <p className="text-sm font-medium text-[#101010] font-sans">Two-Factor Authentication</p>
                    <p className="text-xs text-[#9DA2A8] font-sans">Add an extra layer of security to your account</p>
                  </div>
                  <Toggle value={twoFactor} onChange={setTwoFactor} />
                </div>
                <div className="p-4 bg-[#FAFAF8] rounded-xl border border-[#E8E3DA]">
                  <p className="text-sm font-semibold text-[#101010] font-sans mb-2">Recent Login Activity</p>
                  {[
                    { device: 'MacBook Pro · Chrome', location: 'San Francisco, CA', time: 'Today 9:00 AM', current: true },
                    { device: 'iPhone 15 · Safari', location: 'San Francisco, CA', time: 'Yesterday 6:30 PM', current: false },
                  ].map((session) => (
                    <div key={session.device} className="flex items-center justify-between py-2 border-b border-[#F0EDE6] last:border-0">
                      <div>
                        <p className="text-xs font-medium text-[#101010] font-sans">{session.device}</p>
                        <p className="text-[10px] text-[#9DA2A8] font-sans">{session.location} · {session.time}</p>
                      </div>
                      {session.current ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold font-sans">Current</span>
                      ) : (
                        <button className="text-[10px] text-red-600 font-semibold font-sans hover:underline">Revoke</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="bg-white rounded-2xl border border-[#E8E3DA] p-6 space-y-5">
              <h2 className="font-serif text-[#101010] text-xl font-semibold">Workflow Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#72777D] font-sans font-medium block mb-2">Default Dashboard View</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-[#D9D4C9] text-sm font-sans text-[#101010] bg-[#FAFAF8] outline-none focus:border-[#173D35] transition-colors">
                    <option>Staff Intelligence Dashboard</option>
                    <option>Participant Lifecycle</option>
                    <option>Intervention Management</option>
                    <option>Reports</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#72777D] font-sans font-medium block mb-2">Default Risk Filter</label>
                  <div className="flex gap-2">
                    {['All', 'High Only', 'Active Interventions'].map(f => (
                      <button key={f} className="px-3 py-1.5 rounded-lg border border-[#D9D4C9] text-xs font-medium font-sans text-[#72777D] hover:bg-[#F5F2EB] transition-colors first:bg-[#173D35] first:text-white first:border-[#173D35]">{f}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#72777D] font-sans font-medium block mb-2">Reporting Defaults</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-[#D9D4C9] text-sm font-sans text-[#101010] bg-[#FAFAF8] outline-none focus:border-[#173D35] transition-colors">
                    <option>Monthly Summary</option>
                    <option>Weekly Operational</option>
                    <option>Executive KPI</option>
                    <option>Grant Report</option>
                  </select>
                </div>
                <button className="px-5 py-2.5 bg-[#173D35] text-white rounded-xl text-sm font-medium font-sans hover:bg-[#1a4a40] transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
