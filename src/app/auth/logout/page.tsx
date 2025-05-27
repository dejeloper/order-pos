'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuthStore} from '@/stores/authStore';
import {toast} from 'react-hot-toast';

export default function LogoutPage() {
	const logout = useAuthStore((state) => state.logout);
	const router = useRouter();

	useEffect(() => {
		logout();
		toast.success('Sesión cerrada');
		router.replace('/auth/login');
	}, [logout, router]);

	return null;
}
