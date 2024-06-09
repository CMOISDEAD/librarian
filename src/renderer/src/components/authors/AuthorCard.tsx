import { Button, Card, CardBody, CardHeader, Image, Link } from '@nextui-org/react'
import { IAuthor } from '@renderer/global'
import { useLibraryStore } from '@renderer/store/store'
import toast from 'react-hot-toast'
import { RxTrash } from 'react-icons/rx'
import { UpdateAuthor } from './UpdateAuthor'

interface Props {
  author: IAuthor
}

export const AuthorCard = ({ author }: Props) => {
  const ipcHandle = window.electron.ipcRenderer
  const { setAuthors } = useLibraryStore((state) => state)

  const handleRemove = async () => {
    try {
      const authors = await ipcHandle.invoke('delete-author', author.id)
      setAuthors(authors)
      toast.success('Author removed successfully')
    } catch (e) {
      console.error(e)
      toast.error(
        'Failed to remove author probably because the author has books associated with them.'
      )
    }
  }

  return (
    <Card>
      <CardHeader className="flex content-center items-center justify-around">
        <div className="flex content-center items-center justify-evenly gap-2 w-full">
          <Image
            isBlurred
            width={80}
            height={80}
            radius="full"
            src={author.image!}
            fallbackSrc="https://placehold.co/80x80/EEE/31343C?font=lato&text=No+Image"
            alt={`author ${author.name} image`}
            className="object-cover h-20 w-20"
          />
          <Link
            href={`/authors/${author.id}`}
            className="flex flex-col gap-2 justify-center content-center items-center w-3/5"
          >
            <h3 className="text-lg font-bold capitalize line-clamp-1 text-center">{author.name}</h3>
            <p className="text-sm text-foreground-400">Writter & Author</p>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <UpdateAuthor author={author} />
          <Button isIconOnly size="sm" variant="flat" color="danger" onPress={handleRemove}>
            <RxTrash />
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-foreground-400 line-clamp-3">
          {author.description || 'No description provided for this author.'}
        </p>
      </CardBody>
    </Card>
  )
}
