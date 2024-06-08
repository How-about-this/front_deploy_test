"use client";
import { useState } from 'react';
import { submitFormData } from '../../api/api';
import Step1 from '../../_components/signupsteps/Step1';
import Step2 from '../../_components/signupsteps/Step2';
import Step3 from '../../_components/signupsteps/Step3';
import Step4 from '../../_components/signupsteps/Step4';
import Step5 from '../../_components/signupsteps/Step5';

// "?"를 사용하여 초기상태에 모두 존재하지 않아도 오류가 발생하지 않는다.
export interface FormData {
  name?: string;
  birthday?: string;
  gender?: string;
  height?: number;
  weight?: number;
  mbti?: string;
  religion?: string;
  drinkAmount?: string;
  smoke?: boolean;
  address?: string;
  location_agreement?: boolean;
}

const SignupPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Partial 타입은 FormData를 부분적으로 업데이트 가능
  // 이는 수정이 필요할 때, 그 수정필요한 데이터만 업데이트 되게 부분적인 처리가 가능하다.
  const updateFormData = (newData: Partial<FormData>) => {
     setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmit = async () => {
    try {
      await submitFormData(formData);
      console.log("Data submitted successfully");
    } catch (error) {
      console.error('Failed to submit data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      {step === 1 && <Step1 nextStep={nextStep} updateFormData={updateFormData} />}
      {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 3 && <Step3 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
      {step === 4 && <Step4 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData}/>}
      {step === 5 && <Step5 nextStep={handleSubmit} prevStep={prevStep} updateFormData={updateFormData} formData={formData}/>}
    </div>
  );
}

export default SignupPage;
