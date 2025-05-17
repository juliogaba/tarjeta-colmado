
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/navbar";
import AppRoutes from "@/routes/AppRoutes";
import { useAppData } from "@/hooks/useAppData";
import AppLoading from "@/components/layout/app-loading"; 

const App = () => {
  const appData = useAppData();
  
  if (appData.loading) {
    return <AppLoading />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
        {appData.currentUser && <Navbar currentUser={appData.currentUser} onLogout={appData.handleLogout} />}
        <main className={appData.currentUser ? "pt-16" : ""}>
          <AppRoutes appData={appData} />
        </main>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
