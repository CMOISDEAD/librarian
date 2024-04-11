import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Image, Input } from '@nextui-org/react'
import { useLibraryStore } from '@renderer/store/store'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { RxFilePlus } from 'react-icons/rx'
import { IBook } from '@renderer/global'

interface Props {
  book?: IBook
}

export const Form = ({ book }: Props) => {
  const isEdit = !!book
  const ipcHandle = window.electron.ipcRenderer
  const { setBooks, setSelected, setRecents } = useLibraryStore((state) => state)
  const { handleSubmit, values, errors, touched, getFieldProps, setFieldValue } = useFormik({
    initialValues: book || initialValues,
    validationSchema,
    onSubmit: (values) => {
      const books = isEdit
        ? ipcHandle.sendSync('update-book', { ...values, id: book.id })
        : ipcHandle.sendSync('add-book', { ...values })
      setBooks(books)
      toast.success(isEdit ? 'Book updated successfully' : 'Book added successfully')
      if (book) {
        const selected = ipcHandle.sendSync('get-selected')
        const recents = ipcHandle.sendSync('get-recents')
        setSelected(selected)
        setRecents(recents)
      }
    }
  })

  useEffect(() => {
    if (!book) return
    setFieldValue('path', book.path)
  }, [])

  const handlePath = () => {
    const path = ipcHandle.sendSync('get-pdf-path')
    setFieldValue('path', path)
  }

  return (
    <div className="flex gap-2">
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-2 flex-grow">
        <Input
          label="Title"
          placeholder="Title"
          {...getFieldProps('title')}
          isInvalid={touched.title && !!errors.title}
        // errorMessage={touched.title && errors.title}
        />
        <Input
          label="Author"
          placeholder="Author"
          {...getFieldProps('author')}
          isInvalid={touched.author && !!errors.author}
        // errorMessage={touched.author && errors.author}
        />
        <Input
          label="Description"
          placeholder="Description"
          {...getFieldProps('description')}
          isInvalid={touched.description && !!errors.description}
        // errorMessage={touched.description && errors.description}
        />
        <Input
          label="Cover"
          placeholder="Cover"
          {...getFieldProps('cover')}
          isInvalid={touched.cover && !!errors.cover}
        // errorMessage={touched.cover && errors.cover}
        />
        <div className="flex gap-2">
          <Input
            label="Year"
            placeholder="Year"
            {...getFieldProps('year')}
            isInvalid={touched.year && !!errors.year}
          // errorMessage={touched.year && errors.year}
          />
          <Input
            label="Genre"
            placeholder="Genre"
            {...getFieldProps('genre')}
            isInvalid={touched.genre && !!errors.genre}
          // errorMessage={touched.genre && errors.genre}
          />
        </div>
        <div className="flex gap-2">
          <Input
            label="Pages"
            placeholder="0"
            {...getFieldProps('pages')}
            isInvalid={touched.pages && !!errors.pages}
          // errorMessage={touched.path && errors.path}
          />
          <Button
            fullWidth
            variant="flat"
            color="primary"
            onPress={handlePath}
            className="h-full"
            startContent={<RxFilePlus />}
          >
            Select file
          </Button>
        </div>
        <Button color="primary" variant="flat" type="submit">
          {book ? 'Update Book' : 'Add Book'}
        </Button>
      </form>
      <Image
        isBlurred
        src={values.cover}
        alt="placeholder image"
        fallbackSrc="https://placehold.co/256x424/EEE/31343C?font=lato&text=Cover+Not+Found"
        className="w-64 h-full object-cover max-h-[424px]"
      />
    </div>
  )
}

type Inputs = {
  title: string
  author: string
  description: string
  cover: string
  year: number
  genre: string
  pages: number
  path: string
}

const initialValues: Inputs = {
  title: '',
  author: '',
  description: '',
  cover: '',
  year: 0,
  genre: '',
  pages: 0,
  path: ''
}

const validationSchema = Yup.object({
  title: Yup.string().min(3, 'min 3 characters').required('required'),
  author: Yup.string().min(3, 'min 3 characters').required('required'),
  description: Yup.string().min(3, 'min 3 characters').required('required'),
  cover: Yup.string().url('invalid url').required('required'),
  year: Yup.number().min(0, 'min 0').required('required'),
  genre: Yup.string().min(3, 'min 3 characters').required('required'),
  pages: Yup.number().min(0, 'min 0').required('required'),
  path: Yup.string().required('required')
})
