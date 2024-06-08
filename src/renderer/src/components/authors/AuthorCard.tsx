import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link
} from '@nextui-org/react'
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
    <Card className="bg-content1/30" shadow="lg">
      <CardHeader className="flex content-center items-center justify-center">
        <Image
          removeWrapper
          width={112}
          height={112}
          radius="full"
          src={author.image || 'https://via.placeholder.com/112x112'}
          fallbackSrc="https://via.placeholder.com/112x112"
          alt={`author ${author.name} image`}
          className="object-cover h-28 w-28"
        />
      </CardHeader>
      <CardBody>
        <Link href={`/authors/${author.id}`}>
          <h3 className="text-xl font-bold capitalize">{author.name}</h3>
        </Link>
        <p className="text-gray-500 line-clamp-3">{author.description}</p>
      </CardBody>
      <CardFooter>
        <ButtonGroup fullWidth variant="flat" size="sm">
          <UpdateAuthor author={author} />
          <Button color="danger" onPress={handleRemove}>
            <RxTrash />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
