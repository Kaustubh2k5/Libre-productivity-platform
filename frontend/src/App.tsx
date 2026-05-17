import { Routes, Route } from 'react-router-dom';

import { LandingPage } from './pages/landing/pages/landing-page';

import Auth from './pages/auth/Auth';
import AuthLanding from './pages/auth/pages/AuthLanding';
import LoginPage from './pages/auth/pages/Login';
import SignupPage from './pages/auth/pages/Signup';
import ForgotPasswordPage from './pages/auth/pages/Forgotpage';
function App() {
  return (
    <Routes>
      {/* Main Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Parent */}
      <Route path="/auth" element={<Auth />}>
        <Route index element={<AuthLanding />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>
    </Routes>
  );
}

export default App;
