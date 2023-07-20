import { Control, useWatch } from 'react-hook-form'

import { FormDeckProps } from '@/app/room/_components/deck/Deck'

export const PickedCard = ({
  control,
}: {
  control: Control<FormDeckProps>
}) => {
  const values = useWatch({
    control,
    // name: 'risk', // without supply name will watch the entire form, or ['risk', 'lastName'] to watch both
    // defaultValue: '', // default value before the render
  })

  console.log(values)
  return <p>Watch:</p> // only re-render at the custom hook level, when risk changes
}
