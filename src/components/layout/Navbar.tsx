"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

// import logo
import logo from "@/assets/icons/logo.png"

// import hook
import useNavlinks from '@/hooks/useNavlinks'

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    
    const navlinks = useNavlinks();

    return (
        <nav className='h-[var(--nav-height)] w-[100%] flex items-center px-[10rem]'>
            <div className='mr-auto text-[2rem]'>
                <Link href='/'>
                    <Image src={logo} height={40} alt='logo' width={40} />
                </Link>
            </div>

            <ul className='flex items-center'>
                {
                    navlinks.map((link, index) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                        return (
                            <li onClick={() => router.push(link.href)} key={index} className='ml-[3rem] py-[0.75rem] text-[1.6rem] cursor-pointer last:bg-[var(--primary-blue)] last:px-[2.5rem] last:rounded-[5rem]'>
                                <p className={`${isActive ? 'font-bold' : 'font-thin'} text-[1.5rem]`}>{link.label}</p>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    )
}

export default Navbar