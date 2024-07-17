import { useState } from 'react'

import { Button } from './components/ui/button'
import Header from './components/Header'
import SideNavbar from './components/SideNavbar'
import IconController from './components/IconController'
import BackgroundController from './components/BackgroundController'
import LogoPreview from './components/LogoPreview'
import Ads from './components/Ads'
import { UpdateStorageContext } from './Context/UpdateStorageContext'

function App() {

  const [activeState , setActiveState] = useState(0)
  const [updateStorage,setUpdateStorage] = useState({})
  const [downloadLogo,setDownloadLogo] = useState()

  return (
    <UpdateStorageContext.Provider value={{updateStorage , setUpdateStorage}}>
    <>
      
      <Header DownloadLogo={setDownloadLogo}/>
      <div className = 'w-64 fixed'>
        <SideNavbar selectedIndex={(value)=>
          setActiveState(value)
        }/>
      </div>
      <div className='ml-64 grid grid-cols-1 md:grid-cols-6'>
        <div className = 'md:col-span-2 border h-screen p-5 overflow-auto'>
          {activeState === 0? <IconController/> : <BackgroundController/> }
        </div>
        <div className='md:col-span-4 border-h-screenr'>
          <LogoPreview downloadLogo={downloadLogo}/>
        </div>
        {/* <div className='md:col-span-1 bg-gray-700'>
          <Ads/>
        </div> */}
      </div>

    </>
    </UpdateStorageContext.Provider>
  )
}

export default App
