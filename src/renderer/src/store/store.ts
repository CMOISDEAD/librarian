import placeholder from '../utils/books'
import { IBook } from '@renderer/global'
import { create } from 'zustand'

interface Store {
  selectedBook: IBook | null
  books: IBook[]
  recentBooks: IBook[]
  setSelectedBook: (book: IBook) => void
  setBooks: (books: IBook[]) => void
}

export const useLibraryStore = create<Store>()((set) => ({
  selectedBook: null,
  books: placeholder,
  recentBooks: [],
  setSelectedBook: (book) => set({ selectedBook: book }),
  setBooks: (books) => set({ books })
}))
