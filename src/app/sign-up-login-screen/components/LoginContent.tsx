'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AppLogo from '@/components/ui/AppLogo';
import { Eye, EyeOff, Copy, ChevronRight } from 'lucide-react';

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

const roles = [
  { id: 'role-participant', value: 'participant', label: 'Participant', description: 'Access your program, tasks, and check-ins' },
  { id: 'role-staff', value: 'staff', label: 'Staff / Coach', description: 'Manage participants, interventions, and reports' },
  { id: 'role-admin', value: 'admin', label: 'Administrator', description: 'Full program oversight and configuration' },
];

const demoCredentials = [
  { id: 'cred-participant', role: 'Participant', email: 'alex.rivera@genesis-program.org', password: 'Genesis2026!' },
  { id: 'cred-staff', role: 'Staff / Coach', email: 'sarah.chen@genesis-program.org', password: 'Genesis2026!' },
  { id: 'cred-admin', role: 'Administrator', email: 'admin@genesis-program.org', password: 'Genesis2026!' },
];

export default function LoginContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('staff');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsLoading(false);

    const valid = demoCredentials.some(c => c.email === data.email && c.password === data.password);
    if (!valid) {
      toast.error('Invalid credentials — use the demo accounts below to sign in');
      return;
    }

    toast('Welcome to Genesis', { description: 'Redirecting to your dashboard.' });
    if (selectedRole === 'participant') {
      router.push('/');
    } else {
      router.push('/staff-intelligence-dashboard');
    }
  };

  const fillCredentials = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard');
  };

  return (
    <div className="min-h-screen flex bg-[#F5F2EB]">
      {/* Left brand panel — Forest Green */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[48%] bg-[#173D35] flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <AppLogo size={420} src="/assets/images/genesis_platform_logo-1778430199358.png" />
        </div>

        {/* Top */}
        <div className="flex items-center gap-3 relative z-10">
          <AppLogo size={34} src="/assets/images/genesis_platform_logo-1778430199358.png" />
          <span className="font-serif text-[#F5F2EB] text-xl font-semibold tracking-wide">GENESIS</span>
        </div>

        {/* Center */}
        <div className="relative z-10 space-y-10">
          <div>
            <h1 className="font-serif text-[#F5F2EB] text-5xl xl:text-6xl font-light leading-tight mb-5">
              The Operating System<br />
              <span className="italic">for Human Progress.</span>
            </h1>
            <p className="text-white/55 text-base font-sans leading-relaxed max-w-sm">
              Transforming fragmented systems into coordinated human outcomes infrastructure.
            </p>
          </div>

          {/* Operational loop */}
          <div className="flex items-center gap-3">
            {['TRACK', 'PREDICT', 'ADJUST', 'REPEAT'].map((step, i) => (
              <React.Fragment key={`loop-${step}`}>
                <span className="text-[10px] text-[#B8965E] uppercase tracking-widest-label font-sans font-semibold">{step}</span>
                {i < 3 && <span className="text-white/25 text-xs">→</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { id: 'stat-retention', value: '88%', label: 'Retention' },
              { id: 'stat-checkin', value: '82%', label: 'Check-in Rate' },
              { id: 'stat-readiness', value: '+18%', label: 'Readiness Gain' },
            ].map(({ id, value, label }) => (
              <div key={id}>
                <p className="font-serif text-[#F5F2EB] text-3xl font-semibold text-tabular">{value}</p>
                <p className="text-white/40 text-xs font-sans mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="text-white/25 text-xs font-sans relative z-10">
          Genesis · Pilot V1.0 · Confidential
        </p>
      </div>

      {/* Right form panel — Ivory */}
      <div className="flex-1 bg-[#F5F2EB] flex items-center justify-center p-8 xl:p-16">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <AppLogo size={30} src="/assets/images/genesis_platform_logo-1778430199358.png" />
            <span className="font-serif text-[#173D35] text-xl font-semibold">GENESIS</span>
          </div>

          <h2 className="font-serif text-[#101010] text-4xl font-semibold mb-1.5">Welcome back.</h2>
          <p className="text-[#72777D] text-sm font-sans mb-8">Sign in to access your Genesis workspace.</p>

          {/* Role selector */}
          <div className="mb-6">
            <label className="block text-[11px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium mb-2.5">Access Level</label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`p-3 rounded-xl border text-center transition-all duration-150 ${
                    selectedRole === role.value
                      ? 'bg-[#173D35] text-[#F5F2EB] border-[#173D35]'
                      : 'bg-white text-[#72777D] border-[#D9D4C9] hover:border-[#173D35]/40 hover:text-[#101010]'
                  }`}
                >
                  <p className="text-xs font-semibold font-sans">{role.label}</p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs text-[#101010] font-medium font-sans mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-sans text-[#101010] placeholder-[#9DA2A8] outline-none transition-colors focus:border-[#173D35] ${
                  errors.email ? 'border-[#C83C3C]' : 'border-[#D9D4C9]'
                }`}
                placeholder="your@email.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
              />
              {errors.email && <p className="text-[#C83C3C] text-xs font-sans mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-[#101010] font-medium font-sans mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full bg-white border rounded-xl px-4 py-3 pr-11 text-sm font-sans text-[#101010] placeholder-[#9DA2A8] outline-none transition-colors focus:border-[#173D35] ${
                    errors.password ? 'border-[#C83C3C]' : 'border-[#D9D4C9]'
                  }`}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#72777D] hover:text-[#101010] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-[#C83C3C] text-xs font-sans mt-1">{errors.password.message}</p>}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#D9D4C9] accent-[#173D35]"
                  {...register('remember')}
                />
                <span className="text-xs text-[#72777D] font-sans">Remember me</span>
              </label>
              <button type="button" className="text-xs text-[#173D35] font-sans font-medium hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#173D35] text-[#F5F2EB] font-medium text-sm rounded-xl py-3.5 hover:bg-[#1F4A40] transition-colors active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 font-sans"
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 text-[#F5F2EB]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Sign In <ChevronRight size={14} /></>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 bg-white border border-[#D9D4C9] rounded-xl overflow-hidden shadow-soft">
            <div className="px-4 py-3 border-b border-[#D9D4C9] bg-[#F5F2EB]">
              <p className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans font-medium">Demo Access Credentials</p>
            </div>
            <div className="divide-y divide-[#EAE6DE]">
              {demoCredentials.map((cred) => (
                <div key={cred.id} className="px-4 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#101010] font-sans">{cred.role}</p>
                    <p className="text-[11px] text-[#72777D] font-sans truncate">{cred.email}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(cred.password)}
                      className="text-[#72777D] hover:text-[#101010] transition-colors"
                      title="Copy password"
                    >
                      <Copy size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => fillCredentials(cred.email, cred.password)}
                      className="text-[10px] text-[#173D35] font-semibold font-sans uppercase tracking-widest-label hover:text-[#1F4A40] transition-colors"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}