import React, { useState } from 'react';

interface MonumentInfo {
  id: string;
  name: string;
  location: string;
  era: string;
}

const MONUMENTS: Record<string, MonumentInfo> = {
  qutub: {
    id: 'qutub',
    name: 'Qutub Minar',
    location: 'Delhi',
    era: '1192 CE · Fluted Sandstone & Marble'
  },
  pavilion: {
    id: 'pavilion',
    name: 'Heritage Pavilion',
    location: 'Rajasthan',
    era: 'Classical Indian Stone Colonnade'
  },
  masjid: {
    id: 'masjid',
    name: 'Jama Masjid',
    location: 'Old Delhi',
    era: '1656 CE · Striped Marble & Sandstone'
  },
  indiagate: {
    id: 'indiagate',
    name: 'India Gate',
    location: 'New Delhi',
    era: '1931 CE · Monolithic Sandstone Arch'
  },
  taj: {
    id: 'taj',
    name: 'Taj Mahal',
    location: 'Agra',
    era: '1648 CE · White Makrana Marble'
  },
  gateway: {
    id: 'gateway',
    name: 'Buland Darwaza',
    location: 'Fatehpur Sikri',
    era: '1601 CE · Monumental Victory Gateway'
  },
  redfort: {
    id: 'redfort',
    name: 'Red Fort Ramparts',
    location: 'Delhi',
    era: '1648 CE · Fortified Red Sandstone'
  }
};

