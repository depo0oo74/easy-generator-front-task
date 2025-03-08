import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './porviders/AuthProvider.tsx'

// ** import bootstrap style
import 'bootstrap/dist/css/bootstrap.min.css';

// Toasify imports
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import styles
import '../public/assets/css/style.css'
import '../public/assets/css/style-responsive.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer
      position='top-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='colored'
      limit={1}
      rtl={true}
    />
  </StrictMode>,
)
