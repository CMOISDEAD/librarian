import { IBook } from '@renderer/global'
import { create } from 'zustand'

interface Store {
  selectedBook: IBook | null
  books: IBook[]
  recentBooks: IBook[]
  setSelectedBook: (book: IBook) => void
  setBooks: (books: IBook[]) => void
  setStore: (store: Store) => void
}

export const useLibraryStore = create<Store>()((set) => ({
  selectedBook: null,
  books: [],
  recentBooks: [],
  setSelectedBook: (book) => set({ selectedBook: book }),
  setBooks: (books) => set({ books }),
  setStore: (store) => set((state) => ({ ...state, ...store }))
}))
