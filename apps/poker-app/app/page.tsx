import { Button } from 'ui'

import LinkBlock from '@/components/Button/LinkBlock'
import { Welcome } from '@/components/Welcome'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Welcome />
      <Button />
      <LinkBlock to="play">Play</LinkBlock>
    </div>
  )
}
