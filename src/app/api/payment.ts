// src/api/payment.ts
export const requestPayment = async (payInfoDto: { price: number; itemName: string }) => {
    try {
        const response = await fetch('/api/payment/ready', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payInfoDto)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error payment:', error);
        throw new Error('Payment failed');
    }
};