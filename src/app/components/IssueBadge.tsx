import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes';
import React from 'react'

const statusMap: Record<Status, {label: string, color:"red" | "green" | "violet"}> = {
  OPEN: {label: "Open", color: "green"},
  CLOSED: {label: "Closed", color: "red"},
  ON_PROGRESS: {label:"On Progress", color: "violet"}
};
const IssueBadge = ({status}: {status: Status}) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default IssueBadge