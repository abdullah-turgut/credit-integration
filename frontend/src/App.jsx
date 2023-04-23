import { useState, useEffect } from 'react';
import Login from './pages/Login';
import SuperAdmin from './pages/SuperAdmin';
import Analyst from './pages/Analyst';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { MainContext } from './contexts/MainContext';

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
