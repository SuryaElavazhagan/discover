import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '../assets/search.svg';
import { NAVBAR_ITEMS } from '../constants/routes';

function Header() {
  const location = useLocation();

  return (
    <header className="flex justify-between items-center">
      <p className="text-2xl text-white">Discover</p>
      <nav>
        <ul className="list-none flex">
          {
            Object.keys(NAVBAR_ITEMS).map((item) => (
              <li
                key={item}
                className={clsx(
                  'font-bold',
                  'px-3',
                  'cursor-pointer',
                  { 'text-white': location.pathname === `/${item}`, 'text-blue-500': location.pathname !== `/${item}` }
                )}
              >
                <Link to={item}>
                  {NAVBAR_ITEMS[item]}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
      <div>
        <img src={SearchIcon} alt="Search Icon" />
      </div>
    </header>
  );
}

export default Header;