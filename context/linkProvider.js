'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from './authProvider';

const LinkContext = createContext(null);

export function LinkProvider({ children }) {
	const { status } = useAuth();

	const [isCreateLinkPopup, setIsCreateLinkPopup] = useState(false);
	const [linkLoading, setLinkLoading] = useState(true);

	const [links, setLinksState] = useState(() => {
		if (typeof window === 'undefined') {
			return { data: [] };
		} try {
			const raw = localStorage.getItem('links');
			if (!raw || raw === 'undefined') return { data: [] }
			return JSON.parse(raw) || { data: [] };
		} catch (e) {
			console.warn('Failed to parse localStorage "links":', e);
			return { data: [] };
		}
	});


	const [page, setPage] = useState(links?.currentPage || 1);

	// Wrapper to persist `links` to localStorage on set
	const setLinks = (data) => {
		setLinksState(data);
		localStorage.setItem('links', JSON.stringify(data));
	};

	useEffect(() => {
		if (status !== 'authenticated') return;

		const controller = new AbortController();
		const signal = controller.signal;
		let isMounted = true;

		const fetchLinks = async () => {
			setLinkLoading(true);
			try {
				const res = await fetch(`/api/user/links/list?page=${page}&perpage=6`, {
					signal,
				});

				if (!res.ok) {
					toast.error(`Links Fetch Failed with status ${res.status}`);
					throw new Error(`API request failed with status ${res.status}`);
				}

				const data = await res.json();
				if (!data || typeof data !== 'object') return;

				if (data.data.length === 0 && page > 1 && data.currentPage > 1) {
					setPage(1);
				}

				if (isMounted) {
					setLinks(data);
					console.log('Links synced from server:', data);
				}
			} catch (error) {
				if (error.name !== 'AbortError') {
					console.error('Error fetching user info:', error);
					toast.error('Failed to load user info.');
				}
			} finally {
				if (isMounted) setLinkLoading(false);
			}
		};

		fetchLinks();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [status, page]);

	return (
		<LinkContext.Provider
			value={{
				isCreateLinkPopup,
				setIsCreateLinkPopup,
				links,
				setLinks,
				linkLoading,
				setLinksState,
				setPage,
				page,
			}}
		>
			{children}
		</LinkContext.Provider>
	);
}

export const useLink = () => {
	const context = useContext(LinkContext);
	if (!context) {
		throw new Error('useContext must be used within a LinkProvider');
	}
	return context;
};
