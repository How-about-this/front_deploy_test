import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Partner = ({ object }: any) => {
  const [partnerProfile, setPartnerProfile] = useState<string>("")
  const [roomId, setRoomId] = useState<string>("")
  const [remainHour, setRemainHour] = useState<number>()
  const [remainMinute, setRemainMinute] = useState<number>()

  useEffect(() => {
    const now = new Date().getTime();
    const createdAt = new Date(object.createdAt).getTime();
    const remain_time_by_second = (86400000 - (now - createdAt)) / 1000
    setRemainHour(Math.floor(remain_time_by_second / 3600)); // 시간 계산
    setRemainMinute(Math.floor((remain_time_by_second % 3600) / 60)); // 분 계산

    if (object.participants[0].id.toString() === localStorage.getItem("user_id")) {
      setPartnerProfile(() => object.participants[1].profileImageUrl);
    } else {
      setPartnerProfile(() => object.participants[0].profileImageUrl);
    }
  }, [object])

  return (
    <div className="w-1/5 h-2/5 mx-5 py-1 box-border ">
      <Link className="w-full h-full" href={`/chat/${object.id}`}>
        <div className="relative w-full h-full ">
          <Image
            className='shadow-lg rounded-md border-main-color border-4'
            src={partnerProfile}
            layout="fill"
            objectFit="cover"
            alt='partner_profile'
          />
          <div className='absolute w-full h-full text-end flex flex-row justify-end'>
            <div className='text-sm z-50 w-1/2 h-2/10'>{remainHour} : {remainMinute}</div>
          </div>
        </div>

      </Link>

    </div>
  )
}

export default Partner;
