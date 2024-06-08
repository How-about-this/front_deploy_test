import React from 'react'
import { partnerInfo } from './Containers'

type Props = {
    object: partnerInfo;
}

const Partner = ({object}: Props) => {
  return (
    <div className="w-1/5 h-2/5 mx-5 py-1 bg-gray-200 box-border shadow-lg rounded-md">Partner</div>
  )
}

export default Partner