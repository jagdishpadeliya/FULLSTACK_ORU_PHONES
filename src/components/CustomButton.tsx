import React from 'react'
type Params = {
    title: string
}
const CustomButton = ({ title }: Params) => {
    return (
        <span className='bg-violet-100 rounded-full px-3 text-xs py-1'>{title}</span>
    )
}

export default CustomButton