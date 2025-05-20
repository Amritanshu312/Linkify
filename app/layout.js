import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from './providers';
import HeadElements from './HeadElements';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Linkify - A Modern Way To Shorten Your URL',
	description: 'name is self explainatory',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<HeadElements />

			<body className={`${inter.variable} antialiased`}>
				<Provider>{children}</Provider>

				<div className="bg-[#281b41] w-80 rotate-180 h-96 fixed top-0 left-14 -z-10 rounded-4xl blur-[100px] max-[600px]:hidden"></div>
				<div className="bg-[#281b41] w-96 rotate-180 h-96 fixed top-0 right-14 -z-10 blur-[180px]"></div>
			</body>
		</html>
	);
}
