'use client';
import { Button, Text, TextField } from '@radix-ui/themes'
import React from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import SimpleMDE from 'react-simplemde-editor';
import axios from 'axios';

interface IssueForm  {
  title: string,
  description: string,
}
const NewIssue = () => {
  const {register, control, handleSubmit} = useForm<IssueForm>();
  const router = useRouter();
  return (
    <form className='space-y-6' onSubmit={handleSubmit(async (data) => {
      await axios.post('/api/issues', data);
      router.push('/issue');
    })}>
        <TextField.Root placeholder='text...' {...register('title')}/>
        <Controller 
        name='description'
        control={control}
        render={({field})=><SimpleMDE placeholder='description...' {...field}/>}/>

        <Button>Create Issue</Button>
    </form>
  )
}

export default NewIssue