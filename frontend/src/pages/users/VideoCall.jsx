

import React from 'react'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { useSelector } from 'react-redux';

const VideoCall = () => {
    const location = useLocation();
    const roomId = location.state;
    
   
    const userId = useSelector((state) => state.user.userId.toString());
    const {userName} = useSelector((state)=> state.user )
    console.log("user in video",userName);

    const newMeeting = async( element)=>{
        const appId =592111496;
        const serverSecret = '72b580c42d885d5999b3c380e84556eb';
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
    <div className='px-40 '>
        <div ref={newMeeting}/>
    </div>
  )
}

export default VideoCall

