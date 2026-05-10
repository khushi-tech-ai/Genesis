'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import AppLogo from '@/components/ui/AppLogo';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Smile,
  Frown,
  Meh,
  Heart,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


type CheckInFormData = {
  mood: number;
  stress: number;
  attended: string;
  supportNeeds: string[];
  confidence: number;
  readiness: number;
};

const steps = [
  { id: 'step-1', label: 'Mood', title: 'How are you feeling today?', subtitle: "There\'s no right or wrong answer — just be honest." },
  { id: 'step-2', label: 'Stress', title: 'How would you rate your stress this week?', subtitle: 'Your wellbeing matters to us.' },
  { id: 'step-3', label: 'Attendance', title: 'Did you attend all your sessions this week?', subtitle: 'Select the option that best describes your week.' },
  { id: 'step-4', label: 'Support', title: 'Do you need support with anything?', subtitle: 'Select all that apply — your coach will follow up.' },
  { id: 'step-5', label: 'Readiness', title: 'How confident are you about your progress?', subtitle: 'Reflect on this past week and your goals.' },
];

const moodOptions = [
  { id: 'mood-great', value: 5, icon: '😊', label: 'Great' },
  { id: 'mood-good', value: 4, icon: '🙂', label: 'Good' },
  { id: 'mood-okay', value: 3, icon: '😐', label: 'Okay' },
  { id: 'mood-low', value: 2, icon: '😔', label: 'Low' },
  { id: 'mood-struggling', value: 1, icon: '😟', label: 'Struggling' },
];

const attendanceOptions = [
  { id: 'att-yes', value: 'yes', label: 'Yes, I attended all sessions', icon: CheckCircle2 },
  { id: 'att-most', value: 'most', label: 'I missed one or two', icon: Meh },
  { id: 'att-some', value: 'some', label: 'I missed several sessions', icon: Frown },
];

const supportOptions = [
  { id: 'sup-transport', value: 'transportation', label: 'Transportation', emoji: '🚌' },
  { id: 'sup-housing', value: 'housing', label: 'Housing', emoji: '🏠' },
  { id: 'sup-employment', value: 'employment', label: 'Job Search', emoji: '💼' },
  { id: 'sup-mental', value: 'mental_health', label: 'Mental Wellbeing', emoji: '🌿' },
  { id: 'sup-financial', value: 'financial', label: 'Financial Support', emoji: '💰' },
  { id: 'sup-none', value: 'none', label: 'No support needed', emoji: '✅' },
];

