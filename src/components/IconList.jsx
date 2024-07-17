import React, { useState , useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { icons, Smile } from 'lucide-react'
import { iconList } from '@/Constants/Icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios'

const Base_URL = 'https://logoexpress.tubeguruji.com'

function IconList({selectedIcon}) {
    const [openDialog,setOpenDialog] = useState(false)
    const storedValue = JSON.parse(localStorage.getItem('value'));
    const [pngIcon , setPngIcon] = useState([])
    const [icon,setIcon] = useState(storedValue?storedValue?.icon:'Smile')

    useEffect (()=>{
        getPngIcons()
    })

    const Icon =( {name,color,size}) => {
        const LucidIcon = icons[name];
        if(!LucidIcon) return;

        return <LucidIcon color={color} size={size}
        
        />
    }

    const getPngIcons = () =>{
        axios.get(Base_URL + '/getIcons.php').then(res=>{
            // console.log(res.data)
            setPngIcon(res.data)
        })
    }

  return (
    <div>
        <div>
        <label>Icon</label>
            <div
            onClick ={()=>setOpenDialog(true)}
            className='bg-gray-300 hover:bg-gray-500 rounded-md w-[40px] h-[40px] p-3 flex justify-between items-center mt-1'>
                {icon?.includes('.png')?
                <img src = {Base_URL + "/png/" +icon} /> :
                <Icon name={icon} color={'#000'} size={20}/>
            }
                
            </div>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        
            < DialogContent>
                <DialogHeader>
                    <DialogTitle>Pick Your Favourite Icon</DialogTitle>
                    <DialogDescription>
                    <Tabs defaultValue="icon" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="icon">Icon</TabsTrigger>
                            <TabsTrigger value="color-icon">Color-Icons</TabsTrigger>
                        </TabsList>
                        <TabsContent value="icon">
                        <div
                        className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-4'>
                            {iconList.map((icon,index)=>(
                            <div
                            onClick={()=>{selectedIcon(icon);setOpenDialog(false);setIcon(icon)}}
                            className='flex justify-center items-center border p-3 rounded-sm cursor-pointer' key={index}
                            >
                                <Icon name={icon} color={'#000'} size={20}/>
                            </div>   
                            ))}
                        </div>
                        </TabsContent>
                        <TabsContent value="color-icon">
                        <div
                        className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-4'>
                            {pngIcon.map((icon,index)=>(
                            <div
                            onClick={()=>{selectedIcon(icon);setOpenDialog(false);setIcon(icon)}}
                            className='flex justify-center items-center border p-3 rounded-sm cursor-pointer' key={index}
                            >
                                <img src={Base_URL + "/png/" + icon}/>
                            </div>   
                            ))}
                        </div>
                        </TabsContent>
                    </Tabs>

                        
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
 
    </div>
    

  )
}

export default IconList