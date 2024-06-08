import { Author, Book, Category } from '@renderer/global'
import { create } from 'zustand'

interface Store {
  selected: Book | null
  books: Book[]
  recents: Book[]
  authors: Author[]
  categories: Category[]
  setSelected: (book: Book | null) => void
  setAuthors: (authors: Author[]) => void
  setRecents: (books: Book[]) => void
  setCategories: (categories: Category[]) => void
  setBooks: (books: Book[]) => void
  setStore: (store: Store) => void
}

export const useLibraryStore = create<Store>()((set) => ({
  selected: null,
  books: [],
  recents: [],
  authors: [],
  categories: [],
  setSelected: (book) => set({ selected: book }),
  setAuthors: (authors) => set({ authors }),
  setRecents: (recents) => set({ recents }),
  setCategories: (categories) => set({ categories }),
  setBooks: (books) => set({ books }),
  setStore: (store) => set((state) => ({ ...state, ...store }))
}))
