import { UpdateStorageContext } from '@/Context/UpdateStorageContext'
import html2canvas from 'html2canvas'
import { icons } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'

const Base_URL = 'https://logoexpress.tubeguruji.com'

function LogoPreview({downloadLogo}) {

    const [storageValue,setStorageValue] = useState({})
    const {updateStorage , setUpdateStorage} = useContext(UpdateStorageContext)
    

    useEffect(() => {
        const storageData = JSON.parse(localStorage.getItem('value'))
        setStorageValue(storageData)
    }, [updateStorage])

    useEffect(() =>{
        if(downloadLogo){
            dowloadPNGLogo()
            console.log('Hello')
        }
    } ,[downloadLogo])

    //used to download the logo in png format

    const dowloadPNGLogo = () =>{
        const downloadLogoDiv = document.getElementById('downloadLogoDiv')

        html2canvas(downloadLogoDiv,{
            backgroundColor:null
        }).then(canvas=>{
            const pngImage = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngImage;
            downloadLink.download='LogoMaker_Adarsh.png';
            downloadLink.click()
        })
    }



    const Icon =( {name,color,size,rotate}) => {
        const LucidIcon = icons[name];
        if(!LucidIcon) return;

        return <LucidIcon color={color} size={size}
        style = {{
            transform : `rotate(${rotate}deg)`
        }}
        />
    }

  return (
    <div className='flex items-center justify-center h-screen'>
        <div
        style ={{
            padding : storageValue.bgPadding
        }}
         className='h-[500px] w-[500px] bg-gray-300 outline-dotted outline-gray-500'>
            <div 
            id='downloadLogoDiv'
            className='w-full h-full flex items-center justify-center'
            style = {{
                borderRadius : storageValue?.bgRounded,
                background : storageValue?.bgColor
            }}
            >

                {storageValue?.icon?.includes('.png')?
                <img src ={"/png/"+ storageValue?.icon} 
                style={{
                    height : storageValue?.iconSize,
                    width : storageValue?.iconSize
                }} /> :
             
                <Icon
                name = {storageValue?.icon}
                color = {storageValue?.iconColor}
                size = {storageValue?.iconSize}
                rotate = {storageValue?.iconRotate}
                />
            }
                   

            </div>
        </div>
    </div>
  )
}

export default LogoPreview