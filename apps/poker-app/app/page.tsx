import LinkBlock from '@/components/Button/LinkBlock'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <LinkBlock to="/play/multi" dark>
        Multiplayer
      </LinkBlock>
      <LinkBlock to="/play/single">Single Player</LinkBlock>
    </div>
  )
}
