type ButtonProps = {
	text: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({ text }) => {
	return <button>{text}</button>;
};

export default Button;
