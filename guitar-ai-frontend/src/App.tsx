import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hook';
import { fetchUser } from './store/reducers/authReducer';
import AuthLayout from './components/AuthLayout';
import MainLayout from './components/layout/MainLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateLayout';
import Practice from './pages/Practice';
import Tuner from './pages/Tunner';
import Lessons from './pages/Lessons';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<MainLayout />}>
          {/* Public Home Page / Dashboard */}
          <Route path="/" element={<Dashboard />} />

          <Route element={<PrivateRoute />}>
            <Route path="/practice" element={<Practice />} />
            <Route path="/tuner" element={<Tuner />} />
            <Route path="/lessons" element={<Lessons />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
