'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import SimpleMDE from 'react-simplemde-editor';
import axios from 'axios';
import { error } from 'console';

interface IssueForm  {
  title: string,
  description: string,
}
const NewIssue = () => {
  const {register, control, handleSubmit} = useForm<IssueForm>();
  const router = useRouter();
  const [err, setErro] = useState('');
  return (
    <div className='space-y-6'>
      {err && <Callout.Root color='red'>
        <Callout.Text>{err}</Callout.Text>
        </Callout.Root>}
    <form className='space-y-6' onSubmit={handleSubmit(async (data) => {
      try {
        await axios.post('/api/issues', data);
        router.push('/issue');
      } catch (err) {
        setErro('An unexpected error!')  
      }
    })}>
        <TextField.Root placeholder='text...' {...register('title')}/>
        <Controller 
        name='description'
        control={control}
        render={({field})=><SimpleMDE placeholder='description...' {...field}/>}/>

        <Button>Create Issue</Button>
    </form>
        </div>
        
  )
}

export default NewIssue