// 카카오 페이 구매 요청
export const requestPayment = async (payInfoDto: any, userId: number, token: string | null) => {
    const response = await fetch(`http://localhost:8080/api/payment/ready?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payInfoDto),
    });

    if (!response.ok) {
        throw new Error('Payment preparation failed');
    }

    return await response.json();
};

// 현재 보유하고 있는 zem수량
export const getUserZem = async (userId: number, token: string | null): Promise<number> => {
    const response = await fetch(`http://localhost:8080/api/getCoin/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user ZEM');
    }

    const data = await response.json();
    return data.zem;
};


// 해당 아이템을 구매하기 위한 요청
export const purchaseItem = async (endpoint: string, token: string, itemId: number): Promise<void> => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ itemId })
    });
  
    if (!response.ok) {
      throw new Error('구매에 실패했습니다. 다시 시도해주세요.');
    }
  };
  