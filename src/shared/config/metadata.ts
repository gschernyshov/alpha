import type { Metadata } from 'next'

interface MetaData {
  layout: Metadata
}

export const metaData: MetaData = {
  layout: {
    title: {
      default: 'BlackStage Alpha',
      template: '%s | BlackStage Alpha',
    },
    description: '',
  },
}
