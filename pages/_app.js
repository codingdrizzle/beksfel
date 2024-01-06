import { Provider } from 'jotai';
import '../styles/globals.css';
import { store } from '../src/store';
import {AlertProvider} from '../src/hooks/useCustomAlert'
import Alert from '../src/components/Alert';

function MyApp({ Component, pageProps }) {
    return (
        <AlertProvider>
            <Provider store={store}>
                <Component {...pageProps} />
                <Alert/>
            </Provider>
        </AlertProvider>
    );
}


export default MyApp
