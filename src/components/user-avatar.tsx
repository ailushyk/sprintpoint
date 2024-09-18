import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const UserAvatar = ({
  name,
  image,
}: {
  name?: string
  image?: string | null
}) => {
  if (!image) {
    return null
  }

  return (
    <Avatar className="h-9 w-9">
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  )
}
