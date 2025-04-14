'use client';
import { motion } from 'framer-motion';

export default function HamburgerButton({ isOpen, setIsOpen }) {
	return (
		<button
			className="relative w-8 h-8 flex items-center justify-end focus:outline-none cursor-pointer"
			onClick={() => setIsOpen((prev) => !prev)}
		>
			{/* Top Line */}
			<motion.span
				className="absolute h-0.5 w-6 bg-white rounded-2xl"
				initial={false}
				animate={
					isOpen
						? { rotate: 45, y: 4, width: '16px' }
						: { rotate: 0, y: -6, width: '24px' }
				}
				transition={{ duration: 0.3 }}
			/>

			{/* Middle Line */}
			<motion.span
				className="absolute h-0.5 w-6 bg-white rounded-2xl"
				initial={false}
				animate={isOpen ? { opacity: 0 } : { opacity: 1, width: '20px' }}
				transition={{ duration: 0.2 }}
			/>

			{/* Bottom Line */}
			<motion.span
				className="absolute h-0.5 w-6 bg-white rounded-2xl"
				initial={false}
				animate={
					isOpen
						? { rotate: -45, y: -6, width: '16px' }
						: { rotate: 0, y: 6, width: '24px', width: '13px' }
				}
				transition={{ duration: 0.3 }}
			/>
		</button>
	);
}
