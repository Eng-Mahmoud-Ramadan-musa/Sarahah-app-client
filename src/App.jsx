import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const HomePage = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const MessagesPage = lazy(() => import('./pages/Messages'));
const ProfilePage = lazy(() => import('./pages/Profile'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const ForgetPasswordPage = lazy(() => import('./pages/ForgetPasswoed'));
const SendMessagePage = lazy(() => import('./pages/SendMessage'));

function App() {

  return (
    <Router>
      <div className="flex flex-col h-screen w-full">
        <main className="overflow-y-auto w-full bg-slate-900 h-full">
          <Suspense fallback={<div className="text-white text-center mt-10">جاري التحميل...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/forget-password" element={<ForgetPasswordPage />} />
              <Route path="/send-message" element={<SendMessagePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App
