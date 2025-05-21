'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import AuthListener from './AuthListener';
import { AuthProvider } from '@/context/authProvider';
import { Suspense } from 'react';
import CreateLink from '@/components/layout/create-link/CreateLink';
import { LinkProvider } from '@/context/linkProvider';
import { ConfirmProvider } from '@/providers/ConfirmProvider';
import { GlobalUtilsProvider } from '@/providers/GlobalProviders';

export const Provider = ({ children }) => {
	return (
		<>
			<Toaster theme="dark" richColors />
			<SessionProvider>
				<AuthProvider>
					<Suspense fallback={null}>
						<AuthListener />
					</Suspense>

					{/* link provider */}
					<LinkProvider>

						<ConfirmProvider>
							<GlobalUtilsProvider>
								{children}
							</GlobalUtilsProvider>
						</ConfirmProvider>


						<CreateLink />
					</LinkProvider>

				</AuthProvider>
			</SessionProvider>
		</>
	);
};
