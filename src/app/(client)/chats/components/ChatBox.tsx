import React from 'react'
import { format } from 'date-fns'


// components
import Link from 'next/link'


// import actions
import getCurrentUser from '@/src/actions/getCurrentUser'
import getOtherUserOfChat from '@/src/actions/getOtherUserOfChat'
import getLastMessageOfChat from '@/src/actions/getLastMessageOfChat'


// types
import { ChatType } from '@/drizzle/schema/chat.schema'
interface ChatBoxProps {
    chat: ChatType
}


const ChatBox: React.FC<ChatBoxProps> = async ({ chat }) => {
    const currentUser = await getCurrentUser();
    const otherUser = await getOtherUserOfChat(chat.id);
    const lastMessage = await getLastMessageOfChat(chat.id);

    const lastMessageText = () => {
        if (lastMessage?.text !== null && lastMessage?.image === null) {
            if (lastMessage?.senderId === currentUser?.id) {
                return `You: ${lastMessage.text.slice(0, 25)}` + '...';
            } else {
                return lastMessage.text.slice(0, 25) + '...';
            }
        } else if (lastMessage?.image !== null && lastMessage?.text === null) {
            if (lastMessage?.senderId === currentUser?.id) {
                return 'You sent a photo';
            } else {
                return 'Sent a photo';
            }
        } else {
            return 'No messages yet...';
        }
    }

    return (
        <div className='group duration-200 pr-[1rem] mb-[1rem] last-child:mb-0 last:mb-0'>
            <Link href={`/chats/${chat.id}`} className='flex'>
                <div className='h-[4rem] w-[4rem] mr-[1rem] grid place-items-center border-[0.25rem] border-gray-100 group-hover:border-gray-300 relative rounded-full duration-150'>
                    <span>{ }</span>
                    <span className='absolute h-[1.25rem] w-[1.25rem] right-[-0.2rem] bottom-[-0.2rem] border-[0.25rem] border-white rounded-full bg-[var(--main-green)]'></span>
                </div>

                <div className='flex flex-col justify-center flex-1'>
                    <div className='flex justify-between items-center'>
                        <div className='text-[1.25rem] font-bold'>
                            {otherUser?.name}
                        </div>

                    </div>

                    <div className='flex justify-between items-center'>
                        <p className='text-gray-400 text-[1.25rem]'>
                            {lastMessageText()}
                        </p>
                        <div className='text-gray-400 text-[1.25rem]'>
                            {
                                lastMessage?.createdAt && format(new Date(lastMessage.createdAt), 'h:mm a')
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ChatBox