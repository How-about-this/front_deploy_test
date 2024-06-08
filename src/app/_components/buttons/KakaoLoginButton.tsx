"use client";

import Link from "next/link";

const KakaoLoginButton = () => {

    return (
        <div className="flex w-4/5 h-4/5">
            <Link
                href="https://k2b3bc621690aa.user-app.krampoline.com/api/oauth2/authorization/kakao"
                className="z-10 w-full flex h-full rounded-sm text-base bg-yellow-300 p-1">
                <div
                    className="w-1/4 h-full bg-kakao-logo bg-auto bg-no-repeat bg-center bg-yellow-300"
                >
                </div>
                <div className="w-3/4 h-full flex justify-center items-center">
                    카카오 로그인
                </div>
            </Link>
        </div>
    )
}
export default KakaoLoginButton;
