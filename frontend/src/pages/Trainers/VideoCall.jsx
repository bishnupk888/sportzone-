

import React from 'react'
import { useLocation } from 'react-router-dom';
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { useSelector } from 'react-redux';
const serverSecret = import.meta.env.VITE_ZEGO_CLOUD_SERVER_SECRET
const appId = Number(import.meta.env.VITE_ZEGO_CLOUD_APP_ID)

const VideoCall = () => {
    const location = useLocation();
    const roomId = location.state;
    
    const {userName} = useSelector((state)=> state.user )


    const newMeeting = async( element)=>{
        
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId, 
            serverSecret, 
            roomId, 
            Date.now().toString(),
            userName )

        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container : element,
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton:false,
        })

    }
  return (
    <div className='videocall px-40 '>
        <div ref={newMeeting}/>
    </div>
  )
}

export default VideoCall

