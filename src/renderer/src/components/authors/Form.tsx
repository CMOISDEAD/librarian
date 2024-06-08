import { Button, Input } from '@nextui-org/react'
import { Author } from '@renderer/global'
import { useLibraryStore } from '@renderer/store/store'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

type Inputs = {
  name: string
  image?: string
  description: string
}

export const Form = ({ author }: { author?: Author }) => {
  const isEdit = !!author
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: (author || defaultValues) as Inputs
  })
  const ipcHandle = window.electron.ipcRenderer
  const { setAuthors } = useLibraryStore((state) => state)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const authors = isEdit
      ? ipcHandle.sendSync('update-author', { ...data, id: author.id })
      : ipcHandle.sendSync('add-author', data)
    setAuthors(authors)
    toast.success(isEdit ? 'Author updated successfully' : 'Author added successfully')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Input
        placeholder="Name"
        label="Author Name"
        isInvalid={!!errors.name}
        {...register('name', { required: true, minLength: 3 })}
      />
      <Input
        placeholder="Image"
        label="Author image"
        isInvalid={!!errors.image}
        {...register('image', { required: true })}
      />
      <Input
        placeholder="Description"
        label="Author description"
        isInvalid={!!errors.description}
        {...register('description', { required: true })}
      />
      <Button fullWidth color="primary" variant="flat" type="submit">
        Add Author
      </Button>
    </form>
  )
}

const defaultValues = {
  name: '',
  description: '',
  image: ''
}
