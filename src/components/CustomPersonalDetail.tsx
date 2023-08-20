"use client"
import React from 'react'
import CustomButton from './CustomButton'

type Params = {
    title: string,
    value: string
}

const CustomPersonalDetail = ({ title, value }: Params) => {
    const [isEdit, setIsEdit] = React.useState(false)
    return (
        <div className='flex flex-col'>
            <label className='text-xs font-bold text-slate-500'>{title}</label>
            <div className='flex justify-between items-center'>
                <span className='mt-2 text-md font-bold text-gray-500'>{value}</span>
                {/* <input type="text" className='w-full border rounded-lg p-2 mt-1' /> */}
                {isEdit ? <CustomButton title='Save' /> : <CustomButton title='Edit' />}
            </div>
        </div>
    )
}

export default CustomPersonalDetail