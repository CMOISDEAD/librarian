import { AnimatePresence, motion } from 'framer-motion'
import { Card, CardBody, Image } from '@nextui-org/react'

const url =
  'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781668016138/holly-9781668016138_hr.jpg'

export const Overview = ({ open }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: '-13%' }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed right-0 w-3/12 px-2 h-full z-50 mt-1"
        >
          <Card className="flex flex-col gap-2 content-center h-[90%]">
            <CardBody className="flex flex-col items-stretch gap-2">
              <div className="self-center">
                <Image
                  isBlurred
                  src={url}
                  alt="book image cover"
                  className="h-96 object-cover self-center"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-content4">Description</h3>
                <p className="text-sm">Book description.</p>
              </div>
            </CardBody>
          </Card>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
