import { useEffect, useState } from 'react';
import { Calendar, Clock, Video, MessageSquare, CheckCircle, Users, FolderGit2, Award, Trophy, Zap, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

const meetingTypes = [
  {
    id: 'discovery',
    title: 'Appel decouverte',
    duration: '15 min',
    description: 'Premier contact pour discuter de vos besoins et voir comment je peux vous aider.',
    icon: MessageSquare,
    color: '#9d6bf7',
    bgColor: 'rgba(157, 107, 247, 0.1)',
  },
  {
    id: 'technical',
    title: 'Discussion technique',
    duration: '30 min',
    description: 'Pour approfondir les aspects techniques d\'un projet ou d\'une architecture.',
    icon: Video,
    color: '#facc15',
    bgColor: 'rgba(250, 204, 21, 0.1)',
  },
  {
    id: 'interview',
    title: 'Entretien',
    duration: '45 min',
    description: 'Pour les recruteurs et hiring managers souhaitant evaluer mon profil.',
    icon: Users,
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.1)',
  },
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
];

const typeIcons: Record<string, any> = {
  project: FolderGit2,
  certification: Award,
  hackathon: Trophy,
  formation: Calendar,
  milestone: Zap,
};

const typeColors: Record<string, string> = {
  project: '#9d6bf7',
  certification: '#facc15',
  hackathon: '#22c55e',
  formation: '#3b82f6',
  milestone: '#f97316',
};

