'use client'

import Navigationbar from "@/app/_components/common/Navigationbar";
import KakaoLoginButton from "@/app/_components/buttons/KakaoLoginButton";
import EnterMainButton from "@/app/_components/buttons/EnterMainButton";
import { useSelector } from "react-redux";
import { RootState } from "@/state/reducers/rootReducer";
import { FEATURE_OF_HONJAYA } from "@/app/assets/constants";
import FeatureContainer from "../landing/FeatureContainer";




const Landing = () => {
  const features = Object.entries(FEATURE_OF_HONJAYA);
  const isAuthState = useSelector((state: RootState) => state.authenticationCheck.isAuthed)

  return (
      <div className="flex h-screen w-screen flex-col items-center justify-between bg-white">
        <Navigationbar />
        <div className="w-full h-2"></div>
        <div className="w-full h-full scroll-auto">
          <div className="w-full h-2/5 ">
            <div className='flex rounded-sm items-center justify-end bg-couple-image-1 bg-cover bg-center w-full h-full'>
              {/* 로그인 상태 확인해서 false면 카카오 로그인 버튼 / true면 채팅방 입장 버튼? */}
              <div className="flex justify-center items-center w-1/4 h-3/5 box-border p-10">
                {isAuthState ?  <EnterMainButton /> : <KakaoLoginButton />}
              </div>
            </div>
          </div>
          <div className="w-full h-auto ">
            {features.map((contents, index) => ( 
              <FeatureContainer key={index} index={index} imageFirst={index % 2 === 0} imageUrl={contents[1][0]} contents={contents[1][1]}/>
            ))}
          </div>
      </div>
      </div>
  );
}

export default Landing;