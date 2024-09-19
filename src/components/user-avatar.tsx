import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const UserAvatar = ({
  name,
  image,
}: {
  name: string
  image: string | null | undefined
}) => {
  return (
    <Avatar className="h-9 w-9 bg-accent outline outline-1 outline-offset-2 outline-border">
      <AvatarImage
        src={image || ''}
        alt={name}
        className="rounded-full duration-200 animate-in fade-in zoom-in spin-in-12"
      />
      <AvatarFallback className="animate-out fade-out">{name}</AvatarFallback>
    </Avatar>
  )
}
