import { Slider } from './ui/slider'
import React, { useContext, useEffect, useState } from 'react'
import ColorPickerController from './ColorPickerController'
import { UpdateStorageContext } from '@/Context/UpdateStorageContext'

function BackgroundController() {

    const storedValue = JSON.parse(localStorage.getItem('value'));
    const [rounded,setRounded] = useState(storedValue?storedValue?.bgRounded:0)
    const[padding,setPadding] = useState(storedValue?storedValue?.bgPadding:40)
    const [color,setColor] = useState(storedValue?storedValue?.bgColor:'#fff')

    const {updateStorage , setUpdateStorage} = useContext(UpdateStorageContext)

    useEffect(() => {
        const updatedValue = {
            ...storedValue,
            bgRounded : rounded,
            bgPadding : padding,
            bgColor : color
        }
        setUpdateStorage(updatedValue)
        localStorage.setItem('value' , JSON.stringify(updatedValue))

    } ,[rounded , padding , color])

  return (
    <div>
        <div className='py-3'>
            <label className='p-2 flex justify-between items-center'>Rounded <span>{rounded} px</span></label>
            <Slider defaultValue={[rounded]} max={512} step={1} 
            onValueChange = {(e) => setRounded(e[0])}
            />
        </div>
        <div className='py-3'>
            <label className='p-2 flex justify-between items-center'>Padding <span>{padding} px</span></label>
            <Slider defaultValue={[padding]} max={100} step={1} 
            onValueChange = {(e) => setPadding(e[0])}
            />
        </div>
        <div className='py-3'>
            <label className='p-2 flex justify-between items-center'>Background Color</label>
            <ColorPickerController
            colorSelected={(color)=>setColor(color)}/>
        </div>
    </div>
  )
}

export default BackgroundController