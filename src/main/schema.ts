import { JSONSchemaType } from 'ajv'

type BookType = {
  id: string
  title: string
}

export type SchemaType = {
  books: BookType[]
  recents: BookType[]
  selected: BookType | null
}

// @ts-expect-error weird error
export const schema: JSONSchemaType<SchemaType> = {
  type: 'object',
  properties: {
    books: {
      type: 'array',
      default: [],
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' }
        }
      }
    },
    recents: {
      type: 'array',
      default: [],
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' }
        }
      }
    },
    selected: {
      type: 'object',
      default: null,
      properties: {
        id: { type: 'string' },
        title: { type: 'string' }
      }
    }
  }
}
