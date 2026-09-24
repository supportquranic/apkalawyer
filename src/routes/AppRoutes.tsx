import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './paths';
import { ProtectedRoute } from './ProtectedRoute';
import { LoadingState } from '@/components/feedback/LoadingState';

// Layouts
import { PublicLayout } from '@/layouts/PublicLayout';
import { ClientLayout } from '@/layouts/ClientLayout';
import { LawyerLayout } from '@/layouts/LawyerLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

// Public Pages
import { HomePage } from '@/pages/public/HomePage';
import { LawyersPage } from '@/pages/public/LawyersPage';
import { LawyerProfilePage } from '@/pages/public/LawyerProfilePage';
import { PracticeAreasPage } from '@/pages/public/PracticeAreasPage';
import { HowItWorksPage } from '@/pages/public/HowItWorksPage';
import { AboutPage } from '@/pages/public/AboutPage';
import { FAQPage } from '@/pages/public/FAQPage';
import { ContactPage } from '@/pages/public/ContactPage';
import { LoginPage } from '@/pages/public/LoginPage';
import { RegisterPage } from '@/pages/public/RegisterPage';
import { PrivacyPage } from '@/pages/public/PrivacyPage';
import { TermsPage } from '@/pages/public/TermsPage';
import { DisclaimerPage } from '@/pages/public/DisclaimerPage';
import { NotFoundPage } from '@/pages/public/NotFoundPage';

// Client Pages
import { ClientDashboardPage } from '@/pages/client/ClientDashboardPage';
import { ClientLawyersPage } from '@/pages/client/ClientLawyersPage';
import { ClientConsultationsPage } from '@/pages/client/ClientConsultationsPage';
import { ClientMattersPage } from '@/pages/client/ClientMattersPage';
import { ClientMatterDetailPage } from '@/pages/client/ClientMatterDetailPage';
import { ClientMessagesPage } from '@/pages/client/ClientMessagesPage';
import { ClientDocumentsPage } from '@/pages/client/ClientDocumentsPage';
import { ClientCalendarPage } from '@/pages/client/ClientCalendarPage';
import { ClientHearingsPage } from '@/pages/client/ClientHearingsPage';
import { ClientPaymentsPage } from '@/pages/client/ClientPaymentsPage';
import { ClientNotificationsPage } from '@/pages/client/ClientNotificationsPage';
import { ClientProfilePage } from '@/pages/client/ClientProfilePage';
import { ClientLegalDocsPage } from '@/pages/client/ClientLegalDocsPage';

// Lawyer Pages
import { LawyerDashboardPage } from '@/pages/lawyer/LawyerDashboardPage';
import { LawyerRequestsPage } from '@/pages/lawyer/LawyerRequestsPage';
import { LawyerClientsPage } from '@/pages/lawyer/LawyerClientsPage';
import { LawyerMattersPage } from '@/pages/lawyer/LawyerMattersPage';
import { LawyerMatterDetailPage } from '@/pages/lawyer/LawyerMatterDetailPage';
import { LawyerCalendarPage } from '@/pages/lawyer/LawyerCalendarPage';
import { LawyerHearingsPage } from '@/pages/lawyer/LawyerHearingsPage';
import { LawyerMessagesPage } from '@/pages/lawyer/LawyerMessagesPage';
import { LawyerDocumentsPage } from '@/pages/lawyer/LawyerDocumentsPage';
import { LawyerEarningsPage } from '@/pages/lawyer/LawyerEarningsPage';
import { LawyerChamberProfilePage } from '@/pages/lawyer/LawyerProfilePage';
import { LawyerVerificationPage } from '@/pages/lawyer/LawyerVerificationPage';

