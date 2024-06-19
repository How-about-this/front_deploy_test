"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import StepIndicator from "../../_components/stepIndicator";
import NavigationButtons from './navigationbuttons/NavigationButtons';
import { getData, postData } from '../../api/api';
import { FormData } from '@/app/(route)/signup/FormData';
import useCurrentLocation from '@/app/utils/hooks/getCurrentLoaction';

interface Step5Props {
    nextStep: () => void;
    prevStep: () => void;
    updateFormData: (data: Partial<FormData>) => void;
    formData: Partial<FormData>; // FormData 인터페이스에 맞게 설정 필요
}

export default function Step5({ nextStep, prevStep, updateFormData, formData }: Step5Props) {
    const [agree, setAgree] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>("");
    const { location, error, setCurrentLocation } = useCurrentLocation();
    const router = useRouter();

    useEffect(() => {
        console.log(localStorage.getItem("access_token"));
        const asyncronizedSetter = async () => {
            await setCurrentLocation();
        }

        const setUserIdFirst = async () => {
            const userData = await getData("/users/current", "honjaya");
            setUserId(() => (userData.data.id))
            console.log(userData);
        }

        asyncronizedSetter();
        setUserIdFirst();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (agree) {
            const data = {
                birthday: formData.birthday,
                gender: formData.gender,
                height: formData.height,
                weight: formData.weight,
                mbti: formData.mbti,
                religion: formData.religion,
                drinkAmount: formData.drinkAmount,
                smoke: formData.smoke,
                address: formData.address
            }
            try {
                await postData(`/users/${userId}/profile`, data, "honjaya")
                setIsModalOpen(true);
            } catch (error) {
                console.error('Failed to register user preferences:', error);
                alert('취향 정보를 등록하는 데 실패했습니다.');
            }
        } else {
            console.log(formData)
            alert("위치 정보 제공에 동의해주세요.");
        }
    };

    const setPresentLocation = () => {
        const getLocation = () => {
            try {
                setCurrentLocation();
            }
            catch (error) {
                console.log(error)
            }
        }
        getLocation();
    }

    const handleAgreeButton = () => {
        setPresentLocation();

        if (location.lat === 0 && location.lon === 0) {
            handleAgreeButton();
        }

        setAgree((prev) => {
            if (prev) return false;

            const kakaoLocation = getData(`/local/geo/coord2regioncode.json?x=${location.lon}&y=${location.lat}`, "kakao");
            console.log(kakaoLocation);
            kakaoLocation.then((result) => {
                console.log(result);
                updateFormData({ address: result.documents[0].address_name.split(" ")[1] });
            });
            return true;
        })
    }

    const handleGoToSurvey = () => {
        try {
            localStorage.setItem("user_id", userId);
            router.push('/landing');
        } catch (e) {
            localStorage.removeItem("user_id");
            console.log(e);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-12 bg-white shadow-md rounded-lg border-4 border-red-300">
                <StepIndicator currentStep={4} />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className="block text-4xl text-center mb-40">위치 정보 제공</label>
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleAgreeButton}
                            className={`py-2 px-6 border-4 rounded-lg text-2xl ${agree ? 'border-red-500 bg-red-300 text-white' : 'border-red-300 bg-white text-black'}`}
                        >
                            {agree ? '동의 완료' : '위치 정보 제공에 동의'}
                        </button>
                    </div>
                    <NavigationButtons onNext={handleSubmit} onPrevious={prevStep} />
                </form>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center">
                        <h2 className="text-2xl text-center mb-4">회원 정보 입력이 완료되었습니다.</h2>
                        <button
                            onClick={handleGoToSurvey}
                            className="text-xl font-bold py-1 px-20 border-red-300 rounded-md shadow-sm text-white bg-gradient-to-br from-red-300 via-red-200 to-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                        >
                            취향 조사하러가기
                        </button>
                    </div>
                </div>

            )}
        </div>
    );
}