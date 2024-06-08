'use client'

import Navigationbar from '@/app/_components/common/Navigationbar'
import { getData } from '@/app/api/api'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {}

const MyPage = (props: Props) => {

  const [profileImage, setProfileImage] = useState<string>("")

  useEffect(() => {
    const getCurrentUserInfo = async () => {
      try{
        const userInfo = await getData("/user/current", "honjaya")
        setProfileImage(userInfo.profileImage);
      } catch (e) {
        console.error(e);
      }

    }
  }
)
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between bg-white">
    <Navigationbar />

    <div className='w-8/10 h-full flex justify-around items-center'>
      <div className='w-4/10 h-full flex flex-col justify-around items-center'>
        <div className='w-full h-6/10 border-main-color border-2'>
          <Image
            src = {profileImage}
            width={500}
            height={700}
            alt='profile_image'/>
        </div>
        <div className='w-full h-2/10 border-main-color border-2 rounded-md'>
          history
        </div>
      </div>
      <div className='w-5/10 h-full flex-col flex justify-center items-center'>
        <div className='w-full h-9/10 border-main-color border-2 rounded-lg'></div>

      </div>
    </div>
    </div>  
  )
}

export default MyPage;