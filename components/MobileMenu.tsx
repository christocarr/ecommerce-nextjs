import Link from 'next/link';

type MenuList = {
	text: string;
	href: string;
};

type MobileMenuProps = {
	isOpen: boolean;
};

const MENU_LIST: MenuList[] = [
	{ text: 'Audio', href: '/audio' },
	{ text: 'Smartphones', href: '/smartphones' },
];

function MobileMenu({ isOpen }: MobileMenuProps) {
	return (
		<ul className='absolute flex flex-col w-full h-full bg-white'>
			{MENU_LIST.map((item) => (
				<Link
					key={item.text}
					href={item.href}
					className='flex flex-col justify-center w-full h-14 text-xl px-4 border-b'
				>
					{item.text}
				</Link>
			))}
		</ul>
	);
}

export default MobileMenu;
