import LoginForm from '../components/LoginForm';
export default function Login() {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
      <LoginForm />
      <p className="absolute top-0 left-0 font-thin text-2xl text-white py-4 px-8">
        Credit Integration.
      </p>
    </div>
  );
}
