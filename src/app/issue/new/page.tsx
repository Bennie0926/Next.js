'use client';
import { Button, Callout, Spinner, Text, TextField } from '@radix-ui/themes'
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import SimpleMDE from 'react-simplemde-editor';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { newIssueSchema } from '@/app/api/issues/validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof newIssueSchema>;
const NewIssue = () => {
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(newIssueSchema)
  });
  const router = useRouter();
  const [err, setErro] = useState('');
  const [submit, setSubmit] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmit(true);
      await axios.post('/api/issues', data);
      router.push('/issue');
    } catch (err) {
      setSubmit(false);
      setErro('An unexpected error!')  
    }
  })
  return (
    <div className='space-y-6'>
      {err && <Callout.Root color='red'>
        <Callout.Text>{err}</Callout.Text>
        </Callout.Root>}
    <form className='space-y-6' onSubmit={onSubmit}>
        <TextField.Root placeholder='text...' {...register('title')}/>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller 
        name='description'
        control={control}
        render={({field})=><SimpleMDE placeholder='description...' {...field}/>}/>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        
        <Button disabled={submit}>Create Issue {submit && <Spinner />}</Button>
    </form>
        </div>
        
  )
}

export default NewIssue