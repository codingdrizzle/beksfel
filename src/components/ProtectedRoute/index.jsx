import { useRouter } from 'next/router';
import { useEffect } from 'react';
//import { useAtomValue } from 'jotai';
//import { token } from '../../store';
import useDecodeToken from '../../hooks/useDecodeToken';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();

    let accessToken
    if (typeof window !== "undefined") accessToken = localStorage.getItem("token") || "";
    const user = useDecodeToken(accessToken)
    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user, router]);

    return <>{children}</>;
};

export default ProtectedRoute;
