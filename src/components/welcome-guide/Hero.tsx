import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Users, ArrowRight, CheckCircle, ChevronRight, Compass } from 'lucide-react';
import { PROPERTY_INFO, IMAGES, ACCESS_STEPS } from './data';

interface HeroProps {
  onNavigate: (tab: string) => void;
  checkInStatus: string;
  setCheckInStatus: (status: 'idle' | 'in_progress' | 'completed') => void;
  selectedSuite: string;
  setSelectedSuite: (suite: string) => void;
}

export default function Hero({ onNavigate, checkInStatus, setCheckInStatus, selectedSuite, setSelectedSuite }: HeroProps) {
  const [lahoreTime, setLahoreTime] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  // Update Lahore Time (UTC + 5)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Calculate UTC time, then add 5 hours for Pakistan Standard Time (PKT)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const pktTime = new Date(utc + (3600000 * 5));
      
      const formatted = pktTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setLahoreTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNextStep = () => {
    if (activeStep < ACCESS_STEPS.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      setCheckInStatus('completed');
    }
  };

  const resetCheckIn = () => {
    setCheckInStatus('idle');
    setActiveStep(0);
  };

  return (
    <div id="hero-section" className="space-y-8">
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-gold-200/50 bg-stone-900 text-stone-100 shadow-xl">
        {/* Background Image with Dark Golden Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.hero}
            alt="Zavari Haus Luxury Suite"
            className="h-full w-full object-cover opacity-35 transition-transform duration-1000 hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-end p-6 sm:p-10 md:min-h-[380px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-gold-900/40 px-3.5 py-1 text-xs font-medium tracking-wide uppercase text-gold-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500"></span>
              </span>
              Boutique Luxury Suites
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
              {PROPERTY_INFO.name}
            </h1>
            
            <p className="font-serif text-lg sm:text-xl italic text-gold-200/90 font-light tracking-wide">
              &ldquo;{PROPERTY_INFO.tagline}&rdquo;
            </p>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              {PROPERTY_INFO.description}
            </p>

            {/* Quick Stats Block */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-800/80">
              <div className="space-y-1">
                <span className="block text-[10px] font-mono tracking-widest uppercase text-stone-400">Location</span>
                <span className="text-xs sm:text-sm font-medium text-stone-200">Bahria Town, Lahore</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-mono tracking-widest uppercase text-stone-400">Suites Count</span>
                <span className="text-xs sm:text-sm font-medium text-stone-200">12 Premium Units</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-mono tracking-widest uppercase text-stone-400">Max Occupancy</span>
                <span className="text-xs sm:text-sm font-medium text-stone-200">3 Guests per Suite</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-mono tracking-widest uppercase text-stone-400">Times</span>
                <span className="text-xs sm:text-sm font-medium text-stone-200">In 12 PM | Out 11 AM</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Info Quick-Cards Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Real-time Status Card */}
        <div className="rounded-xl border border-gold-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-stone-900">Lahore local time</h3>
            <Clock className="h-5 w-5 text-gold-600" />
          </div>
          <div className="py-2">
            <div className="font-mono text-3xl font-semibold tracking-tight text-stone-900 bg-stone-50 border border-stone-100 rounded-lg py-2.5 px-4 text-center">
              {lahoreTime || 'Loading...'}
            </div>
            <p className="text-center text-[11px] text-stone-500 mt-2 font-light">
              Pakistan Standard Time (GMT+5)
            </p>
          </div>
          <div className="border-t border-stone-100 pt-3 space-y-2">
            <div className="flex justify-between text-xs text-stone-600">
              <span className="font-light">Address:</span>
              <span className="font-semibold text-right max-w-[150px] truncate" title={PROPERTY_INFO.address}>
                Nishter Block, Bahria Town
              </span>
            </div>
            <div className="flex justify-between text-xs text-stone-600">
              <span className="font-light">Distance to Eiffel:</span>
              <span className="font-semibold text-gold-600">2 Mins Walk (Adjacent)</span>
            </div>
          </div>
        </div>

        {/* Suite Selection & Details */}
        <div className="rounded-xl border border-gold-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg font-medium text-stone-900">Your Boutique Suite</h3>
              <Users className="h-5 w-5 text-gold-600" />
            </div>
            <p className="text-xs text-stone-500 font-light mb-4">
              Select your booked boutique suite to personalize the digital guide instructions.
            </p>
            <div className="space-y-2">
              <select
                value={selectedSuite}
                onChange={(e) => setSelectedSuite(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-medium text-stone-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none"
              >
                <option value="Skyview Suite F1">F1 - Skyview Suite (Floor 1)</option>
                <option value="Sunset Suite F2">F2 - Sunset Suite (Floor 2)</option>
                <option value="Skyview Suite F3">F3 - Skyview Suite (Floor 3)</option>
                <option value="Sunset Suite F4">F4 - Sunset Suite (Floor 4)</option>
                <option value="Royal Skyview Suite F5">F5 - Royal Skyview Suite (Floor 5)</option>
                <option value="Executive Suite G1">G1 - Executive Suite (Ground Floor)</option>
              </select>
              <div className="p-3 bg-gold-50/50 rounded-lg border border-gold-100/50 text-xs text-gold-800 space-y-1">
                <p className="font-medium">
                  {selectedSuite.includes('Skyview') ? 'Skyview Premium' : selectedSuite.includes('Sunset') ? 'Sunset Premium' : 'Boutique Luxury'} Suite
                </p>
                <p className="text-[11px] text-stone-600 font-light">
                  {selectedSuite.includes('Skyview') 
                    ? 'Features panoramic views of the illuminated Eiffel replica.' 
                    : 'Features gorgeous sunset twilight views of the Bahria skyline.'}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-100 pt-3 flex justify-between items-center mt-3">
            <span className="text-xs text-stone-500 font-light">Need WIFI?</span>
            <button
              onClick={() => onNavigate('wifi')}
              className="text-xs font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              Connect Wifi <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Map & Perks Card */}
        <div className="rounded-xl border border-gold-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-medium text-stone-900">Prime Location</h3>
              <MapPin className="h-5 w-5 text-gold-600" />
            </div>
            <div className="relative h-28 w-full rounded-lg overflow-hidden border border-stone-100 bg-stone-100">
              <img
                src={IMAGES.eiffel}
                alt="Eiffel Tower Lahore"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-950/20" />
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm rounded-md px-2 py-1 text-[10px] text-stone-800 flex justify-between items-center shadow-md">
                <span className="font-medium truncate">Eiffel Tower Replica</span>
                <span className="font-mono text-gold-700 font-bold shrink-0">Adjacent (2m walk)</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              We are steps from **Eiffel Tower**, **Theme Park**, **Winter Land**, and upscale strip malls.
            </p>
          </div>
          <button
            onClick={() => onNavigate('local')}
            className="w-full mt-3 border border-gold-200 text-gold-700 hover:bg-gold-50 px-4 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Compass className="h-4 w-4" /> Explore Nearby Spots
          </button>
        </div>

      </div>

      {/* Stepper Assistant */}
      <div className="rounded-xl border border-gold-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-4 mb-6 gap-3">
          <div>
            <h2 className="font-serif text-xl font-medium text-stone-900">Arrival & Check-In Guide</h2>
            <p className="text-xs text-stone-500 font-light">
              Follow this step-by-step sequence for seamless arrival, parking, and suite entry.
            </p>
          </div>
          <div>
            {checkInStatus === 'completed' ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 border border-emerald-100">
                <CheckCircle className="h-3.5 w-3.5" /> Checked In Successfully
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-gold-800 border border-gold-200">
                Arrival Guide
              </span>
            )}
          </div>
        </div>

        {checkInStatus !== 'completed' ? (
          <div className="space-y-6">
            {/* Steps visual dots progress */}
            <div className="flex items-center justify-between max-w-xl mx-auto">
              {ACCESS_STEPS.map((step, idx) => (
                <div key={idx} className="flex items-center flex-1 last:flex-initial">
                  <div className="flex flex-col items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                      idx === activeStep 
                        ? 'bg-gold-600 text-white ring-4 ring-gold-100' 
                        : idx < activeStep 
                        ? 'bg-gold-100 text-gold-700 border border-gold-200' 
                        : 'bg-stone-100 text-stone-400 border border-stone-200'
                    }`}>
                      {idx < activeStep ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                    </div>
                  </div>
                  {idx < ACCESS_STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 transition-all duration-500 ${
                      idx < activeStep ? 'bg-gold-500' : 'bg-stone-100'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Current step explanation */}
            <div className="bg-stone-50 border border-stone-100 rounded-xl p-5 max-w-xl mx-auto space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-white border border-gold-200 p-2.5 rounded-lg shadow-sm shrink-0">
                  <span className="text-stone-700 font-mono text-xs font-bold uppercase block text-center mb-1">Step</span>
                  <span className="text-xl font-bold text-gold-600 block text-center leading-none">{activeStep + 1}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-semibold text-stone-900">
                    {ACCESS_STEPS[activeStep].title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {ACCESS_STEPS[activeStep].description}
                  </p>
                </div>
              </div>

              {activeStep === 2 && (
                <div className="bg-gold-50/70 border border-gold-200/80 rounded-lg p-3 text-xs text-stone-800 space-y-1">
                  <p className="font-semibold text-gold-900">🔑 Elevator Keycode Access:</p>
                  <p className="font-mono text-xs font-bold text-stone-900">
                    Lift Passcode: <span className="bg-white border border-gold-300 px-2 py-0.5 rounded text-gold-800">0440#</span>
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  disabled={activeStep === 0}
                  className="text-xs text-stone-500 hover:text-stone-800 disabled:opacity-40 font-medium transition-opacity cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                >
                  {activeStep === ACCESS_STEPS.length - 1 ? 'Finish Guide' : 'Next Step'} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Check in completed state */
          <div className="bg-stone-50 border border-stone-100 rounded-xl p-6 text-center max-w-lg mx-auto space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-medium text-stone-900">Enjoy Your Stay at Zavari Haus</h4>
              <p className="text-xs text-stone-600 font-light max-w-sm mx-auto leading-relaxed">
                You have initialized your stay! Your suite (**{selectedSuite}**) is ready, climate controls are set, and high-speed Wi-Fi is active.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <button
                onClick={() => onNavigate('wifi')}
                className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Access Wifi Credentials
              </button>
              <button
                onClick={resetCheckIn}
                className="border border-stone-200 text-stone-600 hover:bg-stone-100 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Reset Arrival Assistant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
