import { useState, useEffect } from 'react';
import Login from './pages/Login';
import SuperAdmin from './pages/SuperAdmin';
import Analyst from './pages/Analyst';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { MainContext } from './contexts/MainContext';
import { ToastContainer } from 'react-toastify';
import EditModal from './components/EditModal';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [typeformData, setTypeFormData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [dat, setDat] = useState([]);

  useEffect(() => {
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

  const data = {
    user,
    setUser,
    typeformData,
    setTypeFormData,
    formattedData,
    setFormattedData,
    dat,
    setDat,
  };

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
      <EditModal />
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
