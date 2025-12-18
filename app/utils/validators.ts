export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = (password: string) => password.length >= 8;
export const isNonEmptyString = (value: string) => value.trim().length > 0;
export const isPasswordMatch = (password: string, confirmPassword: string) =>
  password === confirmPassword;



export const isNumberOnly = (value: string) =>
  /^\d+$/.test(value);

export const isValidTopUpAmount = (amount: number) =>
  amount >= 10_000 && amount <= 1_000_000;

export const formatRupiah = (value: number | string) => {
  if (!value) return '';
  return Number(value).toLocaleString('id-ID');
};

export const unformatRupiah = (value: string) => {
  return value.replace(/\./g, '');
};

export const isValidImage = (file: File) => {
  const allowed = ['image/jpeg', 'image/png'];
  const maxSize = 100 * 1024; // 100 KB

  if (!allowed.includes(file.type)) {
    return 'Format image harus JPG atau PNG';
  }

  if (file.size > maxSize) {
    return 'Ukuran image maksimal 100 KB';
  }

  return null;
};
