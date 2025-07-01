import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeletion from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utills';


const Chat = () => {

  const { messages, getMessages, isMessagesLoading, selectedUser ,subscribeToMessages,unsubscribeFromMessages} = useChatStore();

  const messageRef=useRef(null);


  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages(selectedUser._id);

    return()=>unsubscribeFromMessages();
  }, [selectedUser._id, getMessages,subscribeToMessages,unsubscribeFromMessages]);

  const {authUser}=useAuthStore();

  useEffect(()=>{
    if(messageRef.current && messages)
       messageRef.current.scrollIntoView({behaviour:"smooth"});
   
  },[messages])

  if (isMessagesLoading)
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeletion />
        <MessageInput />

      </div>

    );

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <div className='flex-1  overflow-y-auto p-4 space-y-4'>

        {messages.map((message)=>(
          <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          ref={messageRef}>
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic ||"/avatar.png" } alt="profile Pic" />


              </div>
            </div>

            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>
                {formatMessageTime(message.createdAt)}
              </time>

              <div className='chat-bubble flex flex-col'>
                {message.image && (
                  <img src={message.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2' />
                )}
                {
                  message.text && <p>{message.text}</p>
                }

              </div>

            </div>
          </div>
         ))}
      </div>


      <MessageInput />

    </div>
  )
}

export default Chat