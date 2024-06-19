import { getData, postData } from '@/app/api/api'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

type Props = {
    setOpenTeamJoinModal: () => void;
}


const TeamJoinModal = ({setOpenTeamJoinModal}: Props) => {
    const [groupObjects, setGroupObjects] = useState<{}>();
    const [currentUser, setCurrentUser] = useState(["", ""]);
    const [existUser, setExistUser] = useState<boolean>()

    useEffect(() => {
  
      const getUserData = async () => {
        try {
          const userData = await getData(`/users/${localStorage.getItem('user_id')}/profile`, 'honjaya')
          console.log(userData.data.name)
          console.log(userData.data.gender)
          setCurrentUser(() => [userData.data.name, userData.data.gender]);
        } catch (error) {
          console.log(error);
        }
      }
  
      const getGroupChatServerUser = async () => {
        try {
          const response = await getData(`/user/${localStorage.getItem('user_id')}`, "groupChat")
          console.log(response.json());
          setExistUser(true) 
        } catch (error) {
          setExistUser(false);
          console.log(error);
        }
      }
  
      getUserData();
      getGroupChatServerUser();
  
    }, [])

      
    useEffect(() => {
        const getGroupObjects = async () => {
            try {
                const response = await getData(`/group/list`, "groupChat");
                console.log("groups:" + response[9].members[0]);
                const objects = response;
                setGroupObjects(() => (objects))
            } catch (e) {
                    console.log(e);
            }
        }
        getGroupObjects();
    }, [])

  
    useEffect(() => {
      if (!existUser && (currentUser[0] !== "") && (currentUser[1] !== "")) {
        console.log(currentUser)
        const data = {
          memberId: localStorage.getItem('user_id'),
          name: currentUser[0],
          gender: (currentUser[1] === "남성" ? "MALE" : "FEMALE"),
        }
  
        console.log(data)
  
        const postGroupChatServerUser = async () => {
          try {
            await postData(`/user`, data, "groupChat")
          } catch (error) {
            console.log(error);
          }
        }
        postGroupChatServerUser();
      }
  
    }, [existUser])


  const exitModal = () => {
    setOpenTeamJoinModal();
  }

  const handleSelectGroup = ({objectLeaderId} : {objectLeaderId: string}) => {
    const mola =  async () => {
        try {
            const userData = await getData(`/user/${localStorage.getItem('user_id')}`, "groupChat");
            const applyerId = userData.id; 
            if(applyerId) 
                {
                    const Data = {
                        leaderUserId: objectLeaderId,
                        invitedUserId: applyerId,
                    }
                    await postData('/user/apply', Data, "groupChat");
                }
        } catch (e) {
            console.log(e)
        }
    }
    mola();
  }

    return (
        <div className="z-20 w-screen h-screen flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
            <form className='z-30 absolute flex-col flex justify-around items-center bg-white w-4/10 h-7/10 border-main-color border-4 rounded-lg'>
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
                <div className='w-full h-9/10 flex-col flex justify-around items-center'>
                <div className='w-8/10 h-7/10 border-2 border-main-color overflow-auto'>
                    {/* {groupObjects?.map((object, index) => (
                        <div className="w-full h-1/10 flex justify-between border-2 hover:border-main-color hover:border-2" key={index}>
                            <button
                                type='button'
                                onClick={() => handleSelectGroup(object.member[0])}
                                className='w-full h-full'
                            >
                                {object.title}
                            </button>
                        </div>
                    ))} */}
                </div>
                </div>

            </form>
        </div>
    )
}

export default TeamJoinModal