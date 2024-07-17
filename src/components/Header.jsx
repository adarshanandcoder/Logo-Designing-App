import React from 'react'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

function Header({DownloadLogo}) {
  return (
    <div className='w-full p-4 border flex justify-between items-center shadow-sm '>
        <div className='text-primary font-bold text-2xl'>
            LogoMaker
        </div>
        <Button
        onClick = {() => DownloadLogo(Date.now())}
        className='flex items-center gap-2'><Download className='h-4 w-4 '/>Download</Button>
    </div>
  )
}

export default Header