import { Route, Routes } from "react-router";
import axios from 'axios'

import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";

const App = () => {

  const {data, isLoading, error} = useQuery({queryKey: ['todos'],

    queryFn: async ()=>{
      const res = await axiosInstance.get('/auth/me')
      return res.data;
    },
    retry: false,
  })

console.log(data);
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/notifications' element={<NotificationsPage />} />
        <Route path='/call' element={<CallPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