export function Agenda() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);

  useEffect(() => {
    document.title = 'Agenda | Mohammed - Cloud/DevOps/AI';
    api.getTimeline(20).then(setTimelineEvents).catch(() => { });
  }, []);

  const handleTypeSelect = (typeId: string) => { setSelectedType(typeId); setStep(2); };
  const handleDateSelect = (date: string) => { setSelectedDate(date); setStep(3); };
  const handleTimeSelect = (time: string) => { setSelectedTime(time); setStep(4); };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) setSelectedType(null);
      if (step === 3) setSelectedDate(null);
      if (step === 4) setSelectedTime(null);
    }
  };

  const handleSubmit = async () => {
    if (!clientName || !clientEmail || !selectedType || !selectedDate || !selectedTime) return;
    setSubmitting(true);
    try {
      await api.createBooking({
        meeting_type: selectedType,
        booking_date: selectedDate,
        booking_time: selectedTime,
        client_name: clientName,
        client_email: clientEmail,
        message: clientMessage,
      });
      setSubmitted(true);
    } catch (err) {
      alert('Erreur lors de la reservation. Veuillez ressayer.');
    }
    setSubmitting(false);
  };

  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(); date.setDate(date.getDate() + i + 1); return date;
  }).filter(d => d.getDay() !== 0 && d.getDay() !== 6);

  const selectedMeetingType = meetingTypes.find(t => t.id === selectedType);

  // Group timeline events by year
  const eventsByYear = timelineEvents.reduce((acc: Record<string, any[]>, e) => {
    const year = new Date(e.event_date).getFullYear().toString();
    acc[year] = acc[year] || [];
    acc[year].push(e);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="section-padding">
        <div className="container-max">

          {/* Tree Timeline Section */}
          {timelineEvents.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-cyber-text mb-4">
                  Arbre de <span className="text-cyber-mauve">parcours</span>
                </h2>
                <p className="text-cyber-text-muted max-w-xl mx-auto">
                  Les moments cles de mon evolution: projets, certifications, hackathons et milestones.
                </p>
              </div>

              {/* Tree visualization */}
              <div className="max-w-4xl mx-auto relative">
                {/* Main trunk */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2" style={{ background: 'linear-gradient(to bottom, #9d6bf7, #facc15, #22c55e, rgba(157,107,247,0.2))' }} />

                {Object.entries(eventsByYear).sort(([a], [b]) => parseInt(b) - parseInt(a)).map(([year, events]) => (
                  <div key={year} className="relative mb-12">
                    {/* Year node */}
                    <div className="flex items-center justify-center mb-6 relative z-10">
                      <div className="px-6 py-2 rounded-full font-bold text-lg border-2" style={{ background: '#0a0a14', borderColor: '#9d6bf7', color: '#9d6bf7', boxShadow: '0 0 20px rgba(157,107,247,0.3)' }}>
                        {year}
                      </div>
                    </div>

                    {/* Branches */}
                    {events.map((event: any, idx: number) => {
                      const isLeft = idx % 2 === 0;
                      const Icon = typeIcons[event.event_type] || Zap;
                      const color = event.color || typeColors[event.event_type] || '#9d6bf7';

                      return (
                        <div key={event.id} className="relative mb-6" style={{ animation: `fadeIn 0.4s ease-out ${idx * 0.1}s both` }}>
                          {/* Horizontal branch */}
                          <div className={cn('absolute top-6 h-px w-[calc(50%-24px)]', isLeft ? 'right-1/2 mr-3' : 'left-1/2 ml-3')} style={{ background: `linear-gradient(${isLeft ? 'to left' : 'to right'}, ${color}, transparent)` }} />

                          {/* Center node */}
                          <div className="absolute left-1/2 top-3 -translate-x-1/2 w-6 h-6 rounded-full z-10 flex items-center justify-center" style={{ background: '#0a0a14', border: `2px solid ${color}`, boxShadow: `0 0 12px ${color}50` }}>
                            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                          </div>

                          {/* Content card */}
                          <div className={cn('w-[calc(50%-40px)]', isLeft ? 'mr-auto' : 'ml-auto')}>
                            <div className={cn('p-4 rounded-xl transition-all hover:scale-[1.02] group', isLeft ? 'text-right' : '')} style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)' }}>
                              <div className={cn('flex items-center gap-2 mb-2', isLeft ? 'justify-end' : '')}>
                                <Icon className="w-4 h-4" style={{ color }} />
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                                  {event.event_type}
                                </span>
                              </div>
                              <h4 className="text-sm font-semibold text-white mb-1">{event.title}</h4>
                              {event.description && <p className="text-xs text-gray-400 line-clamp-2">{event.description}</p>}
                              <p className="text-[10px] text-gray-500 mt-2">
                                {new Date(event.event_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Root */}
                <div className="flex items-center justify-center relative z-10">
                  <div className="w-4 h-4 rounded-full" style={{ background: 'linear-gradient(135deg, #9d6bf7, #facc15)', boxShadow: '0 0 20px rgba(157,107,247,0.5)' }} />
                </div>
              </div>
            </div>
          )}

          {/* Booking Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-cyber-text mb-4">
              Reserver un <span className="text-cyber-mauve">creneau</span>
            </h1>
            <p className="text-cyber-text-muted text-lg max-w-2xl mx-auto">
              Choisissez le type de rendez-vous qui vous convient et selectionnez un creneau disponible.
            </p>
          </div>

          {/* Success state */}
          {submitted ? (
            <div className="max-w-md mx-auto text-center cyber-card p-12">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-cyber-text mb-3">Demande envoyee</h2>
              <p className="text-cyber-text-muted mb-6">Merci ! Je vous recontacterai dans les 24h pour confirmer votre creneau.</p>
              <button onClick={() => { setSubmitted(false); setStep(1); setSelectedType(null); setSelectedDate(null); setSelectedTime(null); setClientName(''); setClientEmail(''); setClientMessage(''); }} className="btn-secondary">
                Nouvelle reservation
              </button>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="flex items-center justify-center gap-3 mb-12">
                {['Type', 'Date', 'Heure', 'Infos'].map((label, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all', step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-cyber-mauve text-white ring-4 ring-cyber-mauve/20' : 'bg-cyber-card text-cyber-text-muted border border-white/10')}>
                      {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={cn('text-xs hidden sm:block', step >= i + 1 ? 'text-cyber-text' : 'text-cyber-text-muted')}>{label}</span>
                    {i < 3 && <div className={cn('w-8 h-px', step > i + 1 ? 'bg-green-500' : 'bg-white/10')} />}
                  </div>
                ))}
              </div>

              {/* Step 1: Select Meeting Type */}
              {step === 1 && (
                <div className="max-w-3xl mx-auto">
                  <div className="grid md:grid-cols-3 gap-6">
                    {meetingTypes.map((type) => (
                      <button key={type.id} onClick={() => handleTypeSelect(type.id)} className="cyber-card p-6 text-left group hover:border-cyber-mauve/30 transition-all hover:scale-[1.02]">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: type.bgColor }}>
                          <type.icon className="w-7 h-7" style={{ color: type.color }} />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-cyber-text group-hover:text-cyber-mauve transition-colors">{type.title}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-cyber-text-muted mb-3">
                          <Clock className="w-3 h-3" /> {type.duration}
                        </div>
                        <p className="text-cyber-text-muted text-sm">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Select Date */}
              {step === 2 && selectedMeetingType && (
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <button onClick={handleBack} className="text-cyber-text-muted hover:text-cyber-text transition-colors text-sm">← Retour</button>
                    <h2 className="text-xl font-semibold text-cyber-text">Selectionnez une date</h2>
                    <div className="w-16" />
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {dates.map((date) => {
                      const dateStr = date.toISOString().split('T')[0];
                      return (
                        <button key={dateStr} onClick={() => handleDateSelect(dateStr)} className={cn('p-4 rounded-xl border text-center transition-all hover:scale-105', selectedDate === dateStr ? 'bg-cyber-mauve border-cyber-mauve text-white' : 'bg-cyber-card border-white/5 text-cyber-text hover:border-cyber-mauve/30')}>
                          <div className="text-xs uppercase opacity-80">{date.toLocaleDateString('fr-FR', { weekday: 'short' })}</div>
                          <div className="text-2xl font-bold my-1">{date.getDate()}</div>
                          <div className="text-xs opacity-80">{date.toLocaleDateString('fr-FR', { month: 'short' })}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Select Time */}
              {step === 3 && selectedDate && (
                <div className="max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <button onClick={handleBack} className="text-cyber-text-muted hover:text-cyber-text transition-colors text-sm">← Retour</button>
                    <h2 className="text-xl font-semibold text-cyber-text">Selectionnez une heure</h2>
                    <div className="w-16" />
                  </div>
                  <div className="cyber-card p-4 mb-6 text-center">
                    <p className="text-cyber-text font-medium">
                      {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <button key={time} onClick={() => handleTimeSelect(time)} className={cn('p-3 rounded-xl border text-center font-medium transition-all hover:scale-105', selectedTime === time ? 'bg-cyber-mauve border-cyber-mauve text-white' : 'bg-cyber-card border-white/5 text-cyber-text hover:border-cyber-mauve/30')}>
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && selectedTime && (
                <div className="max-w-lg mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <button onClick={handleBack} className="text-cyber-text-muted hover:text-cyber-text transition-colors text-sm">← Retour</button>
                    <h2 className="text-xl font-semibold text-cyber-text">Vos informations</h2>
                    <div className="w-16" />
                  </div>

                  {/* Summary */}
                  <div className="cyber-card p-6 mb-6">
                    <h3 className="text-sm font-medium text-cyber-text-muted mb-3">Recapitulatif</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-cyber-text-muted">Type:</span> <span className="text-cyber-text font-medium ml-1">{selectedMeetingType?.title}</span></div>
                      <div><span className="text-cyber-text-muted">Duree:</span> <span className="text-cyber-text font-medium ml-1">{selectedMeetingType?.duration}</span></div>
                      <div><span className="text-cyber-text-muted">Date:</span> <span className="text-cyber-text font-medium ml-1">{new Date(selectedDate!).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span></div>
                      <div><span className="text-cyber-text-muted">Heure:</span> <span className="text-cyber-text font-medium ml-1">{selectedTime}</span></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-cyber-text-muted mb-2">Votre nom *</label>
                      <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Mohammed Guissi" className="cyber-input" required />
                    </div>
                    <div>
                      <label className="block text-sm text-cyber-text-muted mb-2">Votre email *</label>
                      <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="vous@example.com" className="cyber-input" required />
                    </div>
                    <div>
                      <label className="block text-sm text-cyber-text-muted mb-2">Message (optionnel)</label>
                      <textarea rows={3} value={clientMessage} onChange={(e) => setClientMessage(e.target.value)} placeholder="Decrivez brievement le sujet..." className="cyber-input resize-none" />
                    </div>
                  </div>

                  <button onClick={handleSubmit} disabled={submitting || !clientName || !clientEmail} className="w-full btn-primary mt-6 flex items-center justify-center gap-2 disabled:opacity-50">
                    {submitting ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Confirmer la reservation</>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
