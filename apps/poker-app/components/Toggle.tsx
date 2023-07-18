import { cn } from '@easypoker/ui'
import { Switch } from '@headlessui/react'

interface Props {
  enabled: boolean
  onChange(value: boolean): void
}

export const Toggle = ({ enabled, onChange }: Props) => {
  return (
    <Switch.Group>
      <div className="flex justify-center items-center space-x-2">
        <Switch.Label className="text-gray-600 font-light">easy</Switch.Label>
        <Switch
          checked={enabled}
          onChange={onChange}
          className={cn([
            'relative inline-flex h-6 w-11 items-center rounded-full',
            {
              'bg-zinc-600': enabled,
              'bg-gray-200': !enabled,
            },
          ])}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={cn([
              'inline-block h-4 w-4 transform rounded-full bg-white',
              'transform transition ease-in-out duration-200',
              {
                'translate-x-6': enabled,
                'translate-x-1': !enabled,
              },
            ])}
          />
        </Switch>
        <Switch.Label className="text-gray-600 font-light">pro</Switch.Label>
      </div>
    </Switch.Group>
  )
}
