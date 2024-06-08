import { Autocomplete, AutocompleteItem, Button, Image, Input } from '@nextui-org/react'
import { useLibraryStore } from '@renderer/store/store'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { RxFilePlus } from 'react-icons/rx'
import { Book } from '@renderer/global'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  title: string
  author: string | null
  description: string
  cover: string
  year: number
  category: string
  pages: number
  path: string
}

export const Form = ({ book }: { book?: Book }) => {
  const isEdit = !!book
  const ipcHandle = window.electron.ipcRenderer
  const { authors, categories, setBooks, setSelected, setRecents } = useLibraryStore(
    (state) => state
  )
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, touchedFields: touched }
  } = useForm<Inputs>({
    defaultValues: (book || initialValues) as Inputs
  })

  useEffect(() => {
    if (!book) return
    setValue('path', book.path)
    setValue('author', book.author.name)
    setValue('category', book.category.name)
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const books = isEdit
      ? await ipcHandle.invoke('update-book', { ...values, id: book.id })
      : await ipcHandle.invoke('add-book', { ...values })
    setBooks(books)
    toast.success(isEdit ? 'Book updated successfully' : 'Book added successfully')
    if (book) {
      const selected = await ipcHandle.invoke('get-selected')
      const recents = await ipcHandle.invoke('get-recents')
      setSelected(selected)
      setRecents(recents)
    }
  }

  const handlePath = async () => {
    const path = await ipcHandle.invoke('get-pdf-path')
    setValue('path', path)
  }

  return (
    <div className="flex gap-2">
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 flex-grow">
        <Input
          label="Title"
          placeholder="Title"
          {...register('title', { required: true, minLength: 2 })}
          isInvalid={touched.title && !!errors.title}
        />
        <Autocomplete
          allowsCustomValue
          label="Author"
          variant="flat"
          defaultItems={authors.map((author) => ({ label: author.name, value: author.name }))}
          defaultSelectedKey={book?.author.name}
          onInputChange={(value) => setValue('author', value)}
          isInvalid={touched.author && !!errors.author}
        >
          {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
        </Autocomplete>
        <Input
          label="Description"
          placeholder="Description"
          {...register('description', { required: true, minLength: 3 })}
          isInvalid={touched.description && !!errors.description}
        />
        <Input
          label="Cover"
          placeholder="Cover"
          {...register('cover', { required: true })}
          isInvalid={touched.cover && !!errors.cover}
        />
        <div className="flex gap-2">
          <Input
            label="Year"
            placeholder="Year"
            {...register('year', { required: true, valueAsNumber: true })}
            isInvalid={touched.year && !!errors.year}
          />
          <Autocomplete
            allowsCustomValue
            label="Category"
            variant="flat"
            defaultItems={categories.map((category) => ({
              label: category.name,
              value: category.name
            }))}
            defaultSelectedKey={book?.category.name}
            onInputChange={(value) => setValue('category', value)}
            isInvalid={touched.category && !!errors.category}
          >
            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
          </Autocomplete>
        </div>
        <div className="flex gap-2">
          <Input
            label="Pages"
            placeholder="0"
            {...register('pages', { required: true, valueAsNumber: true })}
            isInvalid={!!errors.pages}
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
        src={watch('cover')}
        alt="placeholder image"
        fallbackSrc="https://placehold.co/256x424/EEE/31343C?font=lato&text=Cover+Not+Found"
        className="w-64 h-full object-cover max-h-[424px]"
      />
    </div>
  )
}

const initialValues: Inputs = {
  title: '',
  author: null,
  description: '',
  cover: '',
  year: 0,
  category: '',
  pages: 0,
  path: ''
}
