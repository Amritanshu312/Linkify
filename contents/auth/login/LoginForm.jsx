'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from '../../../components/ui/Input';
import { HiOutlineMail } from 'react-icons/hi';
import { toast } from 'sonner';

const LoginForm = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email.trim() || !password.trim()) {
			toast.error('Email and password are required!');
			return;
		}

		if (!/^\S+@\S+\.\S+$/.test(email)) {
			toast.error('Invalid email format! Please enter a valid email.');
			return;
		}

		setIsSubmitting(true);
		toast.info('Logging in... Please wait.');

		try {
			const res = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			if (res?.error) {
				toast.error(res.error || 'Invalid credentials. Please try again.');
			} else if (res?.ok) {
				toast.success('Login successful! Redirecting...');
				router.push('/');
			}
		} catch (err) {
			toast.error(err.message || 'Something went wrong. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="relative font-['poppins'] w-full max-w-[22rem] flex flex-col gap-5"
		>
			<Input
				icon={<HiOutlineMail size={20} />}
				placeholder={'example@gmail.com'}
				title={'E-mail'}
				type={'email'}
				targetValue={email}
				setTargetValue={setEmail}
			/>
			<Input
				icon={<HiOutlineMail size={20} />}
				placeholder={'*****'}
				title={'Password'}
				type={'password'}
				targetValue={password}
				setTargetValue={setPassword}
			/>

			<div className="flex items-center justify-center bg-[linear-gradient(180deg,#101733db,#0c1227db,#0e152edb)] border-2 border-[#181f3e] rounded-lg cursor-pointer mt-6 relative group">
				<button
					type="submit"
					className="w-full h-full py-2 cursor-pointer"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Authenticating...' : 'Login Now'}
				</button>

				<div className="w-[98%] h-full bg-[linear-gradient(180deg,#101733db,#0c1227db,#0e152edb)] border-2 border-[#181f3e] rounded-lg absolute -top-[10.9px] left-1/2 -translate-x-1/2 -z-10 group-hover:top-0 duration-200"></div>
				<div className="w-[92%] h-full bg-[linear-gradient(180deg,#101733db,#0c1227db,#0e152edb)] border-2 border-[#181f3e] rounded-lg absolute -top-5 left-1/2 -translate-x-1/2 -z-20 group-hover:top-0 duration-300"></div>
			</div>
		</form>
	);
};

export default LoginForm;
