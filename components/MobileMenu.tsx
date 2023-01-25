import Link from 'next/link';
import React from 'react';

type MenuList = {
	text: string;
	href: string;
};

type MobileMenuProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MENU_LIST: MenuList[] = [
	{ text: 'Audio', href: '/audio' },
	{ text: 'Smartphones', href: '/smartphones' },
];

function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
	const handleClick = () => {
		setIsOpen(() => !isOpen);
	};

	return (
		<ul className='absolute flex flex-col w-full h-full bg-white'>
			{MENU_LIST.map((item) => (
				<Link key={item.text} href={item.href} legacyBehavior passHref>
					<a
						onClick={handleClick}
						className='flex flex-col justify-center w-full h-14 text-xl px-4 border-b'
					>
						{item.text}
					</a>
				</Link>
			))}
		</ul>
	);
}

export default MobileMenu;
