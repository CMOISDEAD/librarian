import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Image, Input } from '@nextui-org/react'
import { useLibraryStore } from '@renderer/store/store'
import toast from 'react-hot-toast'

export const Form = () => {
  const { books, setBooks } = useLibraryStore((state) => state)
  const { handleSubmit, values, errors, touched, getFieldProps } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      setBooks([...books, values])
      toast.success('Book added')
    }
  })

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
            isInvalid={touched.path && !!errors.path}
          // errorMessage={touched.path && errors.path}
          />
          <Input
            type="file"
            label="Path"
            className="h-full"
            placeholder="Path"
            {...getFieldProps('path')}
            isInvalid={touched.path && !!errors.path}
          // errorMessage={touched.path && errors.path}
          />
        </div>
        <Button color="primary" variant="flat" type="submit">
          Add
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
