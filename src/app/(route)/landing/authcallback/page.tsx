'use client'

import { useEffect, useState } from "react";
import { approve, deny } from "@/state/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/reducers/rootReducer";
import Loading from "@/app/_components/common/Loading";
import { useRouter } from "next/navigation";
import { getData } from "@/app/api/api";

const AuthCallBack = () => {
    const [userId, setUserId] = useState<string>("");
    const dispatch = useDispatch();
    const isLogined = useSelector((state: RootState) => state.loginCheck.isLogined);
    const router = useRouter();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        console.log(accessToken);
        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
            const verifyUser = async () => {
                try {
                    const userData = await getData("/users/current", "honjaya");
                    console.log(userData);
                    setUserId(userData.data.id);
                    if (userData.data.status === "NEW") {
                        console.log("deny")
                        dispatch(deny());
                    } else {
                        console.log("approve");
                        dispatch(approve());
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    router.push('/');
                }
            };
            verifyUser();
        }
    }, []);

    useEffect(() => {
            if (isLogined) {
                console.log("her1")
                localStorage.setItem("user_id", userId);
                router.push('/');
            } else {
                console.log("her2")
                router.push('/signup');
            }
    }, [isLogined]);

    return (
        <Loading />
    )
};

export default AuthCallBack;
