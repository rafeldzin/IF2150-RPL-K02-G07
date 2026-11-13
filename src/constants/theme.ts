/**
 * Design token Pross.
 * Navy Blue  : teks & header
 * Hijau Terang: tombol / aksi utama
 * Card       : sudut tumpul (rounded)
 */
export const COLORS = {
  navy: '#0B2A5B',
  navySoft: '#3C5584',
  green: '#22C55E',
  greenDark: '#16A34A',
  greenTint: '#E7F9EE',
  background: '#F3F6FB',
  card: '#FFFFFF',
  border: '#E1E7F0',
  muted: '#7C8AA5',
  danger: '#DC2626',
  dangerTint: '#FDECEC',
  white: '#FFFFFF',
} as const;

export const RADIUS = {
  chip: 999,
  input: 14,
  card: 18,
  sheet: 28,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const SHADOW = {
  shadowColor: '#0B2A5B',
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
} as const;
