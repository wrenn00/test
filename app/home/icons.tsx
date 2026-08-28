export const BellIcon = () => (
  <svg width="24" height="26" viewBox="0 0 24 26" fill="currentColor" aria-hidden>
    <path d="M12 2c5 0 8 4 8 9v6l2 4H2l2-4v-6c0-5 3-9 8-9Z" />
    <ellipse cx="12" cy="23.5" rx="3.5" ry="2.5" />
  </svg>
);

export const ChevronDown = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M1 1.5 6 6.5 11 1.5" />
  </svg>
);

export const ChevronUp = ({ up = true }: { up?: boolean }) => (
  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" stroke="#4e5968" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={up ? "M1 7.5 7 1.5 13 7.5" : "M1 1.5 7 7.5 13 1.5"} />
  </svg>
);

export const CheckIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M1 5 4.5 8.5 11 1.5" />
  </svg>
);

export const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" stroke="#4e5968" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M8 1v14M1 8h14" />
  </svg>
);

export const CloseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" stroke="#8b95a1" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M1 1l13 13M14 1L1 14" />
  </svg>
);

export const HomeIcon = ({ active }: { active?: boolean }) => (
  <svg width="24" height="23" viewBox="0 0 24 23" fill={active ? "#191f28" : "none"} stroke={active ? "none" : "#8b95a1"} strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <path d="M12 0 24 10v13h-9v-8H9v8H0V10Z" />
  </svg>
);

export const ChatIcon = ({ active }: { active?: boolean }) => (
  <svg width="24" height="26" viewBox="0 0 24 26" fill={active ? "#191f28" : "none"} stroke={active ? "#191f28" : "#8b95a1"} strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <rect x="1" y="1" width="22" height="17" rx="6" />
    <path d="M6 18v6l7-6" />
  </svg>
);

export const PersonIcon = ({ active }: { active?: boolean }) => (
  <svg width="22" height="24" viewBox="0 0 22 24" fill="none" stroke={active ? "#191f28" : "#8b95a1"} strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="6" r="5" />
    <path d="M1 23c0-6 4.5-9 10-9s10 3 10 9" />
  </svg>
);

export const BackIcon = () => (
  <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M10 1 2 10l8 9" />
  </svg>
);

export const CameraIcon = () => (
  <svg width="30" height="26" viewBox="0 0 30 26" fill="none" stroke="#8b95a1" strokeWidth="1.8" aria-hidden>
    <rect x="1" y="4" width="28" height="21" rx="6" />
    <circle cx="15" cy="14.5" r="5.5" />
    <rect x="10" y="1" width="10" height="4" rx="2" fill="#8b95a1" stroke="none" />
  </svg>
);
