import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@easypoker/ui'

import { CreateRoomForm } from '@/app/(home)/_components/create-room-form'

export const CreateRoomDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-32">Create Room</Button>
      </DialogTrigger>
      <DialogContent className="abc sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
        </DialogHeader>
        <CreateRoomForm />
      </DialogContent>
    </Dialog>
  )
}
