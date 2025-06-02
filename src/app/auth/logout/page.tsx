'use client';

import {useEffect, useRef} from 'react';
import {useRouter} from 'next/navigation';
import {useAuthStore} from '@/stores/authStore';
import {toast} from 'react-hot-toast';

export default function LogoutPage() {
	const logout = useAuthStore((state) => state.logout);
	const router = useRouter();
	const hasLoggedOut = useRef(false);

	useEffect(() => {
		if (!hasLoggedOut.current) {
			logout();
			toast.success('Sesión cerrada');
			router.push('/login');
			hasLoggedOut.current = true;
		}
	}, [logout, router]);

	return null;
}
