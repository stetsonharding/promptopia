'use client'

import {useState} from 'react'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({key, post, handleClickTag, handleEdit, handleDelete}) => {


const [isPostCopied, setIsPostCopied] = useState("false")
const {data:session} = useSession();
const pathName = usePathname();
const router = useRouter();


const handleCopy = () => {
  setIsPostCopied(post.prompt)
  navigator.clipboard.writeText(post.prompt)
  setTimeout(() => {
    isPostCopied("")
  }, 3000);
}




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
    <div className="copy_btn" onClick={handleCopy}>
      <Image 
      src={isPostCopied === post.prompt ? `/assets/icons/tick.svg` : "/assets/icons/copy.svg"}
      width={12}
      height={12}
      />
    </div>
  </div>

  <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
  {session?.user.id === post.creator._id && pathName === '/profile' && (
    <div className="flex-center mt-5 pt-3 gap-3">
      <p className="green_gradient text-sm font-inter cursor-pointer" onClick={handleEdit}>Edit</p>
      <p className="orange_gradient text-sm font-inter cursor-pointer" onClick={handleDelete}>Delete</p>
    </div>
  )}
  <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleClickTag && handleClickTag(post.tag)} > {post.tag}</p>
  </div>
  )
}

export default PromptCard