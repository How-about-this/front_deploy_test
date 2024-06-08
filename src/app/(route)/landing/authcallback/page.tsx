'use client'

import { useEffect, useState } from "react";
import { approve, deny } from "@/state/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/reducers/rootReducer";
import Loading from "@/app/_components/common/Loading";
import { useRouter } from "next/navigation";
import { getData } from "@/app/api/api";

//next/Router의 useRouter말고, next/navigation의 useRouter를 써야지 클라이언트 사이드에서 네비게이션 기능함
//근데 지금은 Link 쓸 거라 사용x
// import { useRouter } from "next/navigation";




//isAuth(로그인 유지 상태)는 전역 상태로 관리하자. 
//(토큰값을 전역 상태에 저장하려고 생각해보았는데, 토큰 값은  것은 새로고침하면 사라지니, 그냥 로컬 스토리지에 저장하자)
const AuthCallBack = () => {
    const dispatch = useDispatch();
    const [isJoined, setIsJoined] = useState<boolean>(false)
    const isAuthState = useSelector((state: RootState) => state.authenticationCheck.isAuthed)
    const router = useRouter();
    //랜딩 페이지에서 카카오 로그인 => 백에서 주소에 토큰값 넣어서 리다이렉트
    //(보안 상 토큰값은 유저에게 노출 x)
    //토큰 값만 로컬 스토리지에 저장한 후 다시 /main으로 리다이렉팅

    //const accessToken = "";
    //useRouter로 토큰 값 가져와서 리다이렉팅은 불가 => 클라이언트 컴포넌트에서만 사용하는 것은 불가?
    //window객체 사용으로 ㄱ
    //if (typeof window !== 'undefined') {


    // } 



    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        console.log(accessToken);
        // if (typeof window !== 'undefined') {
        if (accessToken) {
            localStorage.setItem('access_token', accessToken);

            const verifyUser = async () => {
                try {
                    const kakaoUserData = await getData("/user/current", "honjaya");

                    const userId = kakaoUserData.data.id;
                    localStorage.setItem('user_id', userId);
                    console.log(userId);
                    setIsJoined(() => {return kakaoUserData.data.status === "new"? false : true})
                    dispatch(approve());
                } catch (error) {
                    console.error("Error fetching user dataff:", error);
                    dispatch(deny());
                    router.push('/landing');
                }
            }     
            verifyUser();
            isJoined? router.push('/landing') : router.push('/signup');
            //윈도우 객체를 사용하려다가 만 이유 -> 윈도우 객체를 통한 리다이렉팅 시 
            // 브라우저의 히스토리 스택을 업데이트 하지 않는다. -> 뒤로 가기 안 먹힘
            // 새로고침 되면서 전역 상태도 초기화된다. 
            // 그래서 dispatch(approve())로 isAuthState가 업데이트 되면서 리렌더링이 되어
            // 채팅 대기 페이지의 둘 중 하나가 렌더링된다.
            // dispatch() 다음 줄에 window 객체 사용해서 리다이렉팅하는 구조로 만들어놨었기 때문에
            // window.location.replace("main");으로 /main 페이지로 또 다시 리다이렉팅
            // 이번에는 새로고침을 하게 되고, 새로고침하면서는 액세스토큰을 받아오지 않기 때문에(kakaologinbutton을 눌러야지 토큰받아옴)
            // 그냥 랜딩 페이지가 렌더링되고 유지된다는 것이다.

            // 추가:
            // main 컴포넌트에서 다른 컴포넌트로 "리다이렉팅"하는 구조가 아닌
            // 컴포넌트내에서 다른 컴포넌트를 import해 렌더링 해주는 구조다 보니
            // useEffect의 accessToken에 대한 의존성도 적용된다.
            //
        }
        // 로그인 유지 x 인 상태(로그인 실패한 경우 && 토큰 만료(로직 만들어야함))
        // 랜딩 페이지로
        // if (!isAuthState) window.location.replace("/landing");
        // }
        //주소에 토큰값 o && 로그인 유지 상태 x면
        //생각해보니 accessToken에 대한 의존성은 필요없을 것 같은데?
        // router.push 하면 어차피 의존성 상관없이 다시 useEffect 불러올 거고,
        // 사실, 그 전에 dispatch(approve())로 전역 상태 변경하면 어차피 리렌더링되는 거 아닌가? 
    }, [])

    //코드 라우팅 구조? 가 너무 복잡해진다.
    //useRouter 사용해서 리다이렉팅하는 방법이 나을 듯.
    return (
        <Loading />
    )
};

//아예 백에서 landing 페이지로 
//

export default AuthCallBack;


