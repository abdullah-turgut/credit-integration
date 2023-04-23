import { useState, useEffect } from 'react';
import Login from './pages/Login';
import SuperAdmin from './pages/SuperAdmin';
import Analyst from './pages/Analyst';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { MainContext } from './contexts/MainContext';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate('/login');
    } else {
      if (user.role.type === 'superadmin') {
        navigate('/admin');
      } else if (user.role.type === 'analyst') {
        navigate('/analyst');
      }
    }
  }, [user]); //eslint-disable-line

  const data = { user, setUser };

  return (
    <MainContext.Provider value={data}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Routes>
        <Route exact path="/" />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/admin" element={<SuperAdmin />} />
        <Route exact path="/analyst" element={<Analyst />} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;
