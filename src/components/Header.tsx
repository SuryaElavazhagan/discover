import clsx from 'clsx';
import debounce from 'lodash.debounce';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '../assets/search.svg';
import { NAVBAR_ITEMS } from '../constants/routes';
import { changeSearch } from '../store';

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value.trim();
    dispatch(changeSearch(query));
  }

  const debouncedSearch = debounce(handleSearch, 1500);

  return (
    <header className="flex justify-between items-center">
      <Link to="/">
        <p className="text-2xl text-white">Discover</p>
      </Link>
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
      <div className="flex">
        <img src={SearchIcon} alt="Search Icon" />
        <input
          type="text"
          name="search"
          placeholder="SEARCH"
          className="font-bold uppercase border-0 bg-gray-800 text-blue-500 outline-none select-none placeholder-blue-500"
          onChange={debouncedSearch}
        />
      </div>
    </header>
  );
}

export default Header;