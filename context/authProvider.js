'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession as useNextAuthSession } from 'next-auth/react';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const { data: session, status } = useNextAuthSession();
	const [userInfo, setUserInfo] = useState({});
	const [fetchLoading, setFetchLoading] = useState(true);

	useEffect(() => {
		if (status !== 'authenticated') return;

		const controller = new AbortController();
		const signal = controller.signal;
		let isMounted = true;

		const fetchUserInfo = async () => {
			setFetchLoading(true);
			try {
				const res = await fetch('/api/user/info', { signal });

				if (!res.ok) {
					toast.error(`User Fetch Failed with status ${res.status}`);
					throw new Error(`API request failed with status ${res.status}`);
				}

				const data = await res.json();
				if (!data || typeof data !== 'object') return;

				setUserInfo(data);
			} catch (error) {
				if (error.name !== 'AbortError') {
					console.error('Error fetching user info:', error);
					toast.error('Failed to load user info.');
				}
			} finally {
				if (isMounted) setFetchLoading(false);
			}
		};

		fetchUserInfo();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [status]);

	return (
		<AuthContext.Provider
			value={{
				session,
				status,
				userInfo,
				fetchLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
