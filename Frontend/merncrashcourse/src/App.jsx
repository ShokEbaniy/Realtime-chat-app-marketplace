import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import CreateProductPage from "./Pages/CreateProductPage.jsx";
import Navbar from "./Components/Navbar.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import LoginPage from "./Pages/LoginPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import SettingsPage from "./Pages/SettingsPage.jsx";
import { Loader } from "lucide-react";
import { useThemesStore } from "./store/useThemesStore.js";
import ChatsPage from "./Pages/ChatsPage.jsx";
import TabsBar from "./Components/TabsBar.jsx";
import { Tabs } from "@chakra-ui/react";
function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemesStore();
  console.log("Online users:", onlineUsers);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-14" />
      </div>
    );
  }
  console.log("Current theme in App.jsx:", theme);
  return (
    <div data-theme={theme}>
      <Navbar />
      <TabsBar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={authUser ? <CreateProductPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chats"
          element={authUser ? <ChatsPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
