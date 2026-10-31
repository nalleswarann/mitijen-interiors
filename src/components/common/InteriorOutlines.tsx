import React from 'react';

export const InteriorOutlines: React.FC = () => {
  return (
    <div className="interior-outlines-wrapper" aria-hidden="true">
      <svg
        className="interior-outlines-svg"
        viewBox="0 0 1440 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYEnd meet"
      >
        <defs>
          {/* Transparent Gradient for Ground Plinth */}
          <linearGradient id="groundLineGrad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D8C8B4" stopOpacity="0.05" />
            <stop offset="15%" stopColor="#D8C8B4" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="85%" stopColor="#D8C8B4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#D8C8B4" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* SECTION 1: BESPOKE ARCHITECTURAL LIBRARY & SHELVING (x = 40 to 160) */}
        <g className="interior-group group-shelving">
          {/* Outer Frame */}
          <rect x="40" y="24" width="120" height="144" stroke="currentColor" strokeWidth="1.2" />
          <line x1="100" y1="24" x2="100" y2="168" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          {/* Shelves */}
          <line x1="40" y1="58" x2="160" y2="58" stroke="currentColor" strokeWidth="1" />
          <line x1="40" y1="92" x2="160" y2="92" stroke="currentColor" strokeWidth="1" />
          <line x1="40" y1="126" x2="160" y2="126" stroke="currentColor" strokeWidth="1" />
          {/* Shelf 1 Items */}
          <rect x="50" y="36" width="6" height="22" stroke="currentColor" strokeWidth="1" />
          <rect x="58" y="40" width="7" height="18" stroke="currentColor" strokeWidth="1" />
          <rect x="67" y="34" width="8" height="24" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="130" cy="48" rx="8" ry="10" stroke="var(--sand, #D8C8B4)" strokeWidth="1.2" />
          <line x1="130" y1="38" x2="130" y2="34" stroke="var(--sand, #D8C8B4)" strokeWidth="1" />
          {/* Shelf 2 Items */}
          <path d="M52,86 Q70,92 88,86 Z" stroke="var(--sand, #D8C8B4)" strokeWidth="1.2" />
          <rect x="110" y="68" width="22" height="24" stroke="currentColor" strokeWidth="1" />
          <line x1="114" y1="74" x2="128" y2="86" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          {/* Shelf 3 Items */}
          <rect x="48" y="104" width="8" height="22" stroke="currentColor" strokeWidth="1" />
          <rect x="58" y="102" width="9" height="24" stroke="currentColor" strokeWidth="1" />
          <rect x="69" y="106" width="7" height="20" stroke="currentColor" strokeWidth="1" />
          <rect x="78" y="108" width="8" height="18" stroke="currentColor" strokeWidth="1" />
          <circle cx="130" cy="112" r="8" stroke="currentColor" strokeWidth="1" />
          {/* Bottom Cupboard Doors */}
          <rect x="44" y="130" width="52" height="34" stroke="currentColor" strokeWidth="1" opacity="0.8" />
          <rect x="104" y="130" width="52" height="34" stroke="currentColor" strokeWidth="1" opacity="0.8" />
          <circle cx="92" cy="147" r="1.5" fill="var(--sand, #D8C8B4)" />
          <circle cx="108" cy="147" r="1.5" fill="var(--sand, #D8C8B4)" />
        </g>

        {/* SECTION 2: LOUNGE ARMCHAIR & ARCADED FLOOR LAMP (x = 195 to 365) */}
        <g className="interior-group group-lounge">
          {/* Arched Floor Lamp */}
          <path d="M205,168 L205,120 Q205,32 260,34" stroke="var(--sand, #D8C8B4)" strokeWidth="1.4" fill="none" />
          <line x1="195" y1="168" x2="215" y2="168" stroke="var(--sand, #D8C8B4)" strokeWidth="2" />
          <line x1="260" y1="34" x2="260" y2="44" stroke="var(--sand, #D8C8B4)" strokeWidth="1" />
          <path d="M248,50 Q260,42 272,50 Z" stroke="var(--sand, #D8C8B4)" strokeWidth="1.2" fill="none" />
          <line x1="248" y1="50" x2="272" y2="50" stroke="var(--sand, #D8C8B4)" strokeWidth="1" />

          {/* Lounge Armchair */}
          <line x1="265" y1="102" x2="282" y2="136" stroke="currentColor" strokeWidth="1.6" />
          <rect x="264" y="94" width="22" height="42" rx="3" stroke="currentColor" strokeWidth="1.2" transform="rotate(-18 264 94)" />
          <rect x="268" y="128" width="54" height="10" rx="3" stroke="currentColor" strokeWidth="1.4" />
          <line x1="272" y1="138" x2="260" y2="168" stroke="currentColor" strokeWidth="1.5" />
          <line x1="272" y1="138" x2="288" y2="168" stroke="currentColor" strokeWidth="1.5" />
          <line x1="312" y1="138" x2="304" y2="168" stroke="currentColor" strokeWidth="1.5" />
          <line x1="312" y1="138" x2="326" y2="168" stroke="currentColor" strokeWidth="1.5" />
          <line x1="265" y1="116" x2="310" y2="116" stroke="currentColor" strokeWidth="1.5" />
          <line x1="310" y1="116" x2="310" y2="136" stroke="currentColor" strokeWidth="1.2" />

          {/* Side Table */}
          <line x1="335" y1="134" x2="365" y2="134" stroke="currentColor" strokeWidth="1.4" />
          <line x1="350" y1="134" x2="350" y2="168" stroke="currentColor" strokeWidth="1.2" />
          <line x1="340" y1="168" x2="360" y2="168" stroke="currentColor" strokeWidth="1.5" />
          <rect x="344" y="127" width="8" height="7" rx="1" stroke="var(--sand, #D8C8B4)" strokeWidth="1" />
        </g>

        {/* SECTION 3: FLUTED CREDENZA & FRAMED GALLERY ART (x = 400 to 570) */}
        <g className="interior-group group-credenza">
          {/* Framed Wall Artwork */}
          <rect x="425" y="24" width="115" height="65" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="431" y="30" width="103" height="53" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          <path d="M445,65 Q465,38 485,65 T525,65" stroke="var(--sand, #D8C8B4)" strokeWidth="1" fill="none" />
          <circle cx="485" cy="46" r="7" stroke="var(--sand, #D8C8B4)" strokeWidth="1" />
          <line x1="460" y1="18" x2="505" y2="18" stroke="currentColor" strokeWidth="1.5" />
          <line x1="482.5" y1="18" x2="482.5" y2="24" stroke="currentColor" strokeWidth="1" />

          {/* Tabletop Decor */}
          <ellipse cx="420" cy="104" rx="7" ry="11" stroke="var(--sand, #D8C8B4)" strokeWidth="1.2" />
          <path d="M420,93 Q412,78 422,68" stroke="var(--sand, #D8C8B4)" strokeWidth="1" fill="none" />
          <circle cx="422" cy="68" r="1.5" fill="var(--sand, #D8C8B4)" />
          <rect x="535" y="108" width="30" height="4" stroke="currentColor" strokeWidth="1" />
          <rect x="538" y="104" width="24" height="4" stroke="currentColor" strokeWidth="1" />

          {/* Monolithic Credenza */}
          <rect x="400" y="112" width="170" height="48" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <line x1="414" y1="112" x2="414" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <line x1="428" y1="112" x2="428" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <line x1="442" y1="112" x2="442" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <line x1="456" y1="112" x2="456" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <line x1="470" y1="112" x2="470" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <line x1="484" y1="112" x2="484" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <line x1="498" y1="112" x2="498" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <line x1="512" y1="112" x2="512" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <line x1="526" y1="112" x2="526" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <line x1="540" y1="112" x2="540" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <line x1="556" y1="112" x2="556" y2="160" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <rect x="410" y="160" width="150" height="8" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        </g>

        {/* SECTION 4: GRAND ARCHED GLASS PORTAL & DRAPES (Center: x = 625 to 815) */}
        <g className="interior-group group-portal">
          <path d="M625,168 L625,75 Q710,10 795,75 L795,168" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M632,168 L632,77 Q710,18 788,77 L788,168" stroke="currentColor" strokeWidth="1.0" fill="none" opacity="0.7" />
          <line x1="632" y1="78" x2="788" y2="78" stroke="currentColor" strokeWidth="1.2" />
          <line x1="710" y1="20" x2="710" y2="168" stroke="currentColor" strokeWidth="1.4" />
          <path d="M710,20 L660,78" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          <path d="M710,20 L760,78" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          <line x1="632" y1="108" x2="788" y2="108" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
          <line x1="632" y1="138" x2="788" y2="138" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
          <line x1="671" y1="78" x2="671" y2="168" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          <line x1="749" y1="78" x2="749" y2="168" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          <rect x="704" y="118" width="2" height="18" fill="var(--sand, #D8C8B4)" />
          <rect x="714" y="118" width="2" height="18" fill="var(--sand, #D8C8B4)" />
          <path d="M790,30 Q804,90 798,168" stroke="var(--sand, #D8C8B4)" strokeWidth="1.2" fill="none" opacity="0.8" />
          <path d="M798,35 Q812,95 806,168" stroke="var(--sand, #D8C8B4)" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M806,40 Q818,100 814,168" stroke="var(--sand, #D8C8B4)" strokeWidth="0.8" fill="none" opacity="0.4" />
        </g>

        {/* SECTION 5: LIVING SANCTUARY DAYBED / SOFA (x = 844 to 1030) */}
        <g className="interior-group group-sofa">
          <circle cx="865" cy="52" r="5" stroke="var(--sand, #D8C8B4)" strokeWidth="1.2" />
          <line x1="865" y1="57" x2="865" y2="70" stroke="var(--sand, #D8C8B4)" strokeWidth="1" />
          <circle cx="865" cy="71" r="2" fill="var(--sand, #D8C8B4)" />

          <rect x="850" y="104" width="60" height="26" rx="4" stroke="currentColor" strokeWidth="1.2" />
          <rect x="914" y="104" width="60" height="26" rx="4" stroke="currentColor" strokeWidth="1.2" />
          <rect x="978" y="104" width="48" height="26" rx="4" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="862" cy="122" rx="7" ry="10" stroke="var(--sand, #D8C8B4)" strokeWidth="1.2" />
          <rect x="844" y="130" width="186" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <rect x="848" y="148" width="178" height="12" stroke="currentColor" strokeWidth="1.2" />
          <line x1="860" y1="160" x2="860" y2="168" stroke="currentColor" strokeWidth="1.5" />
          <line x1="937" y1="160" x2="937" y2="168" stroke="currentColor" strokeWidth="1.5" />
          <line x1="1014" y1="160" x2="1014" y2="168" stroke="currentColor" strokeWidth="1.5" />

          {/* Coffee Table Plinth */}
          <rect x="900" y="152" width="75" height="12" rx="2" stroke="var(--sand, #D8C8B4)" strokeWidth="1.4" />
          <line x1="910" y1="164" x2="910" y2="168" stroke="var(--sand, #D8C8B4)" strokeWidth="1.4" />
          <line x1="965" y1="164" x2="965" y2="168" stroke="var(--sand, #D8C8B4)" strokeWidth="1.4" />
          <ellipse cx="937" cy="149" rx="5" ry="3" stroke="currentColor" strokeWidth="1" />
        </g>

        {/* SECTION 6: ARCHITECTURAL DINING SUITE (x = 1092 to 1250) */}
        <g className="interior-group group-dining">
          <line x1="1100" y1="52" x2="1240" y2="52" stroke="var(--sand, #D8C8B4)" strokeWidth="2" />
          <line x1="1135" y1="18" x2="1135" y2="52" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          <line x1="1205" y1="18" x2="1205" y2="52" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />

          <path d="M1095,96 L1095,130 L1120,130 L1120,168 L1090,168" stroke="currentColor" strokeWidth="1.3" fill="none" />
          <rect x="1092" y="96" width="16" height="24" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <line x1="1092" y1="128" x2="1122" y2="128" stroke="currentColor" strokeWidth="1.4" />

          <rect x="1115" y="112" width="110" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="1158" y="119" width="24" height="49" stroke="currentColor" strokeWidth="1.2" />
          <line x1="1164" y1="119" x2="1164" y2="168" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          <line x1="1170" y1="119" x2="1170" y2="168" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          <line x1="1176" y1="119" x2="1176" y2="168" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          <rect x="1145" y="164" width="50" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <path d="M1166,112 L1166,104 Q1169,96 1172,96 L1172,112 Z" stroke="var(--sand, #D8C8B4)" strokeWidth="1" fill="none" />
          <line x1="1182" y1="112" x2="1182" y2="102" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="1182" cy="100" rx="3" ry="4" stroke="currentColor" strokeWidth="1" />

          <path d="M1245,96 L1245,130 L1220,130 L1220,168 L1250,168" stroke="currentColor" strokeWidth="1.3" fill="none" />
          <rect x="1232" y="96" width="16" height="24" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <line x1="1218" y1="128" x2="1248" y2="128" stroke="currentColor" strokeWidth="1.4" />
        </g>

        {/* SECTION 7: CUSTOM MILLWORK & FULL-LENGTH ARCHED MIRROR (x = 1280 to 1415) */}
        <g className="interior-group group-wardrobe">
          <rect x="1300" y="20" width="115" height="148" stroke="currentColor" strokeWidth="1.4" />
          <line x1="1355" y1="20" x2="1355" y2="168" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <line x1="1300" y1="65" x2="1415" y2="65" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <line x1="1300" y1="145" x2="1415" y2="145" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          <rect x="1350" y="95" width="2" height="20" fill="var(--sand, #D8C8B4)" />
          <rect x="1358" y="95" width="2" height="20" fill="var(--sand, #D8C8B4)" />

          <path d="M1280,168 L1280,68 Q1295,40 1310,68 L1310,168 Z" stroke="var(--sand, #D8C8B4)" strokeWidth="1.4" fill="none" />
          <path d="M1284,168 L1284,70 Q1295,46 1306,70 L1306,168 Z" stroke="var(--sand, #D8C8B4)" strokeWidth="0.8" fill="none" opacity="0.5" />
        </g>

        {/* ARCHITECTURAL GROUND BASELINE WITH CAD DIMENSION TICKS */}
        <line x1="0" y1="168" x2="1440" y2="168" stroke="url(#groundLineGrad)" strokeWidth="1.4" />
        <line x1="40" y1="168" x2="40" y2="174" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="160" y1="168" x2="160" y2="174" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="400" y1="168" x2="400" y2="174" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="570" y1="168" x2="570" y2="174" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="710" y1="168" x2="710" y2="176" stroke="var(--sand, #D8C8B4)" strokeWidth="1.4" />
        <line x1="844" y1="168" x2="844" y2="174" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="1030" y1="168" x2="1030" y2="174" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="1115" y1="168" x2="1115" y2="174" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="1225" y1="168" x2="1225" y2="174" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="1415" y1="168" x2="1415" y2="174" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
};
