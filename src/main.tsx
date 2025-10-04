import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.tsx'
import Luncher from './components/Launcher.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(<Provider store={store}>
    <BrowserRouter><Luncher/></BrowserRouter>
    </Provider>)
