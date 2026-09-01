import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Calendar, CheckSquare, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { POLICIES_LIST, PROPERTY_INFO } from './data';

export default function Policies() {
  const [checkoutItems, setCheckoutItems] = useState([
    { id: 'ac', text: 'Switch off all Split Air Conditioning split units to conserve energy', completed: false },
    { id: 'lights', text: 'Turn off unnecessary kitchen geysers, stovetops, and room lights', completed: false },
    { id: 'belongings', text: 'Double check all wardrobes, drawers, and TV outlets for personal chargers', completed: false },
    { id: 'trash', text: 'Dispose of any large garbage blocks in the integrated kitchen trash bin', completed: false },
    { id: 'keys', text: 'Drop off the physical suite card and lift passcode at the ground reception desk', completed: false }
  ]);

  const toggleItem = (id: string) => {
    setCheckoutItems(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = checkoutItems.filter(i => i.completed).length;
  const isDone = completedCount === checkoutItems.length;

  return (
    <div id="policies-section" className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h2 className="font-serif text-2xl font-medium text-stone-900">House Policies & Checkout Guide</h2>
        <p className="text-xs text-stone-500 font-light mt-1">
          To maintain our reliable luxury guarantee, we appreciate your cooperation in adhering to these established guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* House Rules Grid */}
        <div className="space-y-6">
          <h3 className="font-serif text-lg font-medium text-stone-900 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-gold-600" /> Core Property Rules
          </h3>

          <div className="space-y-4">
            {POLICIES_LIST.map((policy) => (
              <div
                key={policy.id}
                className={`rounded-xl border p-5 bg-white shadow-sm space-y-3 ${
                  policy.isStrict ? 'border-red-100 bg-red-50/5' : 'border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-semibold text-stone-950 flex items-center gap-2">
                    {policy.isStrict && (
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-500 shrink-0" />
                    )}
                    {policy.title}
                  </h4>
                  {policy.isStrict ? (
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-mono font-medium text-red-700 border border-red-100 uppercase tracking-wider">
                      Strict Policy
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-mono font-medium text-stone-600 uppercase tracking-wider">
                      Standard
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-700 font-light leading-relaxed">
                  {policy.description}
                </p>

                <div className="text-[11px] text-stone-500 bg-stone-50/80 border border-stone-100 p-3 rounded-lg leading-relaxed font-light">
                  <span className="font-semibold text-stone-700 block mb-0.5">Details & Enforcement:</span>
                  {policy.details}
                </div>
              </div>
            ))}

            {/* Additional Standard detail card */}
            <div className="rounded-xl border border-gold-100 bg-gold-50/20 p-5 space-y-2">
              <h4 className="font-serif text-sm font-semibold text-stone-900 flex items-center gap-1.5">
                <Info className="h-4.5 w-4.5 text-gold-600" /> Occupancy & Key Card Policy
              </h4>
              <ul className="list-disc pl-4 text-xs text-stone-600 font-light space-y-1.5 leading-relaxed">
                <li>
                  <strong className="font-semibold text-stone-800">Maximum Occupancy:</strong> Strictly 3 registered guests per suite.
                </li>
                <li>
                  <strong className="font-semibold text-stone-800">CCTV & Entry:</strong> Gate and complex entrance monitored 24/7 by CCTV security staff and active duty guards for resident families and expat protection.
                </li>
                <li>
                  <strong className="font-semibold text-stone-800">Keys:</strong> Lost suite cards carry a replacement fee of PKR 2,000.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Departure Assistant checklist */}
        <div className="rounded-xl border border-gold-200 bg-white p-6 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-medium text-stone-900 flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-gold-600" /> Interactive Checkout Checklist
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Standard Checkout is strictly at <strong className="font-semibold text-stone-800">{PROPERTY_INFO.checkOutTime}</strong>. Please check off these fast pre-departure steps to expedite your hand-back:
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-500 font-light">Pre-checkout progression</span>
              <span className="font-mono text-gold-600 font-bold">
                {completedCount} / {checkoutItems.length} ({Math.round((completedCount / checkoutItems.length) * 100)}%)
              </span>
            </div>
            <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-500 transition-all duration-300 rounded-full"
                style={{ width: `${(completedCount / checkoutItems.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Checklist list */}
          <div className="space-y-3 pt-2">
            {checkoutItems.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-start gap-3 p-3.5 rounded-lg border text-left cursor-pointer transition-all duration-200 ${
                  item.completed 
                    ? 'border-emerald-200 bg-emerald-50/10' 
                    : 'border-stone-100 bg-stone-50/50 hover:border-gold-200'
                }`}
              >
                <div className={`mt-0.5 h-4.5 w-4.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                  item.completed 
                    ? 'border-emerald-500 bg-emerald-500 text-white' 
                    : 'border-stone-300 bg-white'
                }`}>
                  {item.completed && (
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs leading-relaxed font-light ${
                  item.completed ? 'text-stone-500 line-through' : 'text-stone-800'
                }`}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>

          {/* Thank You message on completion */}
          {isDone ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center space-y-2"
            >
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle className="h-4 w-4" />
              </div>
              <h4 className="font-serif text-sm font-semibold text-emerald-900">Thank You For Your Care!</h4>
              <p className="text-[11px] text-emerald-800 font-light leading-relaxed max-w-sm mx-auto">
                All steps are successfully finished. Please hand your card back to our receptionist at the ground lobby. Safe travels from Zavari Haus management!
              </p>
            </motion.div>
          ) : (
            <div className="bg-stone-50 border border-stone-100 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-stone-800">Late Checkout?</h4>
                <p className="text-[11px] text-stone-500 font-light leading-normal">
                  If your flight or transit is later, please coordinate on WhatsApp at least 24 hours prior. Subject to incoming bookings, we always try our best to accommodate high-flyers.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
