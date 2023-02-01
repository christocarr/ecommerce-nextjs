import React from 'react';
import { IProduct } from '../types/product';
import { useAppContext } from '../context/state';
import { Button } from '.';

type CartDetailProps = {
	children: React.ReactNode;
};

const CartDetail = ({ children }: CartDetailProps) => {
	return <div className='flex justify-between items-center py-2'>{children}</div>;
};

export default CartDetail;
