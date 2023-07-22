'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { decksMap } from '@/modules/game/deck'
import { PlayerStoreType, usePlayer } from '@/modules/game/usePlayer'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import { ModeToggle } from '@easypoker/ui'

import { Button } from '@/components/Button/Button'

const ProfilePage = () => {
  const { data, setPlayer } = usePlayer()
  const navigate = useRouter()

  const onSubmit = (values: PlayerStoreType) => {
    setPlayer(values)
    navigate.back()
  }

  return (
    <main className="container flex-1">
      <div className="flex flex-col items-center">
        <Formik initialValues={data} onSubmit={onSubmit}>
          {({ values }) => {
            return (
              <Form className="max-w-xl">
                <fieldset className="mb-8 flex flex-col items-center">
                  <label
                    htmlFor="username"
                    className="mb-2 text-sm font-semibold"
                  >
                    Setup your username
                  </label>
                  <Field
                    id="username"
                    type="username"
                    name="username"
                    placeholder="username"
                    className="w-64 border p-2"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="font-semibold text-red-700"
                  />
                </fieldset>

                <fieldset className="mb-8 flex flex-col items-center">
                  <label htmlFor="deck" className="mb-2 text-sm font-semibold">
                    Choose your deck
                  </label>
                  <Field
                    id="deck"
                    as="select"
                    name="deck"
                    className="w-64 border p-2"
                  >
                    {Array.from(decksMap).map(([_, value]) => {
                      return (
                        <option key={value.slug} value={value.slug}>
                          {value.name}
                        </option>
                      )
                    })}
                  </Field>
                  <div className="mt-2 text-center underline">
                    <Link href="/profile/decks">All decks</Link>
                  </div>
                </fieldset>

                {values.deck ? (
                  <div className="text-sm">
                    <div className="mb-8 overflow-auto px-8 text-center">
                      <div>
                        <b>Scale:</b>
                      </div>
                      <div>{decksMap.get(values.deck)?.deck.join(', ')}</div>
                    </div>
                    <div className="mb-8 overflow-auto px-4 text-center">
                      <div>
                        <b>Description:</b>
                      </div>
                      <div>
                        {decksMap.get(values.deck)?.name}:{' '}
                        {decksMap.get(values.deck)?.desc}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mt-8 py-6 text-center">
                  <Button type="submit" dark>
                    Save
                  </Button>
                </div>
              </Form>
            )
          }}
        </Formik>

        <ModeToggle />
      </div>
    </main>
  )
}

export default ProfilePage
