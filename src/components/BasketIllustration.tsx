export default function BasketIllustration() {
  return (
    <svg
      viewBox="0 0 200 160"
      role="img"
      aria-label="সবজি ও ফলের ঝুড়ি"
      className="mx-auto h-auto w-44 md:w-56"
    >
      <ellipse cx="100" cy="150" rx="72" ry="7" fill="#dde5dd" />

      <path d="M75 28 q8 -14 20 -12" stroke="#16a34a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M118 16 q-2 -10 8 -14" stroke="#16a34a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="75" cy="52" r="24" fill="#ef4444" />
      <circle cx="118" cy="44" r="28" fill="#22c55e" />
      <circle cx="52" cy="68" r="14" fill="#a855f7" />
      <circle cx="96" cy="68" r="13" fill="#f97316" />
      <circle cx="144" cy="68" r="15" fill="#f59e0b" />

      <rect x="26" y="62" width="148" height="12" rx="3" fill="#92400e" />
      <path d="M32 74 H168 L157 140 Q156 146 149 146 H51 Q44 146 43 140 Z" fill="#b45309" />
      <g stroke="#7c2d12" strokeOpacity="0.45" strokeWidth="3">
        <line x1="62" y1="76" x2="66" y2="143" />
        <line x1="88" y1="76" x2="89" y2="143" />
        <line x1="112" y1="76" x2="111" y2="143" />
        <line x1="138" y1="76" x2="134" y2="143" />
      </g>
    </svg>
  );
}