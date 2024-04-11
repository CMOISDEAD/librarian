import { IBook } from '@renderer/global'
import { create } from 'zustand'

interface Store {
  selected: IBook | null
  books: IBook[]
  recents: IBook[]
  setSelected: (book: IBook) => void
  setRecents: (books: IBook[]) => void
  setBooks: (books: IBook[]) => void
  setStore: (store: Store) => void
}

export const useLibraryStore = create<Store>()((set) => ({
  selected: null,
  books: [],
  recents: [],
  setSelected: (book) => set({ selected: book }),
  setRecents: (recents) => set({ recents }),
  setBooks: (books) => set({ books }),
  setStore: (store) => set((state) => ({ ...state, ...store }))
}))
