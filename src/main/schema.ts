export const schema = {
  books: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' }
      },
      default: []
    }
  },
  recents: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' }
      }
    },
    default: []
  },
  selected: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' }
    },
    default: null,
    nullable: true
  }
} as const
