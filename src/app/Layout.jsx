import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Compass } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#141414]">
      {/* Floating Stadium Topbar */}
      <Navbar />

      {/* Main Content Canvas with intentional whitespace rhythm */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Outlet />
      </main>

      {/* Mobbin Inverted Polarity Footer Band with rounded-t-3xl */}
      <footer className="mt-20 bg-[#141414] text-white rounded-t-[32px] pt-12 pb-14 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-white text-[#141414] flex items-center justify-center font-bold text-xs squircle-icon">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-base tracking-tight text-white">
                Interview Practice Tracker.
              </span>
            </div>
            <p className="text-xs text-[#adadad] max-w-md">
              A minimalist, gallery-white dashboard system engineered for focused student interview preparation across algorithms, system design, and frontend code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#adadad]">
            <Link to="/" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link to="/questions" className="hover:text-white transition-colors">
              Question Tracker
            </Link>
            <Link to="/machine-coding" className="hover:text-white transition-colors">
              Machine Coding
            </Link>
            <span className="text-[#404040]">|</span>
            <span className="text-[#707070]">LocalStorage Synced</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
