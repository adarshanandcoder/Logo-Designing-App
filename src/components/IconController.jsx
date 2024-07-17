
import { Smile } from 'lucide-react'
import React , {useState,useEffect, useContext} from 'react'
import { Slider } from './ui/slider'
import ColorPickerController from './ColorPickerController'
import { UpdateStorageContext } from '@/Context/UpdateStorageContext'
import IconList from './IconList'

function IconController() {
    const storedValue = JSON.parse(localStorage.getItem('value'));

    const [size , setSize] = useState(storedValue?storedValue.iconSize:256)
    const [rotate , setRotate] = useState(storedValue?storedValue.iconRotate:0)
    const [color , setColor] = useState(storedValue?storedValue.iconColor:'#fff')
    const [icon,setIcon] = useState(storedValue?storedValue?.icon:'Smile')

    
    const {updateStorage , setUpdateStorage} = useContext(UpdateStorageContext)

    useEffect(() => {

        const updatedValue = {
            ...storedValue,
            iconSize:size,
            iconRotate:rotate,
            iconColor:color,
            icon : icon
        }
        setUpdateStorage(updatedValue)
        localStorage.setItem('value' , JSON.stringify(updatedValue));
        
    } ,[size , rotate , color,icon])

  return (
    <div>
        <div>
            
        <IconList selectedIcon={(icon)=>setIcon(icon)}/>
        <div className='py-3'>
            <label className='p-2 flex justify-between items-center'>Size <span>{size} px</span></label>
            <Slider defaultValue={[size]} max={512} step={1} 
            onValueChange = {(e) => setSize(e[0])}
            />
        </div>
        <div className='py-3'>
            <label className='p-2 flex justify-between items-center'>Rotate <span>{rotate}°</span></label>
            <Slider defaultValue={[rotate]} max={360} step={1} 
            onValueChange = {(e) => setRotate(e[0])}
            />
        </div>
        <div className='py-3'>
            <label className='p-2 flex justify-between items-center'>Icon Color</label>
            <ColorPickerController hideController={true}
            colorSelected={(color)=>setColor(color)}/>
        </div>
        </div>
    </div>
  )
}

export default IconController