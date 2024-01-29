import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { authUser, token } from '../../store';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const access_token = useAtom(token);
    const user = useAtom(authUser);

    useEffect(() => {
        console.log(!user, !access_token)
        if (user.length === 0 && access_token.length === 0) {
            return router.push('/');
        }
    }, [user, access_token, router]);

    return (user && access_token ? children : null);
};

export default ProtectedRoute;
