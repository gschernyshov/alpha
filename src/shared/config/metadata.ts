import type { Metadata } from 'next'

interface MetaData {
  layout: Metadata
}

export const metaData: MetaData = {
  layout: {
    title: {
      default: 'Погода',
      template: '%s | Погода',
    },
    description: 'Мониторинг погодных условий в реальном времени.',
  },
}
