import { MainContext, useContext } from '../contexts/MainContext';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(MainContext);

  function logout() {
    setUser(null);
    navigate('/');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  return (
    <div className="fixed left-0 top-0  h-screen w-[300px] flex flex-col px-5 py-10 border-r border-gray-300 bg-white z-20">
      <div className="flex flex-col gap-y-3 text-right border-b pb-5 text-violet-800">
        <p className="text-4xl font-medium ">Hoşgeldin</p>
        <p className="text-xl truncate  font-thin">{user.email}</p>
      </div>

      <button
        className="w-3/4 mt-auto mx-auto border  rounded-full py-2 bg-violet-600 text-white cursor-pointer hover:bg-violet-700"
        onClick={logout}
      >
        Oturumu Kapat
      </button>
    </div>
  );
}
