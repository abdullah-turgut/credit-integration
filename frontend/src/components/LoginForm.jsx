import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import axios from 'axios';

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    axios
      .post('http://localhost:1337/api/auth/local', data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        sessionStorage.setItem('token', res.data.jwt);
        return res.data.jwt;
      })
      .then((token) =>
        axios
          .get('http://localhost:1337/api/users/me?populate=*', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            sessionStorage.setItem('user', JSON.stringify(res.data));
            if (res.data.role.type === 'superadmin') {
              navigate('/admin');
            } else if (res.data.role.type === 'analyst') {
              navigate('/analyst');
            }
          })
      );
  };
  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-20 border p-10 rounded-2xl bg-slate-100"
    >
      <h3 className="text-center text-5xl font-bold">Login</h3>
      <div className="flex flex-col gap-y-6">
        <div className="relative">
          <input
            className="outline-none min-w-[300px] pl-8 py-3 border-b-2 border-gray-300 focus:border-purple-600 bg-transparent"
            type="text"
            placeholder="Kullanıcı adı veya email"
            {...register('identifier', { required: true })}
          />
          <AiOutlineUser
            size={20}
            className="text-gray-400 absolute top-1/2 -translate-y-1/2"
          />
        </div>
        <div className="relative">
          <input
            className="outline-none min-w-[300px] pl-8 py-3 border-b-2 border-gray-300 focus:border-purple-600 bg-transparent"
            type="password"
            placeholder="Şifre"
            {...register('password', { required: true, min: 6 })}
          />
          <AiOutlineLock
            size={20}
            className="text-gray-400 absolute top-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      <input
        type="submit"
        value="Giriş Yap"
        className="w-full py-3 bg-purple-600 rounded-lg font-semibold text-white cursor-pointer hover:bg-purple-700"
      />
    </form>
  );
}