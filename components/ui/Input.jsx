import clsx from 'clsx';

const Input = ({
	title,
	icon,
	placeholder,
	type,
	targetValue,
	setTargetValue,
	siderounded,
	disabled,
}) => {
	return (
		<div className="flex flex-col gap-2 w-full">
			{title && <span className="ml-1">{title || ''}</span>}
			<div
				className={clsx(
					'flex bg-[linear-gradient(45deg,#0f1632,#0c1227,#0e1530)] border-2 border-[#181f3e] focus-within:border-[#1a2246] p-0.5 w-full items-center gap-2 px-1.5 rounded-md group',
					{ 'rounded-none border-l-0 rounded-tr-md rounded-br-md': siderounded }
				)}
			>
				<span className="text-[#ffffffb7] group-focus-within:text-[#fffffff1]">
					{icon}
				</span>
				<input
					type={type}
					value={targetValue}
					onChange={(e) => setTargetValue(e.target.value)}
					placeholder={placeholder}
					className="outline-none border-none w-full py-1"
					autoComplete="on"
					disabled={!!disabled}
				/>
			</div>
		</div>
	);
};

export default Input;
