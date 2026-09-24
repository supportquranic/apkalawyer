export type CalendarEventType = 'hearing' | 'consultation' | 'filing_deadline' | 'client_meeting' | 'chamber_work';

export interface CalendarEvent {
  id: string;
  title: string;
  type: CalendarEventType;
  startDate: string; // ISO 8601
  endDate?: string;
  time?: string;
  location?: string;
  matterId?: string;
  matterNumber?: string;
  relatedPersonName?: string;
  status?: string;
  notes?: string;
}
