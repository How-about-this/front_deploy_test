'use client'

import { useState } from 'react';
import Link from 'next/link';
import { postData, postWithoutBody } from '@/app/api/api';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/reducers/rootReducer';
import KakaoLoginButton from '../buttons/KakaoLoginButton';

const Navigationbar = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [myPageOpen, setMyPageOpen] = useState<boolean>(false);
    const isLogined = useSelector((state: RootState) => state.loginCheck.isLogined);
    const router = useRouter();

    const handleMenuHovering = () => {
        setMenuOpen((prevState) => { return !prevState });
    };

    const handleMyPageHovering = () => {
        setMyPageOpen((prevState) => { return !prevState });
    };

    const handleLogout = async () => {
        const response = await postWithoutBody("/logout", "honjaya");
        if (response.status === "error") {
            alert(response.message);
            return;
        }
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        window.location.reload();
    }

    return (
        <div className="flex w-full h-1/10 items-center justify-between text-lg bg-main-color font-jua">
            <div className='relative w-1/12 h-full overflow-hidden'>
                <div className="flex-col animate-slide">
                    <img src='/logo1.png' className="w-auto" alt="로고1" />
                    <img src='/logo2.png' className="w-auto" alt="로고2" />
                    <img src='/logo1.png' className="w-auto" alt="로고1_for_loop" />
                    <img src='/logo2.png' className="w-auto" alt="로고2_for_loop" />
                </div>
            </div>
            <div
                className='relative flex font-light text-white items-center justify-center w-1/12 h-full hover:underline'
                onMouseEnter={handleMenuHovering}
                onMouseLeave={handleMenuHovering}
            >
                Menu
                <div
                    className={`z-20 absolute top-full w-48 shadow transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                >
                    <ul className='-none flex-col text-center justify-center items-center m-0 p-0 text-white'>
                        <li className='px-4 py-2 bg-main-color bg-opacity-70 cursor-pointer outline-none hover:bg-opacity-60 hover:text-xl'>
                            <Link href="/landing">Home</Link>
                        </li>
                        <li className='px-4 py-2 bg-main-color bg-opacity-70 cursor-pointer outline-none hover:bg-opacity-60 hover:text-xl'>
                            <Link href="/wait">Chat</Link>
                        </li>
                        <li className='px-4 py-2 bg-main-color bg-opacity-70 cursor-pointer outline-none hover:bg-opacity-60 hover:text-xl'>
                            <Link href="/shop">Shop</Link>
                        </li>
                        <li className='px-4 py-2 bg-main-color bg-opacity-70 cursor-pointer outline-none hover:bg-opacity-60 hover:text-xl'>
                            <Link href="/board">Board</Link>
                        </li>
                        <li className='px-4 py-2 bg-main-color bg-opacity-70 cursor-pointer outline-none hover:bg-opacity-60 hover:text-xl'>
                            <Link href="/mypage">My Page</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* <div
                className='relative flex font-light text-white items-center justify-center w-1/12 h-full hover:underline'
                onMouseEnter={handleMyPageHovering}
                onMouseLeave={handleMyPageHovering}
            >
                My page
                <div
                    className={`z-20 absolute top-full w-48 shadow transition-all duration-300 ${myPageOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                >
                    <ul className='list-none flex-col text-center justify-center items-center m-0 p-0 text-white'>
                        <li className='px-4 py-2 bg-main-color bg-opacity-70 cursor-pointer outline-none hover:bg-opacity-60 hover:text-xl'>
                            <Link href="/mypage">Edit</Link>
                        </li>
                        <li className='px-4 py-2 bg-main-color bg-opacity-70 cursor-pointer outline-none hover:bg-opacity-60 hover:text-xl'>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div> */}
            {isLogined === true ? (
                <div className='relative flex font-light text-white items-center justify-center w-1/12 h-full hover:underline'>
                <button onClick={handleLogout}>Logout</button>
            </div>
            ) : (
                <KakaoLoginButton />
            )}
        </div>
    );
}

export default Navigationbar;
