import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Gavel, Video, Clock } from 'lucide-react';

export const LawyerCalendarPage: React.FC = () => {
  useSEO({ title: 'Chamber & Court Diary — ApkaLawyer', noIndex: true });

  const events = [
    {
      id: 'e1',
      date: '02 Oct 2026',
      time: '04:00 PM',
      title: 'Video Consultation: Bilal Ahmad Khan',
      type: 'consultation',
    },
    {
      id: 'e2',
      date: '14 Oct 2026',
      time: '09:30 AM',
      title: 'LHC Single Bench Hearing: W.P. 18492/2026 (Justice Tariq Saleem Sheikh)',
      type: 'hearing',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Advocate Calendar & Diary</h1>
        <p className="text-xs text-slate-500">Court appearances, client video slots, and urgent motion deadlines.</p>
      </div>

      <div className="space-y-3">
        {events.map((e) => (
          <div key={e.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                e.type === 'hearing' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                {e.type === 'hearing' ? <Gavel className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{e.title}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3" />
                  {e.date} • {e.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