// Admin Pages
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage';
import { AdminLawyersPage } from '@/pages/admin/AdminLawyersPage';
import { AdminVerificationPage } from '@/pages/admin/AdminVerificationPage';
import { AdminBookingsPage } from '@/pages/admin/AdminBookingsPage';
import { AdminMattersPage } from '@/pages/admin/AdminMattersPage';
import { AdminPaymentsPage } from '@/pages/admin/AdminPaymentsPage';
import { AdminReportsPage } from '@/pages/admin/AdminReportsPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingState message="Loading legal portal..." />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.PUBLIC.HOME} element={<HomePage />} />
          <Route path={ROUTES.PUBLIC.LAWYERS} element={<LawyersPage />} />
          <Route path={ROUTES.PUBLIC.LAWYER_DETAIL} element={<LawyerProfilePage />} />
          <Route path={ROUTES.PUBLIC.PRACTICE_AREAS} element={<PracticeAreasPage />} />
          <Route path={ROUTES.PUBLIC.HOW_IT_WORKS} element={<HowItWorksPage />} />
          <Route path={ROUTES.PUBLIC.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.PUBLIC.FAQ} element={<FAQPage />} />
          <Route path={ROUTES.PUBLIC.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.PUBLIC.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.PUBLIC.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.PUBLIC.PRIVACY} element={<PrivacyPage />} />
          <Route path={ROUTES.PUBLIC.TERMS} element={<TermsPage />} />
          <Route path={ROUTES.PUBLIC.DISCLAIMER} element={<DisclaimerPage />} />
        </Route>

        {/* Protected Client Routes */}
        <Route element={<ProtectedRoute requiredRole="client" />}>
          <Route element={<ClientLayout />}>
            <Route path="/client" element={<ClientDashboardPage />} />
            <Route path={ROUTES.CLIENT.DASHBOARD} element={<ClientDashboardPage />} />
            <Route path={ROUTES.CLIENT.LAWYERS} element={<ClientLawyersPage />} />
            <Route path={ROUTES.CLIENT.CONSULTATIONS} element={<ClientConsultationsPage />} />
            <Route path={ROUTES.CLIENT.MATTERS} element={<ClientMattersPage />} />
            <Route path={ROUTES.CLIENT.MATTER_DETAIL} element={<ClientMatterDetailPage />} />
            <Route path={ROUTES.CLIENT.MESSAGES} element={<ClientMessagesPage />} />
            <Route path={ROUTES.CLIENT.DOCUMENTS} element={<ClientDocumentsPage />} />
            <Route path={ROUTES.CLIENT.CALENDAR} element={<ClientCalendarPage />} />
            <Route path={ROUTES.CLIENT.HEARINGS} element={<ClientHearingsPage />} />
            <Route path={ROUTES.CLIENT.PAYMENTS} element={<ClientPaymentsPage />} />
            <Route path={ROUTES.CLIENT.NOTIFICATIONS} element={<ClientNotificationsPage />} />
            <Route path={ROUTES.CLIENT.PROFILE} element={<ClientProfilePage />} />
            <Route path={ROUTES.CLIENT.LEGAL_DOCUMENTS} element={<ClientLegalDocsPage />} />
          </Route>
        </Route>

        {/* Protected Lawyer Routes */}
        <Route element={<ProtectedRoute requiredRole="lawyer" />}>
          <Route element={<LawyerLayout />}>
            <Route path="/lawyer" element={<LawyerDashboardPage />} />
            <Route path={ROUTES.LAWYER.DASHBOARD} element={<LawyerDashboardPage />} />
            <Route path={ROUTES.LAWYER.REQUESTS} element={<LawyerRequestsPage />} />
            <Route path={ROUTES.LAWYER.CLIENTS} element={<LawyerClientsPage />} />
            <Route path={ROUTES.LAWYER.MATTERS} element={<LawyerMattersPage />} />
            <Route path={ROUTES.LAWYER.MATTER_DETAIL} element={<LawyerMatterDetailPage />} />
            <Route path={ROUTES.LAWYER.CALENDAR} element={<LawyerCalendarPage />} />
            <Route path={ROUTES.LAWYER.HEARINGS} element={<LawyerHearingsPage />} />
            <Route path={ROUTES.LAWYER.MESSAGES} element={<LawyerMessagesPage />} />
            <Route path={ROUTES.LAWYER.DOCUMENTS} element={<LawyerDocumentsPage />} />
            <Route path={ROUTES.LAWYER.EARNINGS} element={<LawyerEarningsPage />} />
            <Route path={ROUTES.LAWYER.PROFILE} element={<LawyerChamberProfilePage />} />
            <Route path={ROUTES.LAWYER.VERIFICATION} element={<LawyerVerificationPage />} />
          </Route>
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboardPage />} />
            <Route path={ROUTES.ADMIN.USERS} element={<AdminUsersPage />} />
            <Route path={ROUTES.ADMIN.LAWYERS} element={<AdminLawyersPage />} />
            <Route path={ROUTES.ADMIN.VERIFICATION} element={<AdminVerificationPage />} />
            <Route path={ROUTES.ADMIN.BOOKINGS} element={<AdminBookingsPage />} />
            <Route path={ROUTES.ADMIN.MATTERS} element={<AdminMattersPage />} />
            <Route path={ROUTES.ADMIN.PAYMENTS} element={<AdminPaymentsPage />} />
            <Route path={ROUTES.ADMIN.REPORTS} element={<AdminReportsPage />} />
            <Route path={ROUTES.ADMIN.SETTINGS} element={<AdminSettingsPage />} />
          </Route>
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
