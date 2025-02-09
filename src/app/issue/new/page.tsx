'use client';
import { Button, Text, TextField } from '@radix-ui/themes'
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => {
  return (
    <div className='space-y-6'>
        <TextField.Root placeholder='text...'/>
        <SimpleMDE placeholder='description...'/>
        <Button>Create Issue</Button>
    </div>
  )
}

export default NewIssue