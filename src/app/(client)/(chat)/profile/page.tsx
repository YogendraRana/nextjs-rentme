"use client"

import React from 'react'

// import components
import Empty from '@/components/util/Empty'

// import hooks
import useChat from '@/hooks/useChat'


const ProfilePage = () => {
    const { isChatOpen } = useChat();

    return (
        <div className={`
            h-full
            flex-1
            ${isChatOpen ? 'hidden' : 'block'}
        `}>
            <Empty />
        </div>
    )
}

export default ProfilePage