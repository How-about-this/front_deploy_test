'use client'

import Link from "next/link";
// import Main from "./(route)/main/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {

  const router = useRouter();

  useEffect(() => {
    router.push('/landing')
  }, [router])
  
  //여기서 Link로 각 페이지에 라우팅을 해줘야 하는 건가? 
  //아니면 Main 컴포넌트를 렌더링 해주기만 하면 되는 건가?
  //(Main을 허브로 다른 페이지들로 넘어가는 구조라면 후자가 맞겠지만...)
  return null;
}

export default Home;