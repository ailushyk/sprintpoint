import React from 'react'

import { Separator } from '@easypoker/ui'

import { api } from '@/lib/api'
import { AppearanceForm } from '@/app/profile/_components/appearance-form'
import { ProfileForm } from '@/app/profile/_components/profile-form'

const ProfilePage = async () => {
  const user = api().user.get()
  return (
    <main className="container flex-1 space-y-16 pb-24">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-muted-foreground text-sm">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />

        <ProfileForm defaultValues={user} />
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-muted-foreground text-sm">
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

export default ProfilePage
