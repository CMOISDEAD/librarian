import { IBook } from '@renderer/global'
import { create } from 'zustand'

interface Store {
  selected: IBook | null
  books: IBook[]
  recentBooks: IBook[]
  setSelected: (book: IBook) => void
  setBooks: (books: IBook[]) => void
  setStore: (store: Store) => void
}

export const useLibraryStore = create<Store>()((set) => ({
  selected: null,
  books: [],
  recentBooks: [],
  setSelected: (book) => set({ selected: book }),
  setBooks: (books) => set({ books }),
  setStore: (store) => set((state) => ({ ...state, ...store }))
}))
