'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { logoutAction } from './auth.actions'

export default function LogoutButton() {

  return (
    <Button variant="outline" size="sm" onClick={logoutAction}>
      <LogOut className="mx-1 h-4 w-4" />Logout
    </Button>
  )
}
