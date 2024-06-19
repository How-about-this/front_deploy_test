// src/app/_utils/api.ts
import { FormData } from "../(route)/signup/FormData";

// API 기본 URL 설정
// 백엔드를 거쳐서 카카오 api 사용 => baseUrl 사용 => 로그인 쪽
// 클라이언트단에서 직접 카카오 api 사용 => kakaUrl 맵 api ()
const baseURL = "http://localhost:8080/api";
const kakaoURL = "https://dapi.kakao.com/v2";
const groupChatURL = "http://localhost:8081";

// 요청 전에 토큰을 헤더에 추가하는 함수
const setHeaders = (dest: any) => {
  const token = localStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "",
  };
  if (token && dest !== "groupChat") {
    //카카오맵 api를 사용하는 경우는 이미 auth 통과된 상황에서만
    //필요하기 때문에 token 조건문 내에서 다시 분기해줘도됨(ex. auth 통과 + 서비스 미가입 or 대기페이지에서 현재 위치 새로고침)
    headers["Authorization"] =
      dest === "honjaya"
        ? `Bearer ${token}`
        : `KakaoAK ${process.env.NEXT_PUBLIC_REST_API_KEY}`;
  }
  return headers;
};

// GET 요청 메서드
export const getData = async (endpoint: any, dest: any) => {
  try {
    const response = await fetch(
      `${
        dest !== "groupChat"
          ? dest === "honjaya"
            ? `${baseURL}${endpoint}`
            : `${kakaoURL}${endpoint}`
          : `${groupChatURL}${endpoint}`
      }`, 
      {
        method: "GET",
        headers: setHeaders(dest),
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(
        `Failed to get data from ${endpoint}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to get data from ${endpoint}:`, error);
    throw error;
  }
};

// POST 요청 메서드
export const postData = async (endpoint: any, data: any, dest: any) => {
  try {
    const response = await fetch(
      `${
        dest !== "groupChat"
          ? dest === "honjaya"
            ? `${baseURL}${endpoint}`
            : `${kakaoURL}${endpoint}`
          : `${groupChatURL}${endpoint}`
      }`,
      {
        method: "POST",
        headers: setHeaders(dest),
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to post data to ${endpoint}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to post data to ${endpoint}:`, error);
  }
};

// PUT 요청 메서드
export const putData = async (endpoint: any, data: any, dest: any) => {
  try {
    const response = await fetch(
      `${
        dest !== "groupChat"
          ? dest === "honjaya"
            ? `${baseURL}${endpoint}`
            : `${kakaoURL}${endpoint}`
          : `${groupChatURL}${endpoint}`
      }`,
      {
        method: "PUT",
        headers: setHeaders(dest),
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to put data to ${endpoint}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to put data to ${endpoint}:`, error);
  }
};

// DELETE 요청 메서드
export const deleteData = async (endpoint: any, dest: any) => {
  try {
    const response = await fetch(
      `${
        dest !== "groupChat"
          ? dest === "honjaya"
            ? `${baseURL}${endpoint}`
            : `${kakaoURL}${endpoint}`
          : `${groupChatURL}${endpoint}`
      }`,
      {
        method: "DELETE",
        headers: setHeaders(dest),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete data to ${endpoint}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to delete data to ${endpoint}:`, error);
  }
};

export const deleteImages = async (endpoint: any, data: any, dest: any) => {
  const response = await fetch(
    `${
      dest === "honjaya" ? `${baseURL}${endpoint}` : `${kakaoURL}${endpoint}`
    }`,
    {
      method: "DELETE",
      headers: setHeaders(dest),
      body: JSON.stringify(data),
    }
  );
  return await response.json();
};

// POST 요청 메서드
export const postWithoutBody = async (endpoint: any, dest: any) => {
  const response = await fetch(
    `${
      dest === "honjaya" ? `${baseURL}${endpoint}` : `${kakaoURL}${endpoint}`
    }`,
    {
      method: "POST",
      headers: setHeaders(dest),
      credentials: "include",
    }
  );
  return await response.json();
};

// FormData를 백엔드에 제출하는 함수
export const submitFormData = async (formData: FormData) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit data: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to submit data:", error);
    throw error;
  }
};

// 현재 로그인된 사용자 정보를 가져오는 API를 호출하고, 이를 기반으로 사용자 ID를 저장하는 로직
export const fetchCurrentUser = async () => {
  const response = await fetch("/users/current");
  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }
  return response.json();
};

export const registerUserPreferences = async (
  userId: string,
  preferences: any
) => {
  const response = await fetch(`/users/${userId}/ideal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preferences),
  });
  if (!response.ok) {
    throw new Error("Failed to register user preferences");
  }
  return response.json();
};

// 백엔드 API 엔드포인트 처리 예시 (추가적인 설정이 필요합니다)
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // 요청 처리 로직 추가
    const { endpoint } = req.body;
    // 백엔드 API 호출 등 필요한 로직을 추가합니다.
    res.status(200).json({ message: "구매 성공" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// 사용자 보유 zem
export const purchaseItem = async (endpoint: string): Promise<void> => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}), // 필요한 경우 추가 데이터를 포함할 수 있습니다.
  });

  if (!response.ok) {
    throw new Error("구매에 실패했습니다. 다시 시도해주세요.");
  }
};

// const baseURL = "/api";

// // GET 요청 함수
// export const getData = async (endpoint: string) => {
//   try {
//     const token = localStorage.getItem("access_token");
//     const response = await fetch(`${baseURL}${endpoint}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { "Authorization": `Bearer ${token}` }), // 토큰이 있을 경우 헤더에 추가
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(`Failed to fetch data from ${endpoint}:`, error);
//     throw error;
//   }
// };

// export default getData;
