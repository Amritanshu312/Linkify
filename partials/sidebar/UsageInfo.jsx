import { formatNumber } from '@/utils/Number';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const UsageInfo = ({ data, user }) => {
	return (
		<div className="bg-[#121934] border border-[#30364d] py-3 px-3 flex flex-col gap-4 rounded-lg mt-1">
			<div className="flex justify-between">
				<div className="text-[#e9e9e9eb]">Free Usage</div>
				<div className="cursor-pointer">
					<IoMdInformationCircleOutline size={22} />
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<div className="flex justify-between items-center">
						<div>Links</div>
						<div>
							<span className="text-[#e9e9e9eb]">{data?.totalLinks}</span> of{' '}
							{user?.linksAllowed || 'Null'}
						</div>
					</div>
					<div className="h-10 w-full rounded-full bg-[#03091d] border border-[#232851] px-4 flex items-center">
						<div className="h-[5px] w-full flex gap-2">
							<div className="h-full w-2 rounded-full bg-[#c7dafd]"></div>
							<div className="h-full w-full bg-[#121934] rounded-full overflow-hidden">
								<div
									className={
										'bg-[linear-gradient(45deg,#bcd6fd,#5a8bd7,#3570de)] h-full rounded-full'
									}
									style={{
										width: `${(data?.totalLinks * 100) / user?.linksAllowed || 0 || 0}%`,
									}}
								></div>
							</div>
							<div className="h-full w-2 rounded-full bg-[#3570de]"></div>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex justify-between items-center">
						<div>Clicks</div>
						<div>
							<span className="text-[#e9e9e9eb]">
								{formatNumber(user?.totalClicks || 0)}
							</span>{' '}
							of {formatNumber(user?.maxClicks || 0)}
						</div>
					</div>
					<div className="h-10 w-full rounded-full bg-[#03091d] border border-[#232851] px-4 flex items-center">
						<div className="h-[5px] w-full flex gap-2">
							<div className="h-full w-2 rounded-full bg-[#c7dafd]"></div>
							<div className="h-full w-full bg-[#121934] rounded-full">
								<div className="bg-[linear-gradient(45deg,#bcd6fd,#5a8bd7,#3570de)] w-1/4 h-full rounded-full"></div>
							</div>
							<div className="h-full w-2 rounded-full bg-[#3570de]"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsageInfo;
