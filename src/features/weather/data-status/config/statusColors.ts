export const statusColors = {
  fresh: {
    bg: 'bg-emerald-800/40 md:bg-emerald-500/10',
    border: 'border-emerald-400/20',
    text: 'text-emerald-300',
    pulseColor: 'bg-emerald-400',
    ring: 'ring-emerald-500/30',
  },
  stale: {
    bg: 'bg-amber-800/40 md:bg-amber-500/10',
    border: 'border-amber-400/20',
    text: 'text-amber-300',
    pulseColor: 'bg-amber-400',
    ring: 'ring-amber-500/30',
  },
  outdated: {
    bg: 'bg-red-800/40 md:bg-red-500/10',
    border: 'border-red-400/20',
    text: 'text-red-300',
    pulseColor: 'bg-red-400',
    ring: 'ring-red-500/30',
  },
} as const
