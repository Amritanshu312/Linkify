import Input from '@/components/ui/Input';

const InputItem = ({
	title,
	placeholder,
	textBeforeInput,
	siderounded,
	targetValue,
	setTargetValue,
	disabled,
}) => {
	return (
		<div className="mt-8 flex flex-col gap-2">
			<div className="text-[#d2d7df] font-medium text-[15px]">{title}</div>

			<div className="flex items-center h-max">
				{textBeforeInput && (
					<div className="h-10 rounded-tl-md rounded-bl-md bg-[linear-gradient(45deg,#0f1632,#0c1227,#0e1530)] border-2 border-[#181f3e] flex items-center px-3.5 max-w-40 w-full text-center">
						Was.do
					</div>
				)}
				<Input
					placeholder={placeholder}
					siderounded={siderounded}
					targetValue={targetValue}
					setTargetValue={setTargetValue}
					disabled={!!disabled}
				/>
			</div>
		</div>
	);
};

export default InputItem;
