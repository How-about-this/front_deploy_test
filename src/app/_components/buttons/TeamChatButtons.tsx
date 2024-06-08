'use client'

import Image from "next/image";
import TeamCreateModal from "../wait/TeamCreateModal";

type Props = {
    openTeamCreateModal: boolean;
    setOpenTeamCreateModal: () => void;
}

const TeamChatButtons = ({ openTeamCreateModal, setOpenTeamCreateModal }: Props) => {

    const matchTeam = () => {
        matchTeam
    }

    return (
        // <div className="w-full h-full flex justify-center items-center">
        //     <button
        //         className="w-1/10 h-5/10 flex justify-center"
        //         onClick={setOpenTeamCreateModal}>
        //         <Image src="https://www.svgrepo.com/show/498940/add-circle.svg" width={40} height={40} alt="Team Create Button" />
        //     </button>
        //     {openTeamCreateModal && <TeamCreateModal setOpenTeamCreateModal={setOpenTeamCreateModal}/>}
        // </div>
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-1/2 h-1/2 flex justify-around items-center">
                <button
                    className=" w-4/10 h-full font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                    onClick={setOpenTeamCreateModal}
                >
                    팀 생성
                </button>
                <button
                    className=" w-4/10 h-full font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                    onClick={matchTeam}
                >
                    팀 가입
                </button>
            </div>
            {openTeamCreateModal && <TeamCreateModal setOpenTeamCreateModal={setOpenTeamCreateModal} />}
        </div>
    )
}

export default TeamChatButtons;