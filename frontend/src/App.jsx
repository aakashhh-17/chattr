import { Navigate, Route, Routes } from "react-router";
import axios from "axios";

import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser.js";

const App = () => {
  
  const {authUser, isLoading} = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnBoarded;

if(isLoading) return <PageLoader />

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? <HomePage /> : <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} /> } />
        <Route path="/signup" element={ !isAuthenticated ? <SignupPage /> : <Navigate to={'/'} />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path="/notifications" element={isAuthenticated ? <NotificationsPage /> : <Navigate to={'/login'} />} />
        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to={'/login'} />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to={'/login'} />} />
        <Route path="/onboarding" element={ isAuthenticated ? (!isOnboarded ? <OnboardingPage /> : (<Navigate to='/' />)) : <Navigate to={'/login'} />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
