type ButtonProps = {
	text: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
	return <button onClick={onClick}>{text}</button>;
};

export default Button;
