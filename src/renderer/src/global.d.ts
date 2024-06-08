export interface Book {
  id: number
  title: string
  author: IAuthor // Relación con el modelo Author
  authorId: number
  description: string
  cover: string
  category: Category // Relación con el modelo Category
  categoryId: number
  path: string
  year: number
  pages: number
}

export interface IAuthor {
  id: number
  name: string
  image?: string | null // La imagen es opcional
  description?: string | null // La descripción es opcional
  books: Book[] // Relación inversa con Book
}

export interface Category {
  id: number
  name: string // Valor por defecto "Unknown"
  books: Book[] // Relación inversa con Book
}
