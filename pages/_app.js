import { Provider } from 'jotai';
import '../styles/globals.css';
import "react-datepicker/dist/react-datepicker.css";
import { store } from '../src/store';
import { AlertProvider } from '../src/hooks/useCustomAlert'
import Alert from '../src/components/Alert';
import ProtectedRoute from '../src/components/ProtectedRoute';

function MyApp({ Component, pageProps }) {
    return (
        <AlertProvider>
            <Provider store={store}>
                <ProtectedRoute>
                    <Component {...pageProps} />
                </ProtectedRoute>
                <Alert />
            </Provider>
        </AlertProvider>
    );
}


export default MyApp
