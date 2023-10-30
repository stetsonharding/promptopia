'use client'
import React, {useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Form from '@components/Form';

const CreatPrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag:''
  })

  const createPrompt = async (e) => {
e.preventDefault();
setSubmitting(true)
try{
//fetch api here
}catch(error){

}

  }


  return (
<Form 
type='Create'
post={post}
setPost={setPost}
submitting={submitting}
handleSubmit={createPrompt}
/>
  )
}

export default CreatPrompt