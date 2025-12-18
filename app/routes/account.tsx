'use client';

import {useEffect, useRef, useState} from 'react';
import toast from 'react-hot-toast';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
} from '@app/features/api/apiSlice';
import {useAppDispatch} from '@app/store/hooks';
import {logout} from '@app/features/auth/authSlice';
import {isValidImage} from '@app/utils/validators';
import {Pencil} from 'lucide-react';

const getAvatarUrl = (url?: string) => {
  if (!url || url === 'avatar' || url === 'null' || url === 'undefined') {
    return '/avatar.png';
  }
  return url;
};

export default function AccountPage() {
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement>(null);

  const {data: profile, refetch: refetchProfile} = useGetProfileQuery();

  const [updateProfile, {isLoading: isUpdating}] = useUpdateProfileMutation();
  const [uploadImage, {isLoading: isUploading}] =
    useUploadProfileImageMutation();

  const [isEdit, setIsEdit] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // snapshot data awal
  const [originalFirstName, setOriginalFirstName] = useState('');
  const [originalLastName, setOriginalLastName] = useState('');

  useEffect(() => {
    if (profile?.data) {
      setFirstName(profile.data.first_name);
      setLastName(profile.data.last_name);

      setOriginalFirstName(profile.data.first_name);
      setOriginalLastName(profile.data.last_name);
    }
  }, [profile]);

  const isChanged =
    firstName !== originalFirstName || lastName !== originalLastName;

  // ======================
  // UPLOAD IMAGE
  // ======================
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = isValidImage(file);
    if (error) {
      toast.error(error);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadImage(formData).unwrap();
      await refetchProfile(); // 🔥 auto update avatar
      toast.success('Foto profil berhasil diperbarui');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Upload foto gagal');
    }
  };

  // ======================
  // UPDATE PROFILE
  // ======================
  const handleSave = async () => {
    // ❌ tidak ada perubahan → tidak kirim API
    if (!isChanged) {
      setIsEdit(false);
      return;
    }

    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
      }).unwrap();

      await refetchProfile();
      setIsEdit(false);
      toast.success('Profil berhasil diperbarui');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Update profil gagal');
    }
  };

  // ======================
  // LOGOUT
  // ======================
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const avatarUrl = getAvatarUrl(profile?.data.profile_image);

  return (
    <div className="bg-white min-h-screen p-6 text-black">
      <div className="max-w-md mx-auto space-y-6 text-center">
        {/* AVATAR */}
        <div className="relative w-fit mx-auto">
          <img
            src={avatarUrl}
            alt="Foto profil"
            onError={(e) => {
              e.currentTarget.src = '/avatar.png';
            }}
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />

          <button
            type="button"
            aria-label="Ubah foto profil"
            title="Ubah foto profil"
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-0 right-0 bg-white border border-gray-300 p-1 rounded-full shadow"
            disabled={isUploading}
          >
            <Pencil size={14} />
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg"
            hidden
            onChange={handleImageChange}
          />
        </div>

        <h1 className="font-semibold text-xl">
          {profile?.data.first_name} {profile?.data.last_name}
        </h1>

        {/* FORM */}
        <div className="space-y-4 text-left">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              placeholder={profile?.data.email || 'Email'}
              disabled
              value={profile?.data.email || ''}
              className="w-full border px-3 py-2 rounded border-gray-200 "
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Nama Depan</label>
            <input
              disabled={!isEdit}
              placeholder={firstName || 'Nama Depan'}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border px-3 py-2 rounded border-gray-200 "
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Nama Belakang</label>
            <input
              disabled={!isEdit}
              placeholder={lastName || 'Nama Belakang'}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border px-3 py-2 rounded border-gray-200 "
            />
          </div>
        </div>

        {/* BUTTON */}
        {!isEdit ? (
          <>
            <button
              type="button"
              onClick={() => setIsEdit(true)}
              className="w-full border bg-red-600 text-white py-2 rounded cursor-pointer hover:bg-red-700"
            >
              Edit Profile
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full border border-red-600 text-red-600 py-2 rounded cursor-pointer hover:bg-red-50"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              disabled={isUpdating}
              onClick={handleSave}
              className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-60 cursor-pointer"
            >
              {isUpdating ? 'Menyimpan...' : 'Simpan'}
            </button>

          </>
        )}
      </div>
    </div>
  );
}
