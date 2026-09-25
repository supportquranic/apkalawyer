import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { lawyerService, bookingService } from '@/services';
import { Lawyer } from '@/types/lawyer';
import { useAuth } from '@/features/auth/AuthContext';
import { useSEO } from '@/hooks/useSEO';
import { formatPKR } from '@/utils/formatters';
import { LoadingState, EmptyState } from '@/components/feedback';
import { 
  Video, 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  Clock, 
  X, 
  CheckCircle2, 
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/routes/paths';

export const ClientLawyersPage: React.FC = () => {
  useSEO({ title: 'Verified Advocates & Video Consultation — Client Portal', noIndex: true });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  
  // Tab filters: 'all' | 'video' | 'supreme' | 'high'
  const filterParam = searchParams.get('filter') || 'all';
  const [activeTab, setActiveTab] = useState<string>(filterParam);

  // Video Booking Modal State
  const [selectedLawyerForBooking, setSelectedLawyerForBooking] = useState<Lawyer | null>(null);
  const [bookingDate, setBookingDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM - 11:45 AM');
  const [consultationNotes, setConsultationNotes] = useState<string>('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingSuccessModal, setBookingSuccessModal] = useState<{ ref: string; lawyer: string; time: string; date: string } | null>(null);

  useEffect(() => {
    lawyerService.getLawyers().then((data) => {
      setLawyers(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const currentParam = searchParams.get('filter');
    if (currentParam && currentParam !== activeTab) {
      setActiveTab(currentParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'all') {
      searchParams.delete('filter');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), filter: tab });
    }
  };

  // Filter logic
  const filteredLawyers = lawyers.filter((lawyer) => {
    // Tab filter
    if (activeTab === 'video') {
      // In our platform all active verified advocates support video consultation
    } else if (activeTab === 'supreme') {
      if (lawyer.courtEnrollment !== 'Supreme Court') return false;
    } else if (activeTab === 'high') {
      if (lawyer.courtEnrollment !== 'High Court') return false;
    }

    // City filter
    if (selectedCity !== 'All' && lawyer.city !== selectedCity) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = lawyer.name.toLowerCase().includes(q);
      const matchPractice = lawyer.practiceAreas.some((p) => p.toLowerCase().includes(q));
      const matchCity = lawyer.city.toLowerCase().includes(q);
      const matchCourt = lawyer.courtEnrollment.toLowerCase().includes(q);
      if (!matchName && !matchPractice && !matchCity && !matchCourt) return false;
    }

    return true;
  });

  const availableTimeSlots = [
    '10:30 AM - 11:15 AM',
    '11:30 AM - 12:15 PM',
    '02:30 PM - 03:15 PM',
    '04:00 PM - 04:45 PM',
    '05:30 PM - 06:15 PM',
    '07:00 PM - 07:45 PM',
  ];

  const handleConfirmBooking = async () => {
    if (!selectedLawyerForBooking) return;
    setIsSubmittingBooking(true);
    try {
      const result = await bookingService.createBooking(
        {
          lawyerId: selectedLawyerForBooking.id,
          practiceArea: selectedLawyerForBooking.practiceAreas[0] || 'General Legal Consultation',
          date: bookingDate,
          timeSlot: selectedTimeSlot,
          mode: 'video',
          clientNotes: consultationNotes || 'Online Video Consultation requested via Client Portal.',
        },
        user?.id || 'client-guest'
      );

      setSelectedLawyerForBooking(null);
      setConsultationNotes('');
      setBookingSuccessModal({
        ref: result.bookingRef,
        lawyer: selectedLawyerForBooking.name,
        time: selectedTimeSlot,
        date: bookingDate,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  if (isLoading) return <LoadingState message="Loading verified advocates directory..." />;

  const uniqueCities = ['All', ...Array.from(new Set(lawyers.map((l) => l.city)))];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
              <ShieldCheck className="h-3.5 w-3.5 text-black" />
              Verified Bar Council Directory
            </span>
            {activeTab === 'video' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-black text-white">
                <Video className="h-3 w-3 animate-pulse" />
                Live Video Mode
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
            {activeTab === 'video' ? 'Video Consultation with Advocates' : 'Find & Retain Legal Advocates'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            {activeTab === 'video'
              ? 'Select a verified advocate to book an instant confidential 1-on-1 video consultation.'
              : 'Connect with verified High Court & Supreme Court advocates across Pakistan.'}
          </p>
        </div>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="space-y-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Advocates', count: lawyers.length },
            { id: 'video', label: '📹 Video Consultation', count: lawyers.length },
            { id: 'high', label: 'High Court', count: lawyers.filter((l) => l.courtEnrollment === 'High Court').length },
            { id: 'supreme', label: 'Supreme Court', count: lawyers.filter((l) => l.courtEnrollment === 'Supreme Court').length },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200',
                  isActive
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-white text-neutral-600 hover:text-black border border-neutral-200 hover:border-neutral-300'
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-full font-mono',
                    isActive ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-600'
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & City Dropdown */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by advocate name, practice area, or court..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-neutral-200 rounded-xl placeholder:text-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] text-neutral-400 font-medium px-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" /> City:
            </span>
            {uniqueCities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={cn(
                  'px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap',
                  selectedCity === city
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                )}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lawyers Grid */}
      {filteredLawyers.length === 0 ? (
        <EmptyState
          title="No Advocates Found"
          description="No advocates match your search criteria. Try clearing search filters."
          actionLabel="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCity('All');
            handleTabChange('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="group relative rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Avatar & Details */}
                <div className="flex items-start gap-3.5">
                  <div className="relative">
                    <img
                      src={lawyer.avatarUrl}
                      alt={lawyer.name}
                      className="h-16 w-16 rounded-2xl object-cover border border-neutral-200"
                    />
                    <span
                      title="Available for Video Call"
                      className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white"
                    >
                      <Video className="h-2 w-2" />
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        {lawyer.courtEnrollment} Advocate
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-black tracking-tight truncate group-hover:text-neutral-900">
                      {lawyer.name}
                    </h3>
                    <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-neutral-400" />
                      <span>{lawyer.city}</span>
                      <span>•</span>
                      <span>{lawyer.experienceYears} yrs experience</span>
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-700 font-semibold mt-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span>{lawyer.rating}</span>
                      <span className="text-neutral-400 font-normal">({lawyer.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Practice Areas */}
                <div className="mt-3.5 pt-3 border-t border-neutral-100 flex flex-wrap gap-1">
                  {lawyer.practiceAreas.slice(0, 3).map((area, idx) => (
                    <span
                      key={idx}
                      className="inline-block text-[10px] font-medium bg-neutral-50 border border-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 block leading-tight">
                    Video Session Fee
                  </span>
                  <span className="text-xs font-bold text-black">
                    {formatPKR(lawyer.consultationFee)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/lawyers/${lawyer.id}`}
                    className="text-[11px] font-semibold text-neutral-500 hover:text-black px-2 py-1"
                  >
                    Profile
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedLawyerForBooking(lawyer)}
                    className="glass-btn gap-1 text-xs font-bold px-3 py-1.5 hover:border-black transition-all"
                  >
                    <Video className="h-3 w-3" />
                    <span>Book Call</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Consultation Booking Modal */}
      {selectedLawyerForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedLawyerForBooking.avatarUrl}
                  alt={selectedLawyerForBooking.name}
                  className="h-12 w-12 rounded-xl object-cover border border-neutral-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Video className="h-2.5 w-2.5" />
                      Live 1-on-1 Video Call
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-black mt-0.5">
                    {selectedLawyerForBooking.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    {selectedLawyerForBooking.courtEnrollment} • {selectedLawyerForBooking.city}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLawyerForBooking(null)}
                className="text-neutral-400 hover:text-black p-1 rounded-full hover:bg-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Fee summary */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80">
              <div>
                <span className="text-[10px] uppercase font-semibold text-neutral-500 block">Consultation Duration</span>
                <span className="text-xs font-bold text-black">45 Minutes Encrypted Video Session</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-semibold text-neutral-500 block">Payable Fee</span>
                <span className="text-sm font-bold text-black">{formatPKR(selectedLawyerForBooking.consultationFee)}</span>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="text-xs font-bold text-black mb-1.5 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-neutral-600" />
                Select Preferred Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-neutral-200 rounded-xl font-medium focus:outline-none focus:border-black"
              />
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="text-xs font-bold text-black mb-1.5 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-neutral-600" />
                Select Confirmed Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={cn(
                      'px-2.5 py-2 text-[11px] font-semibold rounded-xl border transition-all text-center',
                      selectedTimeSlot === slot
                        ? 'bg-black text-white border-black shadow-xs'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Case / Question Brief */}
            <div>
              <label className="text-xs font-bold text-black block mb-1.5">
                Brief Description of Legal Matter (Optional)
              </label>
              <textarea
                rows={2}
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
                placeholder="E.g., Seeking advice on inheritance property dispute and legal notice reply..."
                className="w-full px-3 py-2 text-xs bg-white border border-neutral-200 rounded-xl placeholder:text-neutral-400 focus:outline-none focus:border-black resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setSelectedLawyerForBooking(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-black"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmittingBooking}
                onClick={handleConfirmBooking}
                className="glass-btn gap-1.5 text-xs font-bold px-5 py-2 bg-black text-white hover:bg-neutral-800"
              >
                {isSubmittingBooking ? (
                  <span>Scheduling...</span>
                ) : (
                  <>
                    <Video className="h-3.5 w-3.5" />
                    <span>Confirm Video Call</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Success Modal */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 space-y-4 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                Booking Reference: {bookingSuccessModal.ref}
              </span>
              <h3 className="text-base font-bold text-black mt-1">
                Video Consultation Scheduled!
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Your live 1-on-1 session with <strong className="text-black">{bookingSuccessModal.lawyer}</strong> is confirmed for <strong className="text-black">{bookingSuccessModal.date}</strong> at <strong className="text-black">{bookingSuccessModal.time}</strong>.
              </p>
            </div>

            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/80 text-left text-xs text-neutral-600 space-y-1">
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Encrypted video room link sent to your phone & email</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Advocate has received your matter notification</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setBookingSuccessModal(null);
                  navigate(ROUTES.CLIENT.CONSULTATIONS);
                }}
                className="glass-btn gap-1 text-xs font-bold px-4 py-2"
              >
                <span>View My Consultations</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
