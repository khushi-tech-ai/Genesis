'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import { LayoutDashboard, Users, AlertTriangle, ClipboardList, BarChart3, Brain, MessageSquare, BookOpen, Building2, Settings, LogOut, ChevronLeft, ChevronRight, Bell, Search, X, Shield, Smartphone, MapPin } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const navSections = [
  {
    label: 'OVERVIEW',
    items: [
      { key: 'nav-overview', href: '/staff-intelligence-dashboard', icon: LayoutDashboard, label: 'Overview' },
      { key: 'nav-participants', href: '/participant-profile-detail', icon: Users, label: 'Participants' },
      { key: 'nav-interventions', href: '/intervention-management', icon: AlertTriangle, label: 'Interventions' },
      { key: 'nav-attendance', href: '/attendance', icon: ClipboardList, label: 'Attendance' },
      { key: 'nav-readiness', href: '/readiness', icon: Shield, label: 'Readiness' },
      { key: 'nav-intelligence', href: '/intelligence', icon: Brain, label: 'Intelligence' },
      { key: 'nav-reports', href: '/reports', icon: BarChart3, label: 'Reports' },
    ],
  },
  {
    label: null,
    items: [
      { key: 'nav-communications', href: '/communications', icon: MessageSquare, label: 'Communications' },
      { key: 'nav-resources', href: '/resources', icon: BookOpen, label: 'Resources' },
    ],
  },
  {
    label: null,
    items: [
      { key: 'nav-organization', href: '/organization', icon: Building2, label: 'Organization' },
      { key: 'nav-settings', href: '/settings', icon: Settings, label: 'Settings' },
      { key: 'nav-user-mobile-view', href: '/user-mobile-view', icon: Smartphone, label: 'User Mobile View' },
      { key: 'nav-journey', href: '/journey', icon: MapPin, label: 'Journey' },
    ],
  },
];

interface StaffLayoutProps {
  children: React.ReactNode;
}

export default function StaffLayout({ children }: StaffLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F5F2EB]">
      {/* Sidebar */}
      <aside
        className={`sidebar-transition flex flex-col bg-[#173D35] relative z-20 flex-shrink-0 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center border-b border-white/10 ${collapsed ? 'justify-center px-3 py-4' : 'px-4 py-4'}`}>
          {collapsed ? (
            <AppImage
              src="/assets/images/genesis_platform_logo-1778430199358.png"
              alt="Genesis"
              width={32}
              height={32}
              className="flex-shrink-0 object-contain"
              priority={true}
            />
          ) : (
            <AppImage
              src="/assets/images/genesis_platform_logo-1778430199358.png"
              alt="Genesis"
              width={140}
              height={40}
              className="flex-shrink-0 object-contain"
              priority={true}
            />
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          {navSections.map((section, sIdx) => (
            <div key={sIdx}>
              {sIdx > 0 && (
                <div className="my-2 border-t border-white/10" />
              )}
              {section.label && !collapsed && (
                <p className="text-[9px] font-semibold tracking-widest text-white/30 uppercase px-3 mb-1.5 font-sans">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/') ||
                    (item.href === '/journey' && pathname === '/participant-lifecycle') ||
                    (item.href === '/user-mobile-view' && (pathname === '/weekly-check-in'));
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150 group relative ${
                        isActive
                          ? 'bg-white/15 text-[#F5F2EB]'
                          : 'text-white/55 hover:bg-white/10 hover:text-[#F5F2EB]'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={16} className="flex-shrink-0" />
                      {!collapsed && (
                        <span className="text-sm font-medium flex-1 font-sans">{item.label}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="border-t border-white/10 p-2">
          <button
            onClick={() => setShowSignOut(true)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 w-full text-white/50 hover:bg-white/10 hover:text-[#F5F2EB] transition-all duration-150 ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={16} />
            {!collapsed && <span className="text-sm font-sans">Sign Out</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[#173D35] border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors z-30"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-[#D9D4C9] flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Search size={15} className="text-[#72777D] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search participants, interventions..."
              className="bg-transparent text-[#101010] text-sm placeholder-[#9DA2A8] outline-none flex-1 font-sans"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-[#72777D] hover:text-[#101010] transition-colors">
              <Bell size={17} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C83C3C] text-white text-[9px] font-bold rounded-full flex items-center justify-center">14</span>
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#173D35] flex items-center justify-center text-[#F5F2EB] text-xs font-semibold font-sans">SC</div>
              <span className="text-sm text-[#101010] hidden md:block font-sans font-medium">Sarah Chen</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-[#F5F2EB]">
          {children}
        </main>
      </div>

      {/* Sign Out Modal */}
      {showSignOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-serif text-[#101010] text-2xl font-semibold">Sign Out</h2>
                <p className="text-[#72777D] text-sm font-sans mt-1">Your session will be securely closed.</p>
              </div>
              <button onClick={() => setShowSignOut(false)} className="text-[#72777D] hover:text-[#101010] transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="bg-[#F5F2EB] rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#173D35] flex items-center justify-center text-[#F5F2EB] text-xs font-semibold">SC</div>
                <div>
                  <p className="text-sm font-semibold text-[#101010] font-sans">Sarah Chen</p>
                  <p className="text-xs text-[#72777D] font-sans">Case Manager · Spring 2026 Cohort</p>
                </div>
              </div>
              <div className="border-t border-[#D9D4C9] pt-3 space-y-1">
                <p className="text-xs text-[#72777D] font-sans">Recent activity: Reviewed 3 participant profiles</p>
                <p className="text-xs text-[#72777D] font-sans">Last action: Added coaching note — Marcus T.</p>
              </div>
            </div>

            <p className="text-xs text-[#9DA2A8] font-sans mb-6 leading-relaxed">
              Signing out will end your current session. Any unsaved changes will be preserved automatically. You can return at any time.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSignOut(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-[#D9D4C9] text-[#101010] text-sm font-medium font-sans hover:bg-[#F5F2EB] transition-colors"
              >
                Return to Dashboard
              </button>
              <Link
                href="/sign-up-login-screen"
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#173D35] text-[#F5F2EB] text-sm font-medium font-sans hover:bg-[#1a4a40] transition-colors text-center"
              >
                Sign Out Securely
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}