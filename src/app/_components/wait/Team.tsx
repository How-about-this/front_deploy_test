import React from 'react'
import { teamInfo } from './Containers'; //

type Props = {
    object: teamInfo;
}

const Team = ({object}: Props) => {
  return (
    <div className="w-1/5 h-2/5 mx-5 py-1 bg-gray-200 box-border shadow-lg rounded-md" >Team</div>
  )
}

export default Team