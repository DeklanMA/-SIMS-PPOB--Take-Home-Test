import {NavLink} from 'react-router';

const navClass = ({isActive}: {isActive: boolean}) =>
  `font-medium transition-colors ${
    isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-500'
  }`;

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      <nav className="flex items-center justify-between px-32 border-b border-gray-300 bg-white p-4">
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/Logo.png" alt="logo" className="w-5" />
          <span className="font-semibold text-black text-md">SIMS PPOB</span>
        </NavLink>

        <div className="flex gap-8 text-sm">
          <NavLink to="/topup" className={navClass}>
            Top Up
          </NavLink>

          <NavLink to="/transactions" className={navClass}>
            Transaction
          </NavLink>

          <NavLink to="/account" className={navClass}>
            Akun
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
