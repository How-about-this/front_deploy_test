import React, { useEffect, useState } from 'react'
import Link from 'next/link';

type Props = {
  object: any;
}

const Team = ({ object }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("")
  const [gender, setGender] = useState<string>("");
  const [members, setMembers] = useState<string[]>([])

  useEffect(() => {
    console.log(object)
    const setMetaData = () => {
      setTitle(() => object.title)
      setContent(() => object.content)
      setGender(() => object.gender);
      setMembers(() => object.members);
    }
    setMetaData();
  }, [object])

  return (
    <div className="w-1/5 h-2/5 mx-5 py-1 flex flex-col justify-around bg-gray-200 box-border shadow-lg rounded-md" >
      <Link className="w-full h-full" href={`/chat/${object.id}`}>
        <div>
          {title}
        </div>
        <div>
          {content}
        </div>
      </Link>

    </div>
  )
}

export default Team