import React from 'react'

import { Separator } from '@easypoker/ui'

import { api } from '@/lib/api'
import { ProfileForm } from '@/app/profile/_components/profile-form'

const ProfilePage = async () => {
  const user = api().user.get()
  return (
    <main className="container flex-1">
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
    </main>
  )
}

export default ProfilePage
