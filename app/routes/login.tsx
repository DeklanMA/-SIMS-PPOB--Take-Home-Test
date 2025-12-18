'use client';

import {useState} from 'react';
import {Eye, EyeOff, Mail, Lock, XCircle, X} from 'lucide-react';
import {useNavigate} from 'react-router';
import {useLoginMutation} from '@app/features/api/apiSlice';
import {useAppDispatch} from '@app/store/hooks';
import {setToken} from '@app/features/auth/authSlice';

import {
  isValidEmail,
  isValidPassword,
  isNonEmptyString,
} from '@app/utils/validators';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, {isLoading}] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // error state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // reset error
    setEmailError('');
    setPasswordError('');
    setApiError('');

    let isValid = true;

    if (!isNonEmptyString(email)) {
      setEmailError('Email wajib diisi');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Format email tidak valid');
      isValid = false;
    }

    if (!isNonEmptyString(password)) {
      setPasswordError('Password wajib diisi');
      isValid = false;
    } else if (!isValidPassword(password)) {
      setPasswordError('Password minimal 8 karakter');
      isValid = false;
    }

    if (!isValid) return;

    try {
      const res = await login({email, password}).unwrap();
      const token = res.data.token;

      localStorage.setItem('token', token);
      dispatch(setToken(token));

      navigate('/', {replace: true});
    } catch (err: any) {
      if (err?.data?.message) {
        setApiError(err?.data?.message);
      } else {
        setApiError('Login gagal, silakan coba lagi');
      }
    }
  };

  return (
    <div className=" flex flex-row h-full w-full text-black">
      <div className="flex-1">
        <div className="flex flex-col gap-6 justify-center h-screen items-center  ">
          <div className=" flex flex-row justify-center items-center gap-2">
            <img src="/Logo.png" className="w-6" alt="" />
            <h1 className="flex items-center font-medium">SIMS PPOB</h1>
          </div>
          <h1 className="text-center font-medium text-xl ">
            Masuk atau buat akun
            <br /> untuk memulai
          </h1>
          <form onSubmit={handleSubmit} className="space-y-7 text-sm">
            {/* EMAIL */}
            <div>
              <div
                className={`flex items-center border border-gray-400 rounded px-3 py-2 min-w-sm ${emailError || apiError ? 'border-red-500' : ''}`}
              >
                <Mail
                  size={18}
                  className={`text-gray-400 mr-2 ${emailError || apiError ? 'text-red-500' : ''}`}
                />
                <input
                  type="email"
                  className="w-full outline-none"
                  placeholder="masukan email anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div
                className={`flex items-center border border-gray-400 rounded px-3 py-2  ${passwordError || apiError ? 'border-red-500' : ''}`}
              >
                <Lock
                  size={18}
                  className={`text-gray-400 mr-2 ${passwordError || apiError ? 'text-red-500' : ''}`}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full outline-none"
                  placeholder="masukan password anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="ml-2 text-gray-500"
                  aria-label="Toggle password"
                >
                  {showPassword ? (
                    <EyeOff
                      className="cursor-pointer text-gray-400"
                      size={18}
                    />
                  ) : (
                    <Eye className="cursor-pointer text-gray-400" size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 mt-5 text-white py-2 rounded cursor-pointer hover:bg-red-700 disabled:opacity-60"
            >
              {isLoading ? 'Loading…' : 'Masuk'}
            </button>
          </form>
          <p className="text-sm text-gray-600">
            Belum punya akun?{' '}
            <span>
              register{' '}
              <a href="/register" className="text-red-600 font-semibold hover:underline">
                {' '}
                di sini
              </a>
            </span>
          </p>
        </div>
        {(apiError || emailError || passwordError) && (
          <div className="absolute bottom-5 left-10 max-w-sm w-full bg-red-100 flex items-center shadow">
            <div className="flex-1 px-4 py-2">
              <p className="text-sm text-red-700">
                {apiError || emailError || passwordError}
              </p>
            </div>

            <button
              onClick={() => {
                setApiError('');
                setEmailError('');
                setPasswordError('');
              }}
              className="px-4 text-red-500 hover:text-red-700 cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>
      <div className="flex-1">
        <img
          className="h-screen w-full object-cover"
          src="/assetLogin.png"
          alt=""
        />
      </div>
    </div>
  );
}
