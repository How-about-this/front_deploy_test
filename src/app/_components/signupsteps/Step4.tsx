"use client";

import { useState, ChangeEvent} from 'react';
import CustomNumberInput from '../../_components/customNum';
import StepIndicator from '../../_components/stepIndicator';
import NavigationButtons from './navigationbuttons/NavigationButtons';

const mbtiTypes = ['INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'INTJ', 'INTP', 'ENTJ', 'ENTP', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
const religionTypes = ['기독교', '불교', '천주교', '이슬람', '기타', '무교'];
const drinkingTypes = ['알쓰', '평균', '술고래'];
const smokeTypes = ['흡연', '비흡연']
import { FormData } from '@/app/(route)/signup/page';

interface Step4Props {
    nextStep: () => void;
    prevStep: () => void;
    updateFormData: (data: Partial<FormData>) => void;
    formData: Partial<FormData>;
}

const Step4: React.FC<Step4Props> = ({ nextStep, prevStep, updateFormData, formData }) => {
    const [showAllMbti, setShowAllMbti] = useState<boolean>(false);
    const [selectedMbti, setSelectedMbti] = useState<string | undefined>(undefined);
    const [selectedReligion, setSelectedReligion] = useState<string | undefined>(undefined);
    const [selectedDrinking, setSelectedDrinking] = useState<string | undefined>(undefined);
    const [smoke, setSmoke] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(170);
    const [weight, setWeight] = useState<number>(70);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data: FormData = {
            height,
            weight,
            mbti: selectedMbti,
            religion: selectedReligion,
            drinkAmount: selectedDrinking,
            smoke
        };
        updateFormData(data);
        nextStep();
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-12 bg-white shadow-md rounded-lg border-4 border-red-300">
                <StepIndicator currentStep={4} />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <label htmlFor="additional-info" className="block text-4xl text-center mb-10">추가 정보</label>
                    <div className="text-center">
                        <label htmlFor="physical-specs" className="block text-2xl mb-2">신체 스펙</label>
                        <div className="flex justify-center items-center space-x-8">
                            <div className="flex flex-col items-center">
                                <CustomNumberInput
                                    id="height"
                                    name="height"
                                    initialValue={175}
                                    unit="cm"
                                    value={height}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setHeight(Number(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <CustomNumberInput
                                    id="weight"
                                    name="weight"
                                    initialValue={80}
                                    unit="kg"
                                    value={weight}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setWeight(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <label htmlFor="mbti" className="mt-10 mb-4 block text-2xl">MBTI</label>
                        <div className="grid grid-cols-4 gap-2">
                            {mbtiTypes.slice(0, showAllMbti ? mbtiTypes.length : 4).map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setSelectedMbti(type)}
                                    className={`py-1 px-2 border-2 border-red-300 rounded-2xl text-sm ${selectedMbti === type ? 'bg-red-300 text-white' : 'bg-white text-black'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center mt-2">
                            <button
                                type="button"
                                onClick={() => setShowAllMbti(!showAllMbti)}
                                className="text-sm text-gray-500 focus:outline-none"
                            >
                                {showAllMbti ? '닫기[x]' : '...'}
                            </button>
                        </div>
                    </div>
                    <div className="text-center">
                        <label htmlFor="religion" className="block text-2xl mb-4">종교</label>
                        <div className="grid grid-cols-3 gap-2">
                            {religionTypes.map((religion) => (
                                <button
                                    key={religion}
                                    type="button"
                                    onClick={() => setSelectedReligion(religion)}
                                    className={`py-1 px-2 border-2 border-red-300 rounded-2xl text-sm ${selectedReligion === religion ? 'bg-red-300 text-white' : 'bg-white text-black'}`}
                                >
                                    {religion}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="text-center">
                        <label htmlFor="drinking-capacity" className="block text-2xl mb-4">주량</label>
                        <div className="grid grid-cols-3 gap-2">
                            {drinkingTypes.map((drinking) => (
                                <button
                                    key={drinking}
                                    type="button"
                                    onClick={() => setSelectedDrinking(drinking)}
                                    className={`py-1 px-2 border-2 border-red-300 rounded-2xl text-sm ${selectedDrinking === drinking ? 'bg-red-300 text-white' : 'bg-white text-black'}`}
                                >
                                    {drinking}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="text-center">
                        <label htmlFor="drinking-capacity" className="block text-2xl mb-4">흡연 여부</label>
                        <div className="grid grid-cols-2 gap-2">
                            {smokeTypes.map((smokeOrNot) => (
                                <button
                                    key={smokeOrNot}
                                    type="button"
                                    onClick={() => setSmoke(() => smokeOrNot === "비흡연"? false : true)}
                                    className={`py-1 px-2 border-2 border-red-300 rounded-2xl text-sm ${(smoke && smokeOrNot === "흡연") || (!smoke && smokeOrNot === "비흡연") ? 'bg-red-300 text-white' : 'bg-white text-black'}`}
                                >
                                    {smokeOrNot}
                                </button>
                            ))}
                        </div>
                    </div>
                    <NavigationButtons onNext={handleSubmit} onPrevious={prevStep} />
                </form>
            </div>
        </div>
    );
}

export default Step4;