export default function WeeklyCheckInContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number>(0);
  const [selectedAttendance, setSelectedAttendance] = useState<string>('');
  const [selectedSupport, setSelectedSupport] = useState<string[]>([]);
  const [stress, setStress] = useState(5);
  const [confidence, setConfidence] = useState(7);
  const [readiness, setReadiness] = useState(7);

  const { handleSubmit } = useForm<CheckInFormData>();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const toggleSupport = (value: string) => {
    if (value === 'none') {
      setSelectedSupport(['none']);
      return;
    }
    setSelectedSupport(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev.filter(v => v !== 'none'), value]
    );
  };

  const handleComplete = () => {
    setCompleted(true);
    toast('Check-in submitted successfully', { description: 'Your coach has been notified.' });
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-[#EDE9E1] flex items-center justify-center p-4">
        <div className="w-full max-w-[390px] min-h-[844px] bg-[#F5F2EB] rounded-[32px] overflow-hidden flex flex-col items-center justify-center px-6 border border-[#D9D4C9] shadow-elevated">
          <div className="text-center fade-in">
            <div className="w-20 h-20 bg-[#173D35]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#173D35]/20">
              <CheckCircle2 size={40} className="text-[#173D35]" />
            </div>
            <h2 className="font-serif text-[#101010] text-3xl font-semibold mb-3">Well done, Alex.</h2>
            <p className="text-[#72777D] text-sm font-sans leading-relaxed mb-8">
              Your check-in is complete. Your coach will review your responses and reach out if any support is needed.
            </p>
            <div className="bg-[#B8965E]/08 rounded-2xl p-4 mb-8 border border-[#B8965E]/20" style={{backgroundColor:'rgba(184,150,94,0.07)'}}>
              <div className="flex items-center gap-2 mb-2">
                <Heart size={16} className="text-[#B8965E]" />
                <span className="text-[#B8965E] text-xs font-semibold uppercase tracking-widest-label font-sans">Coaching Note</span>
              </div>
              <p className="text-[#101010] text-sm font-sans">Thank you for completing your weekly check-in. Your commitment to the program matters.</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full bg-[#173D35] text-[#F5F2EB] font-medium text-sm rounded-xl py-4 hover:bg-[#1F4A40] transition-colors active:scale-[0.98] font-sans"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-[#EDE9E1] flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] min-h-[844px] bg-[#F5F2EB] rounded-[32px] overflow-hidden flex flex-col border border-[#D9D4C9] shadow-elevated">

        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 bg-[#F5F2EB]">
          <span className="text-[#101010] text-sm font-semibold font-sans">9:41</span>
          <div className="w-6 h-3 border border-[#101010] rounded-sm flex items-center px-0.5">
            <div className="w-4 h-2 bg-[#101010] rounded-sm" />
          </div>
        </div>

        {/* Header */}
        <div className="px-5 pt-2 pb-4 bg-[#F5F2EB]">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="w-8 h-8 bg-white border border-[#D9D4C9] rounded-full flex items-center justify-center text-[#72777D] hover:text-[#101010] transition-colors shadow-soft">
              <ChevronLeft size={16} />
            </Link>
            <div className="flex items-center gap-2">
              <AppLogo size={18} src="/assets/images/genesis_platform_logo-1778430199358.png" />
              <span className="text-[10px] text-[#72777D] uppercase tracking-widest-label font-sans">Weekly Check-In</span>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#72777D] font-sans">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-xs text-[#B8965E] font-sans font-medium">{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-[#EAE6DE] rounded-full h-1">
              <div
                className="bg-[#173D35] h-1 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-1">
              {steps.map((s, i) => (
                <div
                  key={s.id}
                  className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                    i <= currentStep ? 'bg-[#B8965E]' : 'bg-[#EAE6DE]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 px-5 pb-4 fade-in bg-[#F5F2EB]">
          <div className="mb-6">
            <h2 className="font-serif text-[#101010] text-2xl font-semibold leading-snug mb-2">{step.title}</h2>
            <p className="text-[#72777D] text-sm font-sans leading-relaxed">{step.subtitle}</p>
          </div>

          {/* Step 1: Mood */}
          {currentStep === 0 && (
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedMood(option.value)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-150 ${
                    selectedMood === option.value
                      ? 'bg-[#173D35] border-[#173D35] scale-105'
                      : 'bg-white border-[#D9D4C9] hover:border-[#173D35]/40'
                  }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className={`text-[10px] font-sans ${selectedMood === option.value ? 'text-white/80' : 'text-[#72777D]'}`}>{option.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Stress */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="font-serif text-[#101010] text-5xl font-semibold">{stress}</span>
                <span className="text-[#72777D] text-lg font-sans">/10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={stress}
                onChange={(e) => setStress(Number(e.target.value))}
                className="slider-forest w-full"
              />
              <div className="flex justify-between text-xs text-[#72777D] font-sans">
                <span className="flex items-center gap-1"><Smile size={12} /> Very low</span>
                <span className="flex items-center gap-1">Very high <Frown size={12} /></span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { id: 'stress-low', range: '1-3', label: 'Manageable', color: 'text-[#2E7D5A]', bg: 'bg-[#2E7D5A]/08 border-[#2E7D5A]/20' },
                  { id: 'stress-mid', range: '4-7', label: 'Moderate', color: 'text-[#B8965E]', bg: 'bg-[#B8965E]/08 border-[#B8965E]/20' },
                  { id: 'stress-high', range: '8-10', label: 'High', color: 'text-[#C83C3C]', bg: 'bg-[#C83C3C]/08 border-[#C83C3C]/20' },
                ].map(({ id, range, label, color, bg }) => (
                  <div key={id} className={`rounded-xl p-3 border text-center ${bg}`} style={{backgroundColor: id === 'stress-low' ? 'rgba(46,125,90,0.06)' : id === 'stress-mid' ? 'rgba(184,150,94,0.06)' : 'rgba(200,60,60,0.06)'}}>
                    <p className={`text-xs font-semibold font-sans ${color}`}>{range}</p>
                    <p className="text-[10px] text-[#72777D] font-sans mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Attendance */}
          {currentStep === 2 && (
            <div className="space-y-2.5">
              {attendanceOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedAttendance(option.value)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${
                      selectedAttendance === option.value
                        ? 'bg-[#173D35] border-[#173D35]'
                        : 'bg-white border-[#D9D4C9] hover:border-[#173D35]/40'
                    }`}
                  >
                    <Icon size={18} className={selectedAttendance === option.value ? 'text-white' : 'text-[#72777D]'} />
                    <span className={`text-sm font-medium font-sans ${selectedAttendance === option.value ? 'text-white' : 'text-[#101010]'}`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 4: Support */}
          {currentStep === 3 && (
            <div className="grid grid-cols-2 gap-2.5">
              {supportOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleSupport(option.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-150 ${
                    selectedSupport.includes(option.value)
                      ? 'bg-[#173D35] border-[#173D35]'
                      : 'bg-white border-[#D9D4C9] hover:border-[#173D35]/40'
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className={`text-xs font-medium font-sans text-center ${selectedSupport.includes(option.value) ? 'text-white' : 'text-[#101010]'}`}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Step 5: Readiness */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs text-[#72777D] font-sans mb-3">Confidence Level</p>
                <div className="text-center mb-3">
                  <span className="font-serif text-[#101010] text-4xl font-semibold">{confidence}</span>
                  <span className="text-[#72777D] text-lg font-sans">/10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="slider-forest w-full"
                />
              </div>
              <div>
                <p className="text-xs text-[#72777D] font-sans mb-3">Readiness for Next Steps</p>
                <div className="text-center mb-3">
                  <span className="font-serif text-[#101010] text-4xl font-semibold">{readiness}</span>
                  <span className="text-[#72777D] text-lg font-sans">/10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={readiness}
                  onChange={(e) => setReadiness(Number(e.target.value))}
                  className="slider-forest w-full"
                />
              </div>
              <div className="bg-white border border-[#D9D4C9] rounded-xl p-4 shadow-soft">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={14} className="text-[#B8965E]" />
                  <span className="text-[10px] text-[#B8965E] uppercase tracking-widest-label font-sans font-semibold">Your Progress</span>
                </div>
                <p className="text-[#101010] text-xs font-sans leading-relaxed">
                  Every step forward matters. Your coach is here to support you through any challenges.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="px-5 pb-8 pt-4 bg-[#F5F2EB] border-t border-[#EAE6DE]">
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 py-3.5 text-sm text-[#72777D] font-sans font-medium border border-[#D9D4C9] rounded-xl hover:bg-white hover:text-[#101010] transition-colors bg-white"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 bg-[#173D35] text-[#F5F2EB] font-medium text-sm rounded-xl py-3.5 hover:bg-[#1F4A40] transition-colors active:scale-[0.98] font-sans"
            >
              {currentStep === steps.length - 1 ? 'Submit Check-In' : 'Continue'}
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}