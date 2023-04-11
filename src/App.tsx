import './App.css';
import { Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage/HomePage';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { AdminPage } from './pages/AdminPage/AdminPage';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};
