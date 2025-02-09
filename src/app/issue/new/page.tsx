'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import SimpleMDE from 'react-simplemde-editor';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { newIssueSchema } from '@/app/api/issues/validationSchemas';

type IssueForm = z.infer<typeof newIssueSchema>;
const NewIssue = () => {
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(newIssueSchema)
  });
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
        {errors.title&&<Text color='red' as='p'>{errors.title.message}</Text>}
        <Controller 
        name='description'
        control={control}
        render={({field})=><SimpleMDE placeholder='description...' {...field}/>}/>
        {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
        <Button>Create Issue</Button>
    </form>
        </div>
        
  )
}

export default NewIssue