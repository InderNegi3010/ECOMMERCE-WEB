import React from 'react'

function Title({text1, text2}) {
  return (
    <div className='inline-flex gap-2 items-center mb-2'>
        <p className='text-gray-500'>{text1} <span className='text-gray-700 font-medium'>{text2}</span></p>
        <div className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></div>
    </div>
  )
}

export default Title