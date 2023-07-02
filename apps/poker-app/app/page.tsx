import LinkBlock from '@/components/Button/LinkBlock'
import { Welcome } from '@/components/Welcome'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Welcome />
      <LinkBlock to="/play/multi" dark>
        Multiplayer
      </LinkBlock>
      <LinkBlock to="/play/single">Single Player</LinkBlock>
    </div>
  )
}
