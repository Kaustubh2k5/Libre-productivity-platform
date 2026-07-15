import { Routes, Route } from 'react-router-dom';

import { LandingPage } from './app/layouts/landing-page';

import Auth from './app/layouts/Auth';
import OnboardingLayout from './app/layouts/OnboardingLayout';

import AuthLanding from './features/auth/pages/AuthLanding';
import LoginPage from './features/auth/pages/Login';
import SignupPage from './features/auth/pages/Signup';
import ForgotPasswordPage from './features/auth/pages/Forgotpage';
import VerifyPage from './features/auth/pages/VerifyPage';

import Welcome from './features/onboarding/pages/Welcome';
import Profile from './features/onboarding/pages/Profile';
import FocusAssessment from './features/onboarding/pages/FocusAssessment';
import Constraints from './features/onboarding/pages/Constraints';
import GenerateSystem from './features/onboarding/pages/GenerateSystem';
import SandboxShell from './features/sandbox/pages/SandBoxPage';
import DailyTodoPage from './features/todo/pages/DailyTodo';
function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<LandingPage />} />
      {/* Auth */}
      <Route path="/auth" element={<Auth />}>
        <Route index element={<AuthLanding />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="verify" element={<VerifyPage/>} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>
        
        
      {/* Onboarding */}
      <Route path="/onboarding" element={<OnboardingLayout />}>
        <Route index element={<Welcome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="focus-assessment" element={<FocusAssessment />} />
        <Route path="constraints" element={<Constraints />} />
        <Route path="generate-system" element={<GenerateSystem />} />
      </Route>
      {/* Sandbox */}
      <Route path="sandbox" element={<SandboxShell />} />
      {/* Daily Todo */}
      <Route path="dailytodo" element={<DailyTodoPage />} />
    </Routes>
  );
}

export default App;
