'use client';
import { FaBug } from "react-icons/fa";
import Link from 'next/link'
import React from 'react'
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const lists = [
    {label:'Dashboard', href:'/'},
    {label:'Issue', href:'/issue'},
    {label:'Trouble Shoot', href:'/troubleshoot'},
    {label:'About Us', href:'/aboutus'},
  ];
  const navigation = usePathname();
  const {status, data:session} = useSession();
  return (
    <div>
        <ul className={`flex space-x-6 border-b-2 items-center p-6`}>
          <Link href='/'>{<FaBug />}</Link>
          {lists.map((list) => (
            <li key={list.href}><Link href={list.href}  className={classNames({
              'text-zinc-900' : list.href === navigation,
              'text-zinc-500' : list.href !== navigation,
              'hover:text-blue-500 transition-colors' : true
            })}>{list.label}</Link></li>
          ))}
        <Box>
          {status === "authenticated" && (<Link href='/api/auth/signout'>Log out</Link>)}
          {status === "unauthenticated" && (<Link href='/api/auth/signin'>Log in</Link>)}
          </Box>
        </ul>
    </div>
  )
}

export default NavBar