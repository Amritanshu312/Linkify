import { PiCursorClick } from 'react-icons/pi';

const LinksItems = () => {
	return (
		<>
			<div className="w-full h-full min-h-36 bg-[linear-gradient(#131a33d4,#0c1227d4,#0c132cd4,#0e152ed4)] border-2 border-[#19203c] flex p-3 px-6 rounded-[6px] items-center justify-between gap-4">
				<div className="flex gap-4 items-center w-full">
					<div className="min-w-12 h-12 rounded-full border border-[#242a50] p-2.5">
						<div className="w-full h-full bg-[linear-gradient(#3a2568,#1c1956,#1a244d,#171747)] rounded-full"></div>
					</div>

					<div className="flex flex-col gap-6 w-full">
						<div className="max-w-56 max-[748px]:max-w-44 max-[653px]:max-w-28 max-[508px]:max-w-16 max-[388px]:max-w-8 w-full h-1.5 rounded-md bg-[#0060d721]"></div>
						<div className="max-w-80 w-full h-1.5 rounded-md bg-[#0060d721]"></div>
					</div>
				</div>

				<div className="max-w-40 max-[430px]:max-w-[5rem] w-full flex items-center gap-1.5 bg-[#1e2744ae] border border-[#323b5fc2] px-2 py-1 rounded-md">
					<span>
						<PiCursorClick />
					</span>
					<div className="w-full flex flex-1 h-1.5 rounded-md bg-[#0060d721]"></div>
				</div>
			</div>

			<div className="w-full h-full min-h-36 bg-[linear-gradient(#131a33d4,#0c1227d4,#0c132cd4,#0e152ed4)] border-2 border-[#19203c] flex p-3 px-6 rounded-[6px] items-center justify-between rotate-1 gap-4">
				<div className="flex gap-6 items-center w-full">
					<div className="min-w-12 h-12 rounded-full border border-[#242a50] p-2.5">
						<div className="w-full h-full flex-1/2 bg-[linear-gradient(#3a2568,#1c1956,#1a244d,#171747)] rounded-full"></div>
					</div>

					<div className="flex flex-col gap-6 w-full">
						<div className="max-w-56 max-[748px]:max-w-40 max-[653px]:max-w-20 max-[486px]:max-w-12 w-full h-1.5 mr-6 rounded-md bg-[#0060d721]"></div>
						<div className="max-w-80 w-full h-1.5  rounded-md bg-[#0060d721]"></div>
					</div>
				</div>

				<div className="max-w-40 max-[430px]:max-w-[4rem] w-full flex items-center gap-1.5 bg-[#1e2744ae] border border-[#323b5fc2] px-2 py-1 rounded-md">
					<span>
						<PiCursorClick />
					</span>
					<div className="w-full flex flex-1 h-1.5 rounded-md bg-[#0060d721]"></div>
				</div>
			</div>
		</>
	);
};

export default LinksItems;
