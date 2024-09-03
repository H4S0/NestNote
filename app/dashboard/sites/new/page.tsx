import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const NewSiteRoute = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Create site</CardTitle>
          <CardDescription>Create your Site here. Click the button below once your done...</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default NewSiteRoute