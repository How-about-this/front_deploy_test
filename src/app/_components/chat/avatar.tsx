import Image from 'next/image';
import React, { useEffect } from 'react'

interface Avatar {
    senderProfile: string;
}

const Avatar: React.FC<Avatar> = ({senderProfile}) => {
    
    useEffect(() => {
        console.log(senderProfile);
    },[])

    return (
        <div className="relative w-12 h-12">
        <Image
            className='rounded-full'
            src={senderProfile}
            layout="fill"
            objectFit="cover"
            alt='partner_profile'
          />
        </div>
    )
}
export default Avatar
