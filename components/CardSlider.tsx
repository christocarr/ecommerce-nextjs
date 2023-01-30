import React from 'react';

type CardSliderProps = {
	children: React.ReactNode;
};

const CardSlider = ({ children }: CardSliderProps) => {
	return <div className='flex overflow-x-auto mb-4'>{children}</div>;
};

export default CardSlider;
