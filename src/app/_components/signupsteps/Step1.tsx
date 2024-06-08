"use client"
import { useState } from "react";
import StepIndicator from '../../_components/stepIndicator';
import NavigationButtons from './navigationbuttons/NavigationButtons';

interface Step1Props {
    nextStep: () => void;
    updateFormData: (data: { name: string }) => void;
}

const Step1: React.FC<Step1Props> = ({ nextStep, updateFormData }) => {
    const [name, setName] = useState<string>("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name) {
            alert("이름을 입력해주세요.");
            return;
        }
        updateFormData({ name });
        nextStep();
    };


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-12 bg-white shadow-md rounded-lg border-4 border-red-300">
                <StepIndicator currentStep={1} />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <label htmlFor="name" className="block text-4xl text-center mb-40">이름이 무엇인가요?</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="여기에 입력하십시오..."
                        className="text-center text-2xl w-full border-b-2 border-pink-500 focus:outline-none focus:border-red-400 placeholder-pink-200"
                    />
                    <div className="flex justify-center mt-0">
                        <span className="m-0 p-0 text-lg">프로필에 표시되는 이름입니다.</span>
                    </div>
                    <NavigationButtons onNext={handleSubmit} disablePrevious={true} />
                </form>
            </div>
        </div>
    );
}

export default Step1;
