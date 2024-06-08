'user client'

import { useState } from "react";
import CustomNumberInput from "../customNum";
import Image from "next/image";

type Props = {
  setOpenTeamCreateModal: () => void;
}

const TeamCreateModal = ({ setOpenTeamCreateModal }: Props) => {
  const [title, setTitle] = useState<string>("")
  const [numOfMembers, setNumoOfMembers] = useState<number>(1);
  const [description, setDescription] = useState<string>("");

  const exitModal = () => {
    setOpenTeamCreateModal();
  }

  return (
    <div className="z-20 w-screen h-screen flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
      <form className='z-30 absolute bg-white w-4/10 h-7/10 border-main-color border-4 rounded-lg flex-col justify-around'>
        
        <div className="w-full h-1/10 flex justify-end box-border p-1">
          <button
            type="button"
            className="w-1/10 h-1/10 bg-gray"
            onClick={exitModal}>
            <Image src={'https://www.svgrepo.com/show/499053/cancel.svg'}
              width={35}
              height={35}
              alt="cancel"
            />

            </button>
        </div>
        <div className="w-full h-9/10 flex-col flex items-center justify-around">
        <input
          type="text"
          placeholder="Title"
          required
          value={String(title)}
          onChange={(e) => setTitle(e.target.value)} //일단 이렇게 해놓고 매 타이핑마다 리렌더링 안 되도록하는 방법 적용 필요
          className=" w-1/2 h-1/10 border-main-color border-b-2 text-center outline-none  "
        ></input>
        <div className="w-1/2 h-2/10 flex justify-center items-center">
          <input
            type="number"
            id="numofmembers"
            name="numofmembers"
            min={1}
            max={3}
            value={numOfMembers}
            onChange={(e: any) => setNumoOfMembers(Number(e.target.value))}
            className="outline-none w-full h-full text-center"
          >
          </input><span>명</span>
          {/* <CustomNumberInput
            id="numofmembers"
            name="numofmembers"
            initialValue={1}
            unit="명"
            value={numOfMembers}
            onChange={(e: any) => setNumoOfMembers(Number(e.target.value))}
            max={3}
            min={1}
          /> */}
        </div>
        <textarea
          placeholder="Description"
          required
          value={String(description)}
          onChange={(e) => setDescription(e.target.value)} //일단 이렇게 해놓고 매 타이핑마다 리렌더링 안 되도록하는 방법 적용 필요
          className=" w-8/10 h-5/10 border-main-color border-2 flex text-center justify-center items-center rounded-xl outline-none"
        ></textarea>
        <button className="w-5/10 h-1/10font-jua text-lg text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl">제출하기</button>
        </div>
      </form>
    </div>
  )
}

export default TeamCreateModal