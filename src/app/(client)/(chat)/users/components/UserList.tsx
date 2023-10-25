import React from 'react'

// import hooks and actions
import { getAllUsers } from '@/actions/getAllUsers'

// import components
import UserBox from './UserBox';

const UserList = async () => {
    const users = await getAllUsers();

    return (
        <div className='h-full w-[var(--mini-sidebar-width)] p-[1rem] flex flex-col'>
            <div className='flex items-center text-[2rem]'>Users</div>

            <hr className='my-[1rem]' />

            <input
                type="text"
                placeholder='Search by name...'
                autoComplete='off'
                className='border-none p-[1rem] mb-[2rem] outline-none rounded-[0.5rem] bg-gray-100'
            />

            <ul className='overflow-y-auto'>
                {
                    users.map((u, index) => (
                        <UserBox key={index} user={u} />
                    ))
                }
            </ul>
        </div>
    )
}

export default UserList;