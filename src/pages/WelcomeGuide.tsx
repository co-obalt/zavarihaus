import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Wifi, ChefHat, Compass, ShieldAlert, MessageSquare, 
  ArrowLeft, Phone, ArrowUpRight
} from 'lucide-react';

import { SAFETY_INFO } from '../components/welcome-guide/data';
import Hero from '../components/welcome-guide/Hero';
import WiFiCard from '../components/welcome-guide/WiFiCard';
import Amenities from '../components/welcome-guide/Amenities';
import LocalGuide from '../components/welcome-guide/LocalGuide';
import Policies from '../components/welcome-guide/Policies';
import ConciergeChat from '../components/welcome-guide/ConciergeChat';

type TabType = 'welcome' | 'wifi' | 'amenities' | 'local' | 'policies' | 'concierge';

interface WelcomeGuideProps {
  onBackToHome?: () => void;
}

export default function WelcomeGuide({ onBackToHome }: WelcomeGuideProps) {
  const [activeTab, setActiveTab] = useState<TabType>('welcome');
  const [checkInStatus, setCheckInStatus] = useState<'idle' | 'in_progress' | 'completed'>('in_progress');
  const [selectedSuite, setSelectedSuite] = useState<string>('Skyview Suite F1');

  const menuItems = [
    { id: 'welcome', label: 'Welcome & Arrival', icon: Home },
    { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
    { id: 'amenities', label: 'Suite Amenities', icon: ChefHat },
    { id: 'local', label: 'Explore Lahore', icon: Compass },
    { id: 'policies', label: 'House Policies', icon: ShieldAlert },
    { id: 'concierge', label: 'Digital Concierge', icon: MessageSquare },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as TabType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1C1C] flex flex-col font-sans selection:bg-[#EDE5D7] selection:text-[#513431]">
      
      {/* Top Accent Stripe */}
      <div className="h-[3px] bg-[#513431] w-full fixed top-0 left-0 z-50" />

      {/* Top Welcome Guide Header */}
      <header className="fixed top-[3px] left-0 right-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E1D6] h-[75px]">
        <div className="max-w-[1440px] mx-auto h-full px-[4vw] flex items-center justify-between">
          
          {/* Logo and Tagline */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleReturnHome}
              className="flex items-center gap-3 cursor-pointer group focus:outline-none"
              title="Return to Main Website"
            >
              <img
                src="/logo.png"
                alt="Zavari Haus Logo"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReturnHome}
              className="inline-flex items-center gap-2 border border-[#E8E1D6] bg-[#FDFBF7] text-[#1C1C1C] hover:border-[#B8975A] hover:text-[#B8975A] transition-all px-4 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase"
              style={{ borderRadius: '2px' }}
            >
              <ArrowLeft size={14} />
              <span className="hidden md:inline">MAIN WEBSITE</span>
            </button>

            <a
              href="https://wa.me/923058480987"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B8975A] text-[#1C1C1C] hover:bg-[#513431] hover:text-[#B8975A] transition-all px-4 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase inline-flex items-center gap-1.5 shadow-sm"
              style={{ borderRadius: '2px' }}
            >
              <span>WHATSAPP DESK</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 pt-[78px] flex">
        
        {/* DESKTOP LEFT SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-72 bg-[#FDFBF7] border-r border-[#E8E1D6] fixed h-[calc(100vh-78px)] top-[78px] z-30 justify-between p-6 overflow-y-auto">
          <div className="space-y-6">
            
            {/* Guide Heading */}
            <div className="border-b border-[#E8E1D6] pb-4">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#B8975A] block">
                IN-HOUSE DIRECTORY
              </span>
              <h2 className="text-[20px] font-normal text-[#1C1C1C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Resident Portal
              </h2>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 text-[11.5px] font-semibold tracking-[0.14em] uppercase transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#513431] text-[#B8975A] shadow-sm border border-[#513431]'
                        : 'text-[#77736E] hover:text-[#1C1C1C] hover:bg-[#EDE5D7]/50 border border-transparent'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <IconComponent className={`h-4 w-4 ${isActive ? 'text-[#B8975A]' : 'text-[#AAA39A]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Desktop Sidebar Footer */}
          <div className="space-y-4 border-t border-[#E8E1D6] pt-5">
            <div className="bg-[#EDE5D7]/40 rounded p-3 text-center border border-[#E8E1D6]">
              <span className="block text-[10px] uppercase text-[#AAA39A] tracking-wider">Assigned Suite</span>
              <span className="text-[12px] font-bold text-[#1C1C1C]">{selectedSuite}</span>
            </div>
            
            <div className="flex items-center gap-2 justify-center text-[#77736E] hover:text-[#1C1C1C] transition-colors">
              <Phone className="h-3.5 w-3.5 text-[#B8975A]" />
              <a href={`tel:${SAFETY_INFO.contacts.emergency.phone.replace(/\s+/g, '')}`} className="text-[11px] font-mono font-medium">
                Duty Manager: {SAFETY_INFO.contacts.emergency.phone}
              </a>
            </div>
          </div>
        </aside>

        {/* PRIMARY FULL WIDTH CONTENT WRAPPER */}
        <main className="flex-1 flex flex-col lg:pl-72 relative z-10">
          
          {/* CONTAINER FOR CURRENT VIEW */}
          <div className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {activeTab === 'welcome' && (
                  <Hero
                    onNavigate={handleTabChange}
                    checkInStatus={checkInStatus}
                    setCheckInStatus={setCheckInStatus}
                    selectedSuite={selectedSuite}
                    setSelectedSuite={setSelectedSuite}
                  />
                )}
                {activeTab === 'wifi' && <WiFiCard />}
                {activeTab === 'amenities' && <Amenities />}
                {activeTab === 'local' && <LocalGuide />}
                {activeTab === 'policies' && <Policies />}
                {activeTab === 'concierge' && <ConciergeChat />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

      </div>

      {/* RESPONSIVE BOTTOM NAVIGATION BAR FOR MOBILE */}
      <nav className="lg:hidden bg-[#FDFBF7] border-t border-[#E8E1D6] fixed bottom-0 left-0 right-0 z-40 grid grid-cols-6 py-2 shadow-lg">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex flex-col items-center justify-center p-1 cursor-pointer transition-colors ${
                isActive ? 'text-[#B8975A]' : 'text-[#77736E]'
              }`}
            >
              <IconComponent className="h-4.5 w-4.5" />
              <span className="text-[8px] font-semibold mt-1 tracking-tighter truncate max-w-full px-0.5 uppercase">
                {item.id === 'welcome' ? 'Home' : item.id === 'amenities' ? 'Suites' : item.id === 'concierge' ? 'Concierge' : item.id === 'local' ? 'Explore' : item.id === 'policies' ? 'Rules' : 'Wifi'}
              </span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
