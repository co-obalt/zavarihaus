import { useState } from 'react';
import { motion } from 'motion/react';
import { Wifi, Copy, Check, QrCode, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PROPERTY_INFO } from './data';

export default function WiFiCard() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedPass, setCopiedPass] = useState(false);

  const wifiData = PROPERTY_INFO.wifi;
  const password = wifiData.password || "Zavari@2026";
  
  const floorNetworks = [
    { floor: "1st Floor (Ground)", ssid: "Zavari Haus F1" },
    { floor: "2nd Floor", ssid: "Zavari Haus F2" },
    { floor: "3rd Floor", ssid: "Zavari Haus F3" },
    { floor: "4th Floor", ssid: "Zavari Haus F4" },
    { floor: "5th Floor (Skyview)", ssid: "Zavari Haus F5" },
  ];

  const copyNetworkName = (ssid: string, index: number) => {
    navigator.clipboard.writeText(ssid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  return (
    <div id="wifi-section" className="space-y-6">
      {/* Reassuring Banner */}
      <div className="rounded-xl border border-gold-200 bg-gradient-to-r from-gold-50/90 via-white to-gold-50/40 p-4 sm:p-5 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="bg-gold-500 text-white p-2.5 rounded-lg shrink-0 shadow-sm">
            <ShieldCheck className="h-5.5 w-5.5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900">
              Wi-Fi Connection Guide — All 5 Floors
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Each floor features a dedicated high-speed fiber-optic router for maximum speed and stability. All 5 floors share the exact same security password (<strong className="font-mono text-stone-900 font-bold">{password}</strong>). Simply copy and connect to the network name matching your floor.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Password + 5 Floor Networks List (8 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Password Box */}
          <div className="rounded-xl border-2 border-gold-300 bg-white p-4 sm:p-5 shadow-sm flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 font-bold block">
                Wi-Fi Password (Same for All Floors)
              </span>
              <span className="text-lg sm:text-2xl font-extrabold text-stone-900 font-mono tracking-wider block">
                {password}
              </span>
            </div>
            <button
              onClick={copyPassword}
              className="flex items-center gap-1.5 bg-gold-600 hover:bg-gold-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
            >
              {copiedPass ? (
                <>
                  <Check className="h-4 w-4 text-white" />
                  <span>Copied Password!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-white/90" />
                  <span>Copy Password</span>
                </>
              )}
            </button>
          </div>

          {/* 5 Floor Networks Direct List */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-gold-600" />
                <h4 className="font-serif text-sm font-semibold text-stone-900">
                  Select Your Floor Wi-Fi Name:
                </h4>
              </div>
              <span className="text-[10px] font-mono text-stone-400 uppercase">5 Dedicated Routers</span>
            </div>

            <div className="space-y-2">
              {floorNetworks.map((net, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-stone-100 bg-stone-50/80 hover:bg-gold-50/30 transition-colors p-3 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="h-7 w-7 rounded-full bg-stone-900 text-gold-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      F{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block leading-tight">
                        {net.floor}
                      </span>
                      <span className="text-sm font-bold text-stone-800 font-mono block truncate">
                        {net.ssid}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => copyNetworkName(net.ssid, idx)}
                    className="flex items-center gap-1.5 bg-white hover:bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-md text-xs font-semibold text-stone-700 transition-colors shadow-sm cursor-pointer shrink-0"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-stone-400" />
                        <span>Copy Name</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: QR Code + Quick Info (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm flex flex-col justify-between items-center text-center space-y-5">
          <div className="space-y-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600">
              <QrCode className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-stone-900">Instant Camera Scan</h3>
            <p className="text-xs text-stone-500 font-light max-w-xs leading-relaxed">
              Scan with your mobile camera for immediate automatic Wi-Fi setup.
            </p>
          </div>

          {/* QR Code Vector Illustration */}
          <div className="relative p-4 bg-stone-50 border border-stone-200/80 rounded-2xl shadow-inner group">
            <svg className="w-36 h-36 text-stone-900" viewBox="0 0 100 100" fill="currentColor">
              <rect x="5" y="5" width="25" height="25" rx="2" fill="currentColor" />
              <rect x="10" y="10" width="15" height="15" rx="1" fill="#fff" />
              <rect x="13" y="13" width="9" height="9" rx="0.5" fill="currentColor" />

              <rect x="70" y="5" width="25" height="25" rx="2" fill="currentColor" />
              <rect x="75" y="10" width="15" height="15" rx="1" fill="#fff" />
              <rect x="78" y="13" width="9" height="9" rx="0.5" fill="currentColor" />

              <rect x="5" y="70" width="25" height="25" rx="2" fill="currentColor" />
              <rect x="10" y="75" width="15" height="15" rx="1" fill="#fff" />
              <rect x="13" y="78" width="9" height="9" rx="0.5" fill="currentColor" />

              <rect x="75" y="75" width="10" height="10" rx="1" fill="currentColor" />
              <rect x="78" y="78" width="4" height="4" rx="0.5" fill="#fff" />
              <rect x="79" y="79" width="2" height="2" fill="currentColor" />

              <rect x="36" y="5" width="6" height="6" rx="1" />
              <rect x="48" y="8" width="8" height="4" rx="0.5" />
              <rect x="60" y="5" width="4" height="10" rx="1" />
              <rect x="36" y="18" width="12" height="6" rx="1" />
              <rect x="52" y="22" width="6" height="6" rx="0.5" />
              <rect x="62" y="20" width="4" height="4" rx="1" />

              <rect x="5" y="36" width="10" height="6" rx="1" />
              <rect x="20" y="36" width="6" height="12" rx="0.5" />
              <rect x="30" y="42" width="8" height="6" rx="1" />
              <rect x="44" y="34" width="14" height="4" rx="0.5" />
              <rect x="44" y="42" width="6" height="14" rx="1" />
              <rect x="56" y="40" width="8" height="8" rx="0.5" />

              <rect x="70" y="36" width="6" height="8" rx="0.5" />
              <rect x="80" y="36" width="12" height="4" rx="1" />
              <rect x="76" y="46" width="6" height="12" rx="0.5" />

              <rect x="5" y="52" width="8" height="4" rx="0.5" />
              <rect x="18" y="52" width="12" height="12" rx="1" />
              <rect x="18" y="56" width="4" height="4" fill="#fff" />
              <rect x="36" y="62" width="4" height="12" rx="0.5" />
              <rect x="44" y="60" width="16" height="6" rx="1" />
              <rect x="48" y="72" width="10" height="4" rx="0.5" />
              <rect x="64" y="64" width="8" height="8" rx="1" />
              <rect x="64" y="76" width="6" height="12" rx="0.5" />
              <rect x="76" y="64" width="14" height="4" rx="1" />
              <rect x="90" y="72" width="4" height="10" rx="0.5" />
              <rect x="88" y="86" width="6" height="6" rx="1" />

              <rect x="40" y="40" width="20" height="20" rx="4" fill="#fff" stroke="#d5b169" strokeWidth="2" />
              <path d="M46,47 A6,6 0 0,1 54,47 M48,50 A3,3 0 0,1 52,50 M50,53 A0.5,0.5 0 0,1 50,53.5" stroke="#c5a059" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="bg-stone-50 border border-stone-100 p-3 rounded-lg text-left text-xs text-stone-600 space-y-1 w-full">
            <div className="flex items-center gap-1.5 font-semibold text-stone-800">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Full Gigabit Speed</span>
            </div>
            <p className="text-[11px] font-light text-stone-500">
              Supports 4K video conferencing, Netflix streaming, and high-speed VPN connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
