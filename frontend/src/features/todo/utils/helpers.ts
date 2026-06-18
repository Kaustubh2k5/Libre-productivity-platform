/**
 * Parses and calculates differences, overlapping segments, and dynamic style tokens.
 */

export const calculateHoursBetween = (start: string, end: string): number => {
  try {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) {
      return 1;
    }
    const diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    if (diffMinutes <= 0) {
      return 1;
    }
    return Number((diffMinutes / 60).toFixed(2));
  } catch (err) {
    return 1;
  }
};

export const parseTimeSlot = (slotStr?: string): { startMinutes: number; endMinutes: number } | null => {
  if (!slotStr) return null;
  const parts = slotStr.split('-');
  if (parts.length !== 2) return null;
  const parsePart = (part: string): number | null => {
    const t = part.trim().split(':');
    if (t.length !== 2) return null;
    const h = parseInt(t[0], 10);
    const m = parseInt(t[1], 10);
    if (isNaN(h) || isNaN(m)) return null;
    return h * 60 + m;
  };
  const start = parsePart(parts[0]);
  const end = parsePart(parts[1]);
  if (start === null || end === null) return null;
  return { startMinutes: start, endMinutes: end };
};

export const isTimeOverlapping = (slot1Str?: string, slot2Str?: string): boolean => {
  const s1 = parseTimeSlot(slot1Str);
  const s2 = parseTimeSlot(slot2Str);
  if (!s1 || !s2) return false;
  return s1.startMinutes < s2.endMinutes && s2.startMinutes < s1.endMinutes;
};

/**
 * Deterministic Red Shade Generator based on Tag Name and dark mode/text-use context.
 */
export const getTagRedHSL = (tag: string, isDarkMode: boolean, isTextUse: boolean = false): string => {
  let hash = 0;
  const normalized = tag.trim().toLowerCase();
  for (let i = 0; i < normalized.length; i++) {
     hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  if (isTextUse) {
    // Used as text color on light/dark backgrounds (e.g. #tag)
    const brightness = isDarkMode 
      ? 50 + (Math.abs(hash) % 15) 
      : 20 + (Math.abs(hash) % 15);
    return `hsl(358, 85%, ${brightness}%)`;
  } else {
    // Used as solid backgrounds of tiles with white text inside
    const brightness = isDarkMode
      ? 18 + (Math.abs(hash) % 20) // 18% - 38%
      : 15 + (Math.abs(hash) % 15); // 15% - 30%
    return `hsl(358, 85%, ${brightness}%)`;
  }
};
