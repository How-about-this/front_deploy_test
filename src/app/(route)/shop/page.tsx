
'use client';

import ShopNavbar from '@/app/_components/shop/ShopNavbar';
import ZemShop from '@/app/_components/shop/ZemShop';
import { getData } from '@/app/api/api';
import { useEffect } from 'react';


const ShopPage = () => {
  const userId = localStorage.getItem('user_id');
  const accessToken = localStorage.getItem('access_token');
  useEffect(() => {
    const getUserData  = async () => {
      const data = await getData(`/users/${userId}/profile`, "honjaya")
      console.log(data);
    }
    try {
      if(userId && accessToken) {
        getUserData();
      }
    } catch (err) {
      console.log(err);
    }
  })

  return (
    <>
      <ShopNavbar />
      <ZemShop />
    </>
  );
};

export default ShopPage;