export const ArchitecturalSkyline: React.FC = () => {
  const [activeMonument, setActiveMonument] = useState<MonumentInfo | null>(null);

  return (
    <div className="skyline-wrapper" aria-label="Indian Architectural Heritage Skyline Illustration">
      {/* Floating Active Monument Tooltip Badge */}
      <div className={`skyline-tooltip ${activeMonument ? 'is-visible' : ''}`} aria-live="polite">
        {activeMonument && (
          <>
            <span className="tooltip-title">{activeMonument.name}</span>
            <span className="tooltip-loc">{activeMonument.location} · {activeMonument.era}</span>
          </>
        )}
      </div>

      {/* SVG Panoramic Skyline */}
      <svg
        className="skyline-svg"
        viewBox="0 0 1440 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYEnd meet"
      >
        <defs>
          {/* Subtle Ambient Dawn Sky Glow */}
          <linearGradient id="skyGlow" x1="720" y1="0" x2="720" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#151614" stopOpacity="0" />
            <stop offset="60%" stopColor="#2A241F" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4A3B30" stopOpacity="0.65" />
          </linearGradient>

          {/* Warm Sandstone & Terracotta Gradients */}
          <linearGradient id="qutubGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C47353" />
            <stop offset="50%" stopColor="#D98868" />
            <stop offset="100%" stopColor="#A8573A" />
          </linearGradient>

          <linearGradient id="indiaGateGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D69A68" />
            <stop offset="50%" stopColor="#E5B285" />
            <stop offset="100%" stopColor="#BA7B48" />
          </linearGradient>

          <linearGradient id="tajGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#EBE5DC" />
            <stop offset="100%" stopColor="#D4CCC1" />
          </linearGradient>

          <linearGradient id="redFortGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A03636" />
            <stop offset="50%" stopColor="#BA4242" />
            <stop offset="100%" stopColor="#822525" />
          </linearGradient>

          <linearGradient id="sandstoneGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D8C8B4" />
            <stop offset="100%" stopColor="#B39F89" />
          </linearGradient>

          <linearGradient id="softGroundGrad" x1="0" y1="270" x2="0" y2="280">
            <stop offset="0%" stopColor="#1F201D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#151614" />
          </linearGradient>

          {/* Monument Shading Filter */}
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* 0. Ambient Sky Horizon Backdrop */}
        <rect x="0" y="0" width="1440" height="280" fill="url(#skyGlow)" />

        {/* Ambient Drifting Clouds in Background */}
        <g className="skyline-clouds" opacity="0.35">
          <path
            d="M120 70 C130 55, 160 55, 175 65 C185 58, 210 58, 220 70 C235 70, 245 82, 240 95 C235 105, 115 105, 110 95 C105 85, 112 72, 120 70 Z"
            fill="#D8C8B4"
            className="cloud cloud-slow"
          />
          <path
            d="M620 50 C632 38, 658 38, 670 48 C680 40, 705 40, 715 50 C728 50, 738 60, 732 72 C725 82, 615 82, 610 72 C605 62, 612 52, 620 50 Z"
            fill="#EADBC8"
            className="cloud cloud-medium"
          />
          <path
            d="M1120 65 C1132 52, 1160 52, 1172 62 C1182 54, 1208 54, 1218 64 C1232 64, 1242 75, 1235 88 C1228 98, 1115 98, 1110 88 C1105 78, 1112 67, 1120 65 Z"
            fill="#D8C8B4"
            className="cloud cloud-fast"
          />
        </g>

        {/* ===================================================================
            MONUMENT 1: QUTUB MINAR (Left: x = 30 to 125, y = 30 to 280)
            =================================================================== */}
        <g
          className="monument-group monument-qutub"
          onMouseEnter={() => setActiveMonument(MONUMENTS.qutub)}
          onMouseLeave={() => setActiveMonument(null)}
          role="button"
          tabIndex={0}
          aria-label="Qutub Minar"
        >
          {/* Base Plinth */}
          <rect x="52" y="255" width="56" height="25" rx="2" fill="#8B4228" />
          <rect x="56" y="245" width="48" height="10" fill="#A8573A" />
          <polygon points="56,245 104,245 100,210 60,210" fill="url(#qutubGrad)" />
          {/* Tier 1 Balcony */}
          <rect x="55" y="206" width="50" height="5" rx="1.5" fill="#5E2B1A" />
          <rect x="57" y="202" width="46" height="4" fill="#E8B49E" />
          {/* Tier 2 */}
          <polygon points="62,202 98,202 95,160 65,160" fill="url(#qutubGrad)" />
          {/* Tier 2 Vertical Fluting Grooves */}
          <line x1="72" y1="202" x2="74" y2="160" stroke="#7D3219" strokeWidth="1.5" opacity="0.6" />
          <line x1="80" y1="202" x2="80" y2="160" stroke="#7D3219" strokeWidth="1.5" opacity="0.6" />
          <line x1="88" y1="202" x2="86" y2="160" stroke="#7D3219" strokeWidth="1.5" opacity="0.6" />
          {/* Tier 2 Balcony */}
          <rect x="61" y="156" width="38" height="4.5" rx="1" fill="#5E2B1A" />
          <rect x="63" y="153" width="34" height="3" fill="#FAF8F5" />
          {/* Tier 3 (White Marble & Sandstone) */}
          <polygon points="66,153 94,153 91,115 69,115" fill="#EADBC8" />
          <rect x="66" y="112" width="28" height="4" rx="1" fill="#8B4228" />
          {/* Tier 4 */}
          <polygon points="70,112 90,112 88,75 72,75" fill="url(#qutubGrad)" />
          <rect x="69" y="72" width="22" height="3.5" rx="1" fill="#5E2B1A" />
          {/* Tier 5 Top Spire & Cupola */}
          <polygon points="73,72 87,72 85,45 75,45" fill="#EADBC8" />
          <path d="M75,45 Q80,32 85,45 Z" fill="#A8573A" />
          <line x1="80" y1="32" x2="80" y2="24" stroke="#D8C8B4" strokeWidth="1.5" />
          <circle cx="80" cy="23" r="2" fill="#D8C8B4" />
        </g>

        {/* ===================================================================
            MONUMENT 2: HERITAGE STONE PAVILION (x = 135 to 240, y = 145 to 280)
            =================================================================== */}
        <g
          className="monument-group monument-pavilion"
          onMouseEnter={() => setActiveMonument(MONUMENTS.pavilion)}
          onMouseLeave={() => setActiveMonument(null)}
          role="button"
          tabIndex={0}
          aria-label="Heritage Stone Pavilion"
        >
          {/* Base */}
          <rect x="135" y="245" width="105" height="35" rx="2" fill="#C98642" />
          <rect x="140" y="240" width="95" height="6" fill="#E5A96A" />
          {/* Central Deep Arch */}
          <path d="M165,245 L165,195 Q187.5,170 210,195 L210,245 Z" fill="#5A2E12" />
          {/* Left / Right Pillars */}
          <rect x="145" y="185" width="12" height="55" fill="#E5B285" />
          <rect x="218" y="185" width="12" height="55" fill="#E5B285" />
          {/* Cornice Beam */}
          <rect x="138" y="178" width="99" height="8" rx="1" fill="#A05A20" />
          <polygon points="135,178 240,178 235,165 140,165" fill="#C98642" />
          {/* Mini Dome */}
          <path d="M168,165 Q187.5,138 207,165 Z" fill="#E5A96A" />
          <line x1="187.5" y1="138" x2="187.5" y2="130" stroke="#FAF8F5" strokeWidth="1.5" />
          <circle cx="187.5" cy="129" r="1.8" fill="#FAF8F5" />
        </g>

        {/* ===================================================================
            MONUMENT 3: JAMA MASJID / GRAND DOMES (x = 245 to 475, y = 85 to 280)
            =================================================================== */}
        <g
          className="monument-group monument-masjid"
          onMouseEnter={() => setActiveMonument(MONUMENTS.masjid)}
          onMouseLeave={() => setActiveMonument(null)}
          role="button"
          tabIndex={0}
          aria-label="Jama Masjid"
        >
          {/* Main Sanctuary Hall */}
          <rect x="270" y="170" width="180" height="110" fill="#9C3A28" />
          <rect x="275" y="165" width="170" height="6" fill="#C45A45" />

          {/* Central Grand Pishtaq Archway */}
          <path d="M335,280 L335,190 Q360,165 385,190 L385,280 Z" fill="#42140C" />
          <path d="M342,280 L342,205 Q360,185 378,205 L378,280 Z" fill="#220804" />
          {/* Flanking Arches */}
          <path d="M290,280 L290,215 Q305,200 320,215 L320,280 Z" fill="#42140C" />
          <path d="M400,280 L400,215 Q415,200 430,215 L430,280 Z" fill="#42140C" />

          {/* Central Grand Onion Dome (White & Black Striped Marble) */}
          <ellipse cx="360" cy="138" rx="30" ry="34" fill="#FAF8F5" />
          <path d="M340,162 Q360,105 380,162 Z" fill="#FFFFFF" />
          {/* Dome Stripes */}
          <path d="M352,162 Q360,108 360,162" stroke="#5E2B1A" strokeWidth="2.5" fill="none" opacity="0.6" />
          <path d="M368,162 Q360,108 360,162" stroke="#5E2B1A" strokeWidth="2.5" fill="none" opacity="0.6" />
          <line x1="360" y1="104" x2="360" y2="88" stroke="#D8C8B4" strokeWidth="2" />
          <circle cx="360" cy="87" r="2.5" fill="#C2A87E" />

          {/* Left Flanking Dome */}
          <ellipse cx="305" cy="148" rx="20" ry="24" fill="#FAF8F5" />
          <line x1="305" y1="124" x2="305" y2="112" stroke="#D8C8B4" strokeWidth="1.5" />
          <circle cx="305" cy="111" r="2" fill="#C2A87E" />

          {/* Right Flanking Dome */}
          <ellipse cx="415" cy="148" rx="20" ry="24" fill="#FAF8F5" />
          <line x1="415" y1="124" x2="415" y2="112" stroke="#D8C8B4" strokeWidth="1.5" />
          <circle cx="415" cy="111" r="2" fill="#C2A87E" />

          {/* Left Towering Octagonal Minaret */}
          <rect x="255" y="105" width="16" height="175" fill="#8B2F1F" />
          <rect x="253" y="100" width="20" height="6" fill="#C45A45" />
          {/* Minaret Chattri */}
          <rect x="257" y="85" width="12" height="15" fill="#FAF8F5" />
          <path d="M255,85 Q263,72 271,85 Z" fill="#8B2F1F" />
          <line x1="263" y1="72" x2="263" y2="64" stroke="#D8C8B4" strokeWidth="1.5" />

          {/* Right Towering Octagonal Minaret */}
          <rect x="449" y="105" width="16" height="175" fill="#8B2F1F" />
          <rect x="447" y="100" width="20" height="6" fill="#C45A45" />
          {/* Minaret Chattri */}
          <rect x="451" y="85" width="12" height="15" fill="#FAF8F5" />
          <path d="M449,85 Q457,72 465,85 Z" fill="#8B2F1F" />
          <line x1="457" y1="72" x2="457" y2="64" stroke="#D8C8B4" strokeWidth="1.5" />
        </g>

        {/* ===================================================================
            MONUMENT 4: INDIA GATE (x = 490 to 650, y = 80 to 280)
            =================================================================== */}
        <g
          className="monument-group monument-indiagate"
          onMouseEnter={() => setActiveMonument(MONUMENTS.indiagate)}
          onMouseLeave={() => setActiveMonument(null)}
          role="button"
          tabIndex={0}
          aria-label="India Gate"
        >
          {/* Stepped Base Plinth */}
          <rect x="500" y="260" width="140" height="20" rx="1" fill="#996038" />
          <rect x="508" y="250" width="124" height="10" fill="#B87B4C" />
          {/* Main Pylons */}
          <rect x="515" y="140" width="110" height="110" fill="url(#indiaGateGrad)" />
          {/* Grand Central Arch */}
          <path d="M545,250 L545,175 Q570,148 595,175 L595,250 Z" fill="#4A2612" />
          <path d="M550,250 L550,185 Q570,160 590,185 L590,250 Z" fill="#251006" />

          {/* Pier Mouldings & Inscription Band */}
          <rect x="510" y="132" width="120" height="9" fill="#D69A68" />
          <rect x="512" y="125" width="116" height="8" fill="#F0C5A0" />
          {/* Attic Upper Tier */}
          <polygon points="522,125 618,125 614,96 526,96" fill="url(#indiaGateGrad)" />
          <rect x="522" y="90" width="96" height="6.5" rx="1" fill="#BA7B48" />
          {/* Top Shallow Bowl / Urn Plinth */}
          <rect x="550" y="83" width="40" height="7" rx="1.5" fill="#E5B285" />
          <path d="M555,83 Q570,76 585,83 Z" fill="#996038" />
        </g>

        {/* ===================================================================
            MONUMENT 5: TAJ MAHAL (Center: x = 665 to 870, y = 80 to 280)
            =================================================================== */}
        <g
          className="monument-group monument-taj"
          onMouseEnter={() => setActiveMonument(MONUMENTS.taj)}
          onMouseLeave={() => setActiveMonument(null)}
          role="button"
          tabIndex={0}
          aria-label="Taj Mahal"
        >
          {/* Raised Plinth */}
          <rect x="680" y="258" width="175" height="22" fill="#E6DFD5" />
          <rect x="686" y="250" width="163" height="8" fill="#FFFFFF" />

          {/* Main Octagonal Mausoleum Body */}
          <rect x="705" y="170" width="125" height="80" fill="url(#tajGrad)" />
          {/* Central Grand Iwan Arch */}
          <path d="M743,250 L743,188 Q767.5,170 792,188 L792,250 Z" fill="#403C38" />
          <path d="M750,250 L750,198 Q767.5,182 785,198 L785,250 Z" fill="#201E1C" />
          {/* Left / Right Flanking Niche Arches */}
          <path d="M715,215 L715,190 Q725,180 735,190 L735,215 Z" fill="#6A645D" />
          <path d="M715,245 L715,223 Q725,215 735,223 L735,245 Z" fill="#6A645D" />
          <path d="M800,215 L800,190 Q810,180 820,190 L820,215 Z" fill="#6A645D" />
          <path d="M800,245 L800,223 Q810,215 820,223 L820,245 Z" fill="#6A645D" />

          {/* Attic Parapet */}
          <rect x="702" y="164" width="131" height="7" fill="#F4EFEA" />

          {/* Central Spectacular Bulbous Marble Dome */}
          <ellipse cx="767.5" cy="132" rx="34" ry="38" fill="url(#tajGrad)" filter="url(#softShadow)" />
          <path d="M744,164 Q767.5,95 791,164 Z" fill="#FFFFFF" />
          {/* Dome Spire / Finial */}
          <line x1="767.5" y1="95" x2="767.5" y2="76" stroke="#C2A87E" strokeWidth="2.5" />
          <circle cx="767.5" cy="74" r="2.5" fill="#C2A87E" />
          <path d="M764,74 Q767.5,69 771,74 Z" fill="#C2A87E" />

          {/* Left Chattri (Domed Kiosk) */}
          <rect x="718" y="148" width="18" height="16" fill="url(#tajGrad)" />
          <ellipse cx="727" cy="144" rx="12" ry="10" fill="#FFFFFF" />
          <line x1="727" y1="134" x2="727" y2="126" stroke="#C2A87E" strokeWidth="1.5" />

          {/* Right Chattri (Domed Kiosk) */}
          <rect x="790" y="148" width="18" height="16" fill="url(#tajGrad)" />
          <ellipse cx="799" cy="144" rx="12" ry="10" fill="#FFFFFF" />
          <line x1="799" y1="134" x2="799" y2="126" stroke="#C2A87E" strokeWidth="1.5" />

          {/* Left Outermost Slender Minaret */}
          <polygon points="674,258 684,258 682,125 676,125" fill="#FFFFFF" />
          <rect x="674" y="121" width="10" height="4" fill="#D4CCC1" />
          <ellipse cx="679" cy="116" rx="6" ry="6" fill="#FFFFFF" />
          <line x1="679" y1="110" x2="679" y2="102" stroke="#C2A87E" strokeWidth="1.5" />

          {/* Right Outermost Slender Minaret */}
          <polygon points="851,258 861,258 859,125 853,125" fill="#FFFFFF" />
          <rect x="851" y="121" width="10" height="4" fill="#D4CCC1" />
          <ellipse cx="856" cy="116" rx="6" ry="6" fill="#FFFFFF" />
          <line x1="856" y1="110" x2="856" y2="102" stroke="#C2A87E" strokeWidth="1.5" />
        </g>

        {/* ===================================================================
            MONUMENT 6: BULAND DARWAZA / PALACE GATEWAY (x = 880 to 1060, y = 95 to 280)
            =================================================================== */}
        <g
          className="monument-group monument-gateway"
          onMouseEnter={() => setActiveMonument(MONUMENTS.gateway)}
          onMouseLeave={() => setActiveMonument(null)}
          role="button"
          tabIndex={0}
          aria-label="Buland Darwaza"
        >
          {/* Base */}
          <rect x="888" y="254" width="164" height="26" fill="#995030" />
          <polygon points="894,254 1046,254 1040,140 900,140" fill="url(#qutubGrad)" />

          {/* Grand Semi-Octagonal Vaulted Portal */}
          <path d="M936,254 L936,180 Q970,148 1004,180 L1004,254 Z" fill="#3D1A0D" />
          <path d="M946,254 L946,192 Q970,165 994,192 L994,254 Z" fill="#1C0A04" />

          {/* Parapet & Top Row of Chattris */}
          <rect x="898" y="132" width="144" height="9" fill="#C47353" />
          {/* Mini Cupolas */}
          <path d="M912,132 Q918,120 924,132 Z" fill="#E8B49E" />
          <path d="M938,132 Q944,120 950,132 Z" fill="#E8B49E" />
          <path d="M964,132 Q970,116 976,132 Z" fill="#FAF8F5" />
          <path d="M990,132 Q996,120 1002,132 Z" fill="#E8B49E" />
          <path d="M1016,132 Q1022,120 1028,132 Z" fill="#E8B49E" />
          <line x1="970" y1="116" x2="970" y2="108" stroke="#D8C8B4" strokeWidth="1.5" />
        </g>

        {/* ===================================================================
            MONUMENT 7: RED FORT RAMPARTS & BASTIONS (Right: x = 1060 to 1430, y = 110 to 280)
            =================================================================== */}
        <g
          className="monument-group monument-redfort"
          onMouseEnter={() => setActiveMonument(MONUMENTS.redfort)}
          onMouseLeave={() => setActiveMonument(null)}
          role="button"
          tabIndex={0}
          aria-label="Red Fort Ramparts"
        >
          {/* Massive Fort Wall Base */}
          <rect x="1070" y="195" width="350" height="85" fill="url(#redFortGrad)" />
          {/* Wall Cornice */}
          <rect x="1065" y="188" width="360" height="8" fill="#C53030" />

          {/* Central Lahori Gate Portal */}
          <rect x="1195" y="170" width="100" height="110" fill="#822525" />
          <path d="M1225,280 L1225,220 Q1245,200 1265,220 L1265,280 Z" fill="#380C0C" />
          <rect x="1190" y="162" width="110" height="8" fill="#9B2C2C" />

          {/* Left Bastion Tower */}
          <rect x="1155" y="145" width="38" height="135" fill="#741D1D" />
          <rect x="1150" y="140" width="48" height="6" fill="#C53030" />
          {/* Left Bastion Dome Chattri */}
          <rect x="1160" y="125" width="28" height="15" fill="#FAF8F5" />
          <path d="M1158,125 Q1174,108 1190,125 Z" fill="#9B2C2C" />
          <line x1="1174" y1="108" x2="1174" y2="100" stroke="#FAF8F5" strokeWidth="1.5" />

          {/* Right Bastion Tower */}
          <rect x="1297" y="145" width="38" height="135" fill="#741D1D" />
          <rect x="1292" y="140" width="48" height="6" fill="#C53030" />
          {/* Right Bastion Dome Chattri */}
          <rect x="1302" y="125" width="28" height="15" fill="#FAF8F5" />
          <path d="M1300,125 Q1316,108 1332,125 Z" fill="#9B2C2C" />
          <line x1="1316" y1="108" x2="1316" y2="100" stroke="#FAF8F5" strokeWidth="1.5" />

          {/* Serrated Battlements across Ramparts */}
          <path
            d="M1070,188 L1070,180 L1080,180 L1080,188 L1090,188 L1090,180 L1100,180 L1100,188 L1110,188 L1110,180 L1120,180 L1120,188 L1130,188 L1130,180 L1140,180 L1140,188 Z"
            fill="#C53030"
          />
          <path
            d="M1340,188 L1340,180 L1350,180 L1350,188 L1360,188 L1360,180 L1370,180 L1370,188 L1380,188 L1380,180 L1390,180 L1390,188 L1400,188 L1400,180 L1410,180 L1410,188 Z"
            fill="#C53030"
          />

          {/* Far Right Corner Pavilion */}
          <rect x="1395" y="160" width="30" height="120" fill="#5C1616" />
          <path d="M1395,160 Q1410,145 1425,160 Z" fill="#FAF8F5" />
        </g>

        {/* Continuous Architectural Foundation Ground Bar */}
        <rect x="0" y="272" width="1440" height="8" fill="url(#softGroundGrad)" />
      </svg>
    </div>
  );
};
