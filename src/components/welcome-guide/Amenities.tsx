import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, Snowflake, Tv, Shirt, ChevronDown, ChevronUp, Check, Info } from 'lucide-react';
import { AMENITIES_LIST } from './data';

export default function Amenities() {
  const [expandedId, setExpandedId] = useState<string | null>('kitchen');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'ChefHat':
        return <ChefHat className="h-6 w-6 text-gold-600" />;
      case 'Snowflake':
        return <Snowflake className="h-6 w-6 text-gold-600" />;
      case 'Tv':
        return <Tv className="h-6 w-6 text-gold-600" />;
      case 'Shirt':
        return <Shirt className="h-6 w-6 text-gold-600" />;
      default:
        return <ChefHat className="h-6 w-6 text-gold-600" />;
    }
  };

  return (
    <div id="amenities-section" className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h2 className="font-serif text-2xl font-medium text-stone-900">Amenities & Quick How-To Guides</h2>
        <p className="text-xs text-stone-500 font-light mt-1">
          Each suite is treated as a curated cinematic set. Below are simple operational guidelines for climate control, kitchens, and streaming.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Expanded Details Accordion */}
        <div className="lg:col-span-2 space-y-4">
          {AMENITIES_LIST.map((amenity) => {
            const isExpanded = expandedId === amenity.id;
            return (
              <div
                key={amenity.id}
                className={`rounded-xl border transition-all duration-300 bg-white shadow-sm overflow-hidden ${
                  isExpanded ? 'border-gold-300 ring-1 ring-gold-200' : 'border-stone-200/80 hover:border-gold-200'
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleExpand(amenity.id)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-gold-50/70 rounded-lg border border-gold-100">
                      {getIcon(amenity.iconName)}
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-stone-900">{amenity.name}</h3>
                      <p className="text-xs text-stone-500 font-light mt-0.5 max-w-sm sm:max-w-md truncate">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                  <div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-stone-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-stone-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Content with AnimatePresence */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-stone-100 bg-stone-50/40 space-y-4">
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block mb-1">
                            Operational Instructions
                          </span>
                          {amenity.instructions.map((inst, index) => {
                            const parts = inst.split(': ');
                            const title = parts[0];
                            const text = parts[1];
                            return (
                              <div key={index} className="flex items-start gap-2.5">
                                <div className="h-5 w-5 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="h-3 w-3" />
                                </div>
                                <p className="text-xs text-stone-700 font-light leading-relaxed">
                                  {text ? (
                                    <>
                                      <strong className="font-semibold text-stone-900">{title}:</strong> {text}
                                    </>
                                  ) : (
                                    inst
                                  )}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        {amenity.id === 'housekeeping' && (
                          <div className="bg-amber-50/40 border border-amber-200/50 rounded-lg p-3 text-xs text-stone-700 flex gap-2">
                            <Info className="h-4.5 w-4.5 text-gold-600 shrink-0 mt-0.5" />
                            <p className="font-light leading-normal">
                              Daily standard room sweeping, trash collection, and towel replenishments are executed by our certified housekeepers between <strong className="font-semibold text-stone-900">11:00 AM and 3:00 PM</strong>. Please toggle your &ldquo;Privacy/Do Not Disturb&rdquo; suite indicator if you prefer to skip a service.
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Sidebar Tips Card */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gold-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-medium text-stone-900">Quick Guide Checklist</h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Zavari Haus prides itself on providing a reliable, luxurious guarantee. Review this simple summary to keep things running optimally during your stay:
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-gold-500 mt-2 shrink-0" />
                <div className="space-y-0.5">
                  <span className="block text-xs font-semibold text-stone-800">AC Remote Location</span>
                  <span className="block text-[11px] text-stone-500 font-light">Mounted in wall sleeves next to the desk.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-gold-500 mt-2 shrink-0" />
                <div className="space-y-0.5">
                  <span className="block text-xs font-semibold text-stone-800">Geyser Activation</span>
                  <span className="block text-[11px] text-stone-500 font-light">Turn on switch outside washroom 10 minutes prior to use.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-gold-500 mt-2 shrink-0" />
                <div className="space-y-0.5">
                  <span className="block text-xs font-semibold text-stone-800">Ironing & Laundry</span>
                  <span className="block text-[11px] text-stone-500 font-light">Strictly on-demand. Contact 24/7 Digital Concierge.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-gold-500 mt-2 shrink-0" />
                <div className="space-y-0.5">
                  <span className="block text-xs font-semibold text-stone-800">Smart TV Profiles</span>
                  <span className="block text-[11px] text-stone-500 font-light">Pre-connected to WiFi. Log out of accounts upon checkout.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-stone-900 border border-stone-800 p-6 text-white text-center space-y-3">
            <h4 className="font-serif text-base font-medium text-gold-300">Gilded Minimalism Vibe</h4>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              &ldquo;Luxury is not the addition of noise, but the reduction of clutter.&rdquo;
            </p>
            <div className="h-px bg-stone-800 w-16 mx-auto" />
            <p className="text-[11px] text-stone-500 font-mono tracking-widest uppercase">
              Curated Cinematic Sets
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
