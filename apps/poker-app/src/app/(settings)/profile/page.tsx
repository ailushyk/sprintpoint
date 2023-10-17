import React from 'react'

import { Separator } from '@easypoker/ui'

import { api } from '@/lib/api/api'
import { AppearanceForm } from '@/app/(settings)/profile/_components/appearance-form'
import { ProfileForm } from '@/app/(settings)/profile/_components/profile-form'

export const metadata = {
  alternates: {
    canonical: '/profile',
  },
}

export default async function ProfilePage() {
  const user = await api().user.me()
  return (
    <main className="container flex-1 space-y-16 pb-24">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />

        <ProfileForm defaultValues={user} />
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app. Automatically switch between
            day and night themes.
          </p>
        </div>
        <Separator />
        <AppearanceForm
          defaultValues={{
            theme: user.theme,
          }}
        />
      </div>
    </main>
  )
}
