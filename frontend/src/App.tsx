import { Routes, Route } from 'react-router-dom';

import { LandingPage } from './features/landing/pages/landing-page';

import Auth from './features/auth/Auth';
import AuthLanding from './features/auth/pages/AuthLanding';
import LoginPage from './features/auth/pages/Login';
import SignupPage from './features/auth/pages/Signup';
import ForgotPasswordPage from './features/auth/pages/Forgotpage';
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
