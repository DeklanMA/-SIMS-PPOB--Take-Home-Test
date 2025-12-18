import {useState} from 'react';
import {Mail, User, Lock, Eye, EyeOff, X} from 'lucide-react';
import {useNavigate} from 'react-router';
import {useRegisterMutation} from '@app/features/api/apiSlice';
import {
  isValidEmail,
  isValidPassword,
  isPasswordMatch,
} from '@app/utils/validators';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [register, {isLoading}] = useRegisterMutation();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [isSuccess, setIsSuccess] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = 'Email wajib diisi';
    else if (!isValidEmail(email)) newErrors.email = 'Format email tidak valid';

    if (!firstName) newErrors.firstName = 'Nama depan wajib diisi';
    if (!lastName) newErrors.lastName = 'Nama belakang wajib diisi';

    if (!password) newErrors.password = 'Password wajib diisi';
    else if (!isValidPassword(password))
      newErrors.password = 'Password minimal 8 karakter';

    if (!confirmPassword)
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    else if (!isPasswordMatch(password, confirmPassword))
      newErrors.confirmPassword = 'Password tidak sama';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    setIsSuccess('');

    if (!validateForm()) return;

    try {
      const res = await register({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      }).unwrap();

      if (res.status === 0) {
        setIsSuccess(res.message);

        setTimeout(() => navigate('/login'), 1500);
      } else {
        setIsSuccess('');
        setApiError(res.message);
      }
    } catch (err: any) {
      setIsSuccess('');
      setApiError(err?.data?.message || 'Registrasi gagal, silakan coba lagi');
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
            Lengkapi data untuk
            <br /> membuat akun
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <div
                className={`flex items-center border min-w-sm px-3 py-2 border-gray-400 rounded-sm ${errors.email ? 'border-red-500' : ''}`}
              >
                <Mail
                  size={18}
                  className={`text-gray-400 mr-2 ${errors.email ? 'text-red-500' : ''}`}
                />
                <input
                  type="email"
                  placeholder="masukan email anda"
                  className="w-full outline-none placeholder:text-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <div className="mt-1 text-xs text-red-500 text-right w-full">
                  {errors.email}
                </div>
              )}
            </div>
            <div>
              <div
                className={`flex items-center border min-w-sm px-3 py-2 border-gray-400 rounded-sm ${errors.firstName ? 'border-red-500' : ''}`}
              >
                <User
                  size={18}
                  className={`text-gray-400 mr-2 ${errors.firstName ? 'text-red-500' : ''}`}
                />
                <input
                  type="text"
                  placeholder="Nama depan"
                  className="w-full outline-none placeholder:text-gray-400"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              {errors.firstName && (
                <div className="mt-1 text-xs text-red-500 text-right w-full">
                  {errors.firstName}
                </div>
              )}
            </div>
            <div>
              <div
                className={`flex items-center border min-w-sm px-3 py-2 border-gray-400 rounded-sm ${errors.lastName ? 'border-red-500' : ''}`}
              >
                <User
                  size={18}
                  className={`text-gray-400 mr-2 ${errors.lastName ? 'text-red-500' : ''}`}
                />
                <input
                  type="text"
                  placeholder="Nama belakang"
                  className="w-full outline-none placeholder:text-gray-400"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              {errors.lastName && (
                <div className="mt-1 text-xs text-red-500 text-right w-full">
                  {errors.lastName}
                </div>
              )}
            </div>
            <div>
              <div
                className={`flex items-center border min-w-sm px-3 py-2 border-gray-400 rounded-sm ${errors.password ? 'border-red-500' : ''}`}
              >
                <Lock
                  size={18}
                  className={`text-gray-400 mr-2 ${errors.password ? 'text-red-500' : ''}`}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="buat password"
                  className="w-full outline-none placeholder:text-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="ml-2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      className="text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <Eye size={18} className="text-gray-400 cursor-pointer" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 text-right">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <div
                className={`flex items-center border min-w-sm px-3 py-2 border-gray-400 rounded-sm ${errors.confirmPassword ? 'border-red-500' : ''}`}
              >
                <Lock
                  size={18}
                  className={`text-gray-400 mr-2 ${errors.confirmPassword ? 'text-red-500' : ''}`}
                />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="konfirmasi password"
                  className="w-full outline-none placeholder:text-gray-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="ml-2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff
                      size={18}
                      className="text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <Eye size={18} className="text-gray-400 cursor-pointer" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500 text-right">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white cursor-pointer py-2 rounded hover:bg-red-700 transition disabled:opacity-60"
            >
              {isLoading ? 'Loading…' : 'Registrasi'}
            </button>
          </form>
          <p className="text-sm text-gray-600">
            sudah punya akun?{' '}
            <span>
              login{' '}
              <a
                href="/login"
                className="text-red-600 font-semibold hover:underline"
              >
                {' '}
                di sini
              </a>
            </span>
          </p>
        </div>
        {/* ERROR */}
        {apiError && (
          <div className="absolute bottom-5 z-50 left-10 max-w-sm w-full bg-red-100 flex items-center shadow">
            <div className="flex-1 px-4 py-2">
              <p className="text-sm text-red-700">{apiError}</p>
            </div>

            <button
              onClick={() => setApiError('')}
              className="px-4 text-red-500 hover:text-red-700 cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* SUCCESS */}
        {isSuccess && (
          <div className="absolute bottom-5 z-50 left-10 max-w-sm w-full bg-green-100 flex items-center shadow">
            <div className="flex-1 px-4 py-2">
              <p className="text-sm text-green-700">{isSuccess}</p>
            </div>

            <button
              onClick={() => setIsSuccess('')}
              className="px-4 text-green-600 hover:text-green-800 cursor-pointer"
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
