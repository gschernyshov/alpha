export const statusColors = {
  online: {
    bg: 'bg-black/70',
    border: 'border-cyan-500/20',
    text: 'text-cyan-300',
    pulseColor: 'bg-cyan-400',
    ring: 'ring-cyan-500/30',
  },
  loading: {
    bg: ' bg-black/70',
    border: 'border-amber-400/20',
    text: 'text-amber-300',
    pulseColor: 'bg-amber-400',
    ring: 'ring-amber-500/30',
  },
  offline: {
    bg: ' bg-black/70',
    border: 'border-red-400/20',
    text: 'text-red-300',
    pulseColor: 'bg-red-400',
    ring: 'ring-red-500/30',
  },
} as const
