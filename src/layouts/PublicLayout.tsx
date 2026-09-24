import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Menu, X, ArrowUpRight, ChevronDown, Search, ArrowRight, Download } from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';
import { InstallAppModal } from '@/components/pwa/InstallAppModal';
import { 
  LEGAL_CATEGORIES, 
  POPULAR_SPECIALIZATIONS, 
  POPULAR_SERVICES 
} from '@/data/constants/legalTaxonomy';

export const PublicLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'spec' | 'serv' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [mobileExpandedSection, setMobileExpandedSection] = useState<'spec' | 'serv' | null>(null);

  const { user } = useAuth();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSpecializations = POPULAR_SPECIALIZATIONS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.categoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredServices = POPULAR_SERVICES.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.categoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-black antialiased">
      {/* Public Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" ref={navRef}>
          {/* Logo */}
          <Link to={ROUTES.PUBLIC.HOME} className="flex items-center gap-2 flex-shrink-0 mr-4">
            <span className="font-bold text-lg tracking-tight text-black">
              Apka<span className="font-normal text-neutral-500">Lawyer</span>
            </span>
          </Link>

          {/* Desktop Navigation Links & Dropdowns */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-700">
            <Link
              to={ROUTES.PUBLIC.LAWYERS}
              className={`transition-colors hover:text-black ${
                location.pathname === ROUTES.PUBLIC.LAWYERS && !location.search ? 'text-black font-semibold' : ''
              }`}
            >
              Find a Lawyer
            </Link>

            {/* 1. Lawyers by Specialization Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setActiveDropdown(activeDropdown === 'spec' ? null : 'spec');
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className={`inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors hover:text-black ${
                  activeDropdown === 'spec' ? 'text-black font-semibold' : 'text-neutral-700'
                }`}
                aria-expanded={activeDropdown === 'spec'}
              >
                <span>Lawyers by Specialization</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    activeDropdown === 'spec' ? 'rotate-180 text-black' : 'text-neutral-400'
                  }`}
                />
              </button>

              {/* Specialization Dropdown Panel */}
              {activeDropdown === 'spec' && (
                <div className="absolute left-0 top-full mt-2 w-[540px] rounded-xl border border-neutral-200 bg-white p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
                    <div className="flex items-center gap-2 flex-1 mr-2">
                      <Search className="h-3.5 w-3.5 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search legal specializations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-xs text-black placeholder-neutral-400 outline-none bg-transparent"
                        autoFocus
                      />
                    </div>
                    <Link
                      to={ROUTES.PUBLIC.PRACTICE_AREAS}
                      className="text-[11px] font-semibold text-neutral-900 hover:underline whitespace-nowrap flex items-center gap-1"
                    >
                      View All
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  {/* Category Pills */}
                  <div className="flex gap-1 overflow-x-auto pb-2 mb-2 scrollbar-none">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('All')}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === 'All' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      All
                    </button>
                    {LEGAL_CATEGORIES.slice(0, 7).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                          selectedCategory === cat.name ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Specialization List */}
                  <div className="grid grid-cols-2 gap-1 max-h-64 overflow-y-auto pr-1">
                    {filteredSpecializations.length === 0 ? (
                      <p className="col-span-2 py-6 text-center text-xs text-neutral-400">
                        No specializations matching &quot;{searchQuery}&quot;
                      </p>
                    ) : (
                      filteredSpecializations.map((item) => (
                        <Link
                          key={item.id}
                          to={`${ROUTES.PUBLIC.LAWYERS}?specialization=${encodeURIComponent(item.name)}`}
                          className="p-2 rounded-lg hover:bg-neutral-50 transition-colors text-left group"
                        >
                          <p className="text-xs font-semibold text-neutral-900 group-hover:text-black line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">{item.categoryName}</p>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Lawyers by Services Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setActiveDropdown(activeDropdown === 'serv' ? null : 'serv');
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className={`inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors hover:text-black ${
                  activeDropdown === 'serv' ? 'text-black font-semibold' : 'text-neutral-700'
                }`}
                aria-expanded={activeDropdown === 'serv'}
              >
                <span>Lawyers by Services</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    activeDropdown === 'serv' ? 'rotate-180 text-black' : 'text-neutral-400'
                  }`}
                />
              </button>

              {/* Services Dropdown Panel */}
              {activeDropdown === 'serv' && (
                <div className="absolute left-0 top-full mt-2 w-[540px] rounded-xl border border-neutral-200 bg-white p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
                    <div className="flex items-center gap-2 flex-1 mr-2">
                      <Search className="h-3.5 w-3.5 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search legal services (drafting, notices, filing)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-xs text-black placeholder-neutral-400 outline-none bg-transparent"
                        autoFocus
                      />
                    </div>
                    <Link
                      to={ROUTES.PUBLIC.PRACTICE_AREAS}
                      className="text-[11px] font-semibold text-neutral-900 hover:underline whitespace-nowrap flex items-center gap-1"
                    >
                      All Services
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  {/* Category Pills */}
                  <div className="flex gap-1 overflow-x-auto pb-2 mb-2 scrollbar-none">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('All')}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === 'All' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      All
                    </button>
                    {LEGAL_CATEGORIES.slice(0, 7).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                          selectedCategory === cat.name ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Services List */}
                  <div className="grid grid-cols-2 gap-1 max-h-64 overflow-y-auto pr-1">
                    {filteredServices.length === 0 ? (
                      <p className="col-span-2 py-6 text-center text-xs text-neutral-400">
                        No legal services matching &quot;{searchQuery}&quot;
                      </p>
                    ) : (
                      filteredServices.map((item) => (
                        <Link
                          key={item.id}
                          to={`${ROUTES.PUBLIC.LAWYERS}?service=${encodeURIComponent(item.name)}`}
                          className="p-2 rounded-lg hover:bg-neutral-50 transition-colors text-left group"
                        >
                          <p className="text-xs font-semibold text-neutral-900 group-hover:text-black line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">{item.categoryName}</p>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              to={ROUTES.PUBLIC.HOW_IT_WORKS}
              className={`transition-colors hover:text-black ${
                location.pathname === ROUTES.PUBLIC.HOW_IT_WORKS ? 'text-black font-semibold' : ''
              }`}
            >
              How It Works
            </Link>

            <a href="#for-lawyers" className="transition-colors hover:text-black">
              For Lawyers
            </a>

            <Link
              to={ROUTES.PUBLIC.FAQ}
              className={`transition-colors hover:text-black ${
                location.pathname === ROUTES.PUBLIC.FAQ ? 'text-black font-semibold' : ''
              }`}
            >
              Resources
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setInstallModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:text-black transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Install App</span>
            </button>

            {user ? (
              <Link
                to={
                  user.role === 'lawyer'
                    ? ROUTES.LAWYER.DASHBOARD
                    : user.role === 'admin'
                    ? ROUTES.ADMIN.DASHBOARD
                    : ROUTES.CLIENT.DASHBOARD
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                Go to Workspace
                <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
              </Link>
            ) : (
              <>
                <Link
                  to={ROUTES.PUBLIC.LOGIN}
                  className="text-xs font-semibold text-neutral-700 hover:text-black transition-colors px-2 py-1.5"
                >
                  Sign In
                </Link>
                <Link
                  to={ROUTES.PUBLIC.LAWYERS}
                  className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {!user ? (
              <>
                <Link
                  to={ROUTES.PUBLIC.LOGIN}
                  className="text-xs font-semibold text-neutral-700 hover:text-black px-2 py-1"
                >
                  Sign In
                </Link>
                <Link
                  to={ROUTES.PUBLIC.LAWYERS}
                  className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Link
                to={
                  user.role === 'lawyer'
                    ? ROUTES.LAWYER.DASHBOARD
                    : user.role === 'admin'
                    ? ROUTES.ADMIN.DASHBOARD
                    : ROUTES.CLIENT.DASHBOARD
                }
                className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white"
              >
                Portal
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-neutral-700 hover:text-black"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-neutral-200 bg-white px-4 py-4 space-y-3 max-h-[85vh] overflow-y-auto">
            <Link
              to={ROUTES.PUBLIC.LAWYERS}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-900 py-1"
            >
              Find a Lawyer
            </Link>

            {/* Mobile Specialization Accordion */}
            <div className="border-t border-neutral-100 pt-2">
              <button
                type="button"
                onClick={() =>
                  setMobileExpandedSection(mobileExpandedSection === 'spec' ? null : 'spec')
                }
                className="w-full flex items-center justify-between text-sm font-medium text-neutral-900 py-1.5"
              >
                <span>Lawyers by Specialization</span>
                <ChevronDown
                  className={`h-4 w-4 text-neutral-500 transition-transform ${
                    mobileExpandedSection === 'spec' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileExpandedSection === 'spec' && (
                <div className="pl-3 pr-1 py-2 space-y-1.5 border-l border-neutral-200 mt-1 max-h-48 overflow-y-auto">
                  {POPULAR_SPECIALIZATIONS.slice(0, 10).map((s) => (
                    <Link
                      key={s.id}
                      to={`${ROUTES.PUBLIC.LAWYERS}?specialization=${encodeURIComponent(s.name)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-neutral-600 hover:text-black py-0.5"
                    >
                      {s.name}
                    </Link>
                  ))}
                  <Link
                    to={ROUTES.PUBLIC.PRACTICE_AREAS}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-black pt-1"
                  >
                    View All Specializations →
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Services Accordion */}
            <div className="border-t border-neutral-100 pt-2">
              <button
                type="button"
                onClick={() =>
                  setMobileExpandedSection(mobileExpandedSection === 'serv' ? null : 'serv')
                }
                className="w-full flex items-center justify-between text-sm font-medium text-neutral-900 py-1.5"
              >
                <span>Lawyers by Services</span>
                <ChevronDown
                  className={`h-4 w-4 text-neutral-500 transition-transform ${
                    mobileExpandedSection === 'serv' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileExpandedSection === 'serv' && (
                <div className="pl-3 pr-1 py-2 space-y-1.5 border-l border-neutral-200 mt-1 max-h-48 overflow-y-auto">
                  {POPULAR_SERVICES.slice(0, 10).map((s) => (
                    <Link
                      key={s.id}
                      to={`${ROUTES.PUBLIC.LAWYERS}?service=${encodeURIComponent(s.name)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-neutral-600 hover:text-black py-0.5"
                    >
                      {s.name}
                    </Link>
                  ))}
                  <Link
                    to={ROUTES.PUBLIC.PRACTICE_AREAS}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold text-black pt-1"
                  >
                    View All Services →
                  </Link>
                </div>
              )}
            </div>

            <div className="border-t border-neutral-100 pt-2 space-y-2">
              <Link
                to={ROUTES.PUBLIC.HOW_IT_WORKS}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-neutral-700 hover:text-black py-1"
              >
                How It Works
              </Link>
              <a
                href="#for-lawyers"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-neutral-700 hover:text-black py-1"
              >
                For Lawyers
              </a>
              <Link
                to={ROUTES.PUBLIC.FAQ}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-neutral-700 hover:text-black py-1"
              >
                Resources & FAQ
              </Link>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setInstallModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-neutral-300 py-2 text-xs font-semibold text-neutral-900 bg-neutral-50 hover:bg-neutral-100"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Install ApkaLawyer App</span>
              </button>

              <Link
                to={ROUTES.PUBLIC.ABOUT}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-500 hover:text-black py-1"
              >
                About Us
              </Link>
              <Link
                to={ROUTES.PUBLIC.CONTACT}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-500 hover:text-black py-1"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Clean Minimal Monochrome Footer */}
      <footer className="bg-white border-t border-neutral-200 text-neutral-600 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="font-bold text-base tracking-tight text-black mb-2">
                Apka<span className="font-normal text-neutral-500">Lawyer</span>
              </div>
              <p className="text-neutral-500 max-w-sm leading-relaxed text-xs">
                Pakistan's verified legal network. Connect with independent licensed advocates for consultations, matter management, and court hearings.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-3">Platform</h4>
              <ul className="space-y-2">
                <li><Link to={ROUTES.PUBLIC.LAWYERS} className="hover:text-black transition-colors">Find a Lawyer</Link></li>
                <li><Link to={ROUTES.PUBLIC.PRACTICE_AREAS} className="hover:text-black transition-colors">Practice Areas</Link></li>
                <li><Link to={ROUTES.PUBLIC.HOW_IT_WORKS} className="hover:text-black transition-colors">How It Works</Link></li>
                <li><button type="button" onClick={() => setInstallModalOpen(true)} className="hover:text-black transition-colors">Install App</button></li>
                <li><a href="#for-lawyers" className="hover:text-black transition-colors">For Lawyers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><Link to={ROUTES.PUBLIC.FAQ} className="hover:text-black transition-colors">FAQ</Link></li>
                <li><Link to={ROUTES.PUBLIC.ABOUT} className="hover:text-black transition-colors">About Us</Link></li>
                <li><Link to={ROUTES.PUBLIC.CONTACT} className="hover:text-black transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Link to={ROUTES.PUBLIC.PRIVACY} className="hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link to={ROUTES.PUBLIC.TERMS} className="hover:text-black transition-colors">Terms of Service</Link></li>
                <li><Link to={ROUTES.PUBLIC.DISCLAIMER} className="hover:text-black transition-colors">Legal Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-neutral-400 gap-4">
            <p>© {new Date().getFullYear()} ApkaLawyer Technologies. All rights reserved.</p>
            <p className="max-w-xl text-neutral-400">
              Disclaimer: ApkaLawyer is a technology platform connecting clients with independent licensed advocates. ApkaLawyer is not a law firm and does not provide legal advice directly.
            </p>
          </div>
        </div>
      </footer>

      {/* PWA Install Modal */}
      <InstallAppModal
        isOpen={installModalOpen}
        onClose={() => setInstallModalOpen(false)}
      />
    </div>
  );
};
