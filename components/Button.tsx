type ButtonProps = {
	text: React.ReactNode;
	type?: React.HTMLInputTypeAttribute;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className: string;
};

const Button: React.FC<ButtonProps> = ({ text, type, disabled, onClick, className }) => {
	return (
		<button onClick={onClick} className={`btn ${className}`}>
			{text}
		</button>
	);
};

export default Button;
