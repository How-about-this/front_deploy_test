// src/app/_utils/api.ts
import { FormData } from '../(route)/signup/page';


// API 기본 URL 설정
// 백엔드를 거쳐서 카카오 api 사용 => baseUrl 사용 => 로그인 쪽
// 클라이언트단에서 직접 카카오 api 사용 => kakaUrl 맵 api ()
const baseURL = "/api";
const kakaoURL = 	"https://dapi.kakao.com/v2"

// 요청 전에 토큰을 헤더에 추가하는 함수
const setHeaders = (dest: any) => {
  const token = localStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    "Authorization": ""
  };
  if (token) {
    //카카오맵 api를 사용하는 경우는 이미 auth 통과된 상황에서만 
    //필요하기 때문에 token 조건문 내에서 다시 분기해줘도됨(ex. auth 통과 + 서비스 미가입 or 대기페이지에서 현재 위치 새로고침) 
    headers["Authorization"] = (dest === "honjaya"? `Bearer ${token}` : `KakaoAK ${process.env.NEXT_PUBLIC_REST_API_KEY}`);
  }
  return headers;
};

// GET 요청 메서드
export const getData = async (endpoint : any, dest: any) => {
  try {
    const response = await fetch(`${dest === "honjaya"? `${baseURL}${endpoint}` : `${kakaoURL}${endpoint}`}`, {
      method: "GET",
      headers: setHeaders(dest),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${kakaoURL}${endpoint}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error);
    throw error;
  }
};

// POST 요청 메서드
export const postData = async (endpoint:any, data:any, dest:any) => {
  try {
    const response = await fetch(`${dest === "honjaya"? `${baseURL}${endpoint}` : `${kakaoURL}${endpoint}`}`, {
      method: "POST",
      headers: setHeaders(dest),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to post data to ${endpoint}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to post data to ${endpoint}:`, error);
    throw error;
  }
};

// FormData를 백엔드에 제출하는 함수
export const submitFormData = async (formData: FormData) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Failed to submit data: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Failed to submit data:', error);
        throw error;
    }
};



// 현재 로그인된 사용자 정보를 가져오는 API를 호출하고, 이를 기반으로 사용자 ID를 저장하는 로직
export const fetchCurrentUser = async () => {
    const response = await fetch('/user/current');
    if (!response.ok) {
        throw new Error('Failed to fetch current user');
    }
    return response.json();
};

export const registerUserPreferences = async (userId: string, preferences: any) => {
    const response = await fetch(`/user/${userId}/ideal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
    });
    if (!response.ok) {
        throw new Error('Failed to register user preferences');
    }
    return response.json();
};
