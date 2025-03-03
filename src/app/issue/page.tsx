import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { prisma } from '../../../prisma/client'
import IssueBadge from '../components/IssueBadge'
import delay from "delay";
import IssueNewAction from './new/issueNewAction'


const CreateNewIssue = async() => {
  const issues =  await prisma.issue.findMany();
  await delay(3000);
  return (
    <div className='space-y-6'>
      <IssueNewAction />
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
          {(issues || []).map((issue) => (
        <Table.Row key={issue.id}>
            <Table.Cell>{issue.title} 
              <div className='block md:hidden'><IssueBadge status={issue.status}/></div>
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'><IssueBadge status={issue.status}/></Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
        </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
    </div>
  )
}

export default CreateNewIssue