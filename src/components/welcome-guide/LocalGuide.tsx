import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, MapPin, Landmark, ShoppingBag, FerrisWheel, Snowflake, ExternalLink, Check, ChevronRight } from 'lucide-react';
import { LOCAL_SPOTS, IMAGES, PROPERTY_INFO } from './data';

export default function LocalGuide() {
  const [selectedSpotId, setSelectedSpotId] = useState<string>('eiffel');

  const getSpotIcon = (category: string) => {
    switch (category) {
      case 'landmark':
        return <Landmark className="h-5 w-5 text-gold-600" />;
      case 'leisure':
        return <FerrisWheel className="h-5 w-5 text-gold-600" />;
      case 'shopping':
        return <ShoppingBag className="h-5 w-5 text-gold-600" />;
      default:
        return <Compass className="h-5 w-5 text-gold-600" />;
    }
  };

  const selectedSpot = LOCAL_SPOTS.find(spot => spot.id === selectedSpotId) || LOCAL_SPOTS[0];

  return (
    <div id="local-guide-section" className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h2 className="font-serif text-2xl font-medium text-stone-900">Local Area & Bahria Town Guide</h2>
        <p className="text-xs text-stone-500 font-light mt-1">
          Zavari Haus is situated directly adjacent to Bahria Lahore's central attractions. Explore curated landmarks, leisure spots, and gourmet strip malls.
        </p>
      </div>

      {/* Hero landmark banner */}
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden border border-gold-200 shadow-sm">
        <img
          src={IMAGES.eiffel}
          alt="Bahria Eiffel Tower replica"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-stone-950/20" />
        <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-stone-900">
            Adjacent Landmark
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold">The Bahria Eiffel Tower Replica</h3>
          <p className="text-xs text-stone-200 font-light max-w-xl">
            Just a 2-minute walk from our door. This spectacular 80-meter monument lights up Lahore's night skyline with beautiful neon sequences.
          </p>
        </div>
      </div>

      {/* Main Attraction layout (Left list, Right active showcase) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column (Col 1-2): Vertical Quick-Select Cards */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {LOCAL_SPOTS.map((spot) => (
            <button
              key={spot.id}
              onClick={() => {
                setSelectedSpotId(spot.id);
              }}
              className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all duration-300 w-full flex items-center justify-between ${
                spot.id === selectedSpotId
                  ? 'border-gold-400 bg-gold-50/25 ring-1 ring-gold-200'
                  : 'border-stone-100 bg-stone-50 hover:bg-stone-100/50 hover:border-stone-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded ${
                  spot.id === selectedSpotId ? 'bg-gold-100 text-gold-700' : 'bg-stone-100 text-stone-500'
                }`}>
                  {spot.id === 'eiffel' && <Landmark className="h-4.5 w-4.5" />}
                  {spot.id === 'themepark' && <FerrisWheel className="h-4.5 w-4.5" />}
                  {spot.id === 'winterland' && <Snowflake className="h-4.5 w-4.5" />}
                  {spot.id === 'malls' && <ShoppingBag className="h-4.5 w-4.5" />}
                </div>
                <div>
                  <span className="block text-xs font-semibold text-stone-800">{spot.name}</span>
                  <span className="block text-[10px] text-stone-400 mt-0.5 font-mono">{spot.distance}</span>
                </div>
              </div>
              <ChevronRight className={`h-4 w-4 text-stone-400 transition-transform ${spot.id === selectedSpotId ? 'transform translate-x-1 text-gold-600' : ''}`} />
            </button>
          ))}
        </div>

        {/* Right Column (Col 3-5): Active Details Card */}
        <div className="lg:col-span-3 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSpot.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-gold-200 bg-white p-6 shadow-sm space-y-4 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold-50 text-gold-600 rounded-lg border border-gold-100 shadow-sm">
                      {getSpotIcon(selectedSpot.category)}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">{selectedSpot.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 font-light">
                        <MapPin className="h-3.5 w-3.5 text-stone-400" />
                        <span>{selectedSpot.distance}</span>
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex self-start sm:self-center items-center rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-mono font-medium text-stone-600 uppercase tracking-wider">
                    {selectedSpot.category}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed font-light font-sans">
                  {selectedSpot.description}
                </p>

                {/* Bullet points highlights */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block">
                    Highlights & Features
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedSpot.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-light bg-stone-50 p-2 rounded border border-stone-100/50">
                        <div className="h-4 w-4 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5" />
                        </div>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Directions Button */}
              <div className="border-t border-stone-100 pt-4 flex flex-col sm:flex-row gap-3 justify-between sm:items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-stone-400">Nishtar Block, Bahria Town Lahore</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={selectedSpot.mapDirectUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedSpot.name + " " + PROPERTY_INFO.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold py-2.5 px-5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    Get Real Directions <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Map (Bottom part, horizontal, larger) */}
      <div className="rounded-xl border border-gold-200 bg-white p-5 shadow-sm space-y-4">
        <div className="space-y-1">
          <h4 className="font-serif text-base font-semibold text-stone-900">Area & Location Map</h4>
          <p className="text-[11px] text-stone-500 font-light leading-relaxed">
            Interactive map showing <span className="text-gold-600 font-semibold">{selectedSpot.name}</span>, located <span className="text-gold-600 font-semibold">{selectedSpot.distance}</span> from Zavari Haus.
          </p>
        </div>

        {/* Interactive Map Box */}
        <div className="relative bg-stone-50 border border-stone-100 rounded-xl overflow-hidden h-72 md:h-96 w-full shadow-xs">
          {selectedSpot.mapEmbedUrl ? (
            <iframe
              src={selectedSpot.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              id="embedded-spot-map"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center space-y-2">
              <MapPin className="h-8 w-8 text-gold-500 animate-bounce" />
              <span className="text-xs text-stone-500 font-light">Interactive map loading...</span>
            </div>
          )}
        </div>

        <div className="bg-stone-900/95 text-[10px] text-stone-300 py-2 px-4 rounded-lg border border-stone-800 text-center">
          <span>Zavari Haus: <span className="text-gold-400 font-semibold">Nishtar Block, Bahria Town Lahore</span></span>
        </div>
      </div>
    </div>
  );
}
