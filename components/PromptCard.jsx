'use client'

import {useState} from 'react'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({key, post, handleClickTag, handleEdit, handleDelete}) => {


  console.log(post)

  return (
  <div className="prompt_card">
  <div className="flex justify-between items-start gap-5">
    <div className='justify-start items-center gap-3 cursor-pointer'>
      <Image
      src={post.creator.image}
      alt="user_Image"
      width={40}
      height={40}
      className='rounded-full object-contain'
      />
    </div>
    <div className="w-full">
    <h3 className="text-gray-900 font-satoshi font-bold">{post.creator.username}</h3>
    <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
    </div>
    <div className="copy_btn">
      {/* //Copy image here */}
    </div>
  </div>
  </div>
  )
}

export default PromptCard