'use client';
import { Table } from '@radix-ui/themes';
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssueNewAction from './new/issueNewAction';
 


const RoadingSkeleton = () => {
const issues = [1,2,3,4,5,6,7,8,9,10];  
  return (
    <div  className='space-y-6'>
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
          {issues.map(issue => (
            <Table.Row key={issue}>
            <Table.Cell><Skeleton /> 
              <div className='block md:hidden'><Skeleton /></div>
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
            <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
        </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>

          </div>
  )
}

export default RoadingSkeleton