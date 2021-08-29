import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { OptionsType, OptionTypeBase } from 'react-select';
import Rate from 'rc-rate';

import { TYPES, YEAR } from '../constants/filters';
import { changeGenre, changeRating, changeType, changeYear, IRootState } from '../store';

function Filter() {
  const dispath = useDispatch();
  const movieGenres = useSelector((state: IRootState) => state.filter.movieGenres);
  const tvGenres = useSelector((state: IRootState) => state.filter.tvGenres);
  const type = useSelector((state: IRootState) => state.filter.type);
  const year = useSelector((state: IRootState) => state.filter.year);
  const search = useSelector((state: IRootState) => state.filter.search);
  const rating = useSelector((state: IRootState) => state.filter.rating);
  const [genre, setGenre] = useState<OptionsType<OptionTypeBase>>([]);
  const [startYear, setStartYear] = useState(YEAR[0]);
  const [endYear, setEndYear] = useState(YEAR[YEAR.length - 1]);

  useEffect(() => {
    setGenre([]);
    setStartYear(YEAR[0]);
    setEndYear(YEAR[YEAR.length - 1]);
  }, [type, search]);

  function handleTypeChange(value: OptionTypeBase | null) {
    if (value !== null) {
      dispath(changeType(value.value));
    }
  }

  function handleGenreChange(values: OptionsType<OptionTypeBase>) {
    dispath(changeGenre(values.map(value => value.value)));
    setGenre(values);
  }

  function handleRatingChange(value: number) {
    dispath(changeRating([value, 5]));
  }

  function handleStartYearChange(value: OptionTypeBase | null) {
    if (value !== null && value.value < year[1]) {
      dispath(changeYear([value.value, year[1]]));
      setStartYear(value as any);
    }
  }

  function handleEndYearChange(value: OptionTypeBase | null) {
    if (value !== null && value.value > year[0]) {
      dispath(changeYear([year[0], value.value]));
      setEndYear(value as any);
    }
  }

  return (
    <aside className="px-10 py-8 shadow-2xl w-96">
      <p className="text-gray-500 my-2 pr-12 font-bold">DISCOVER OPTIONS</p>
      <div>
        <p className="my-2 text-gray-500">Type</p>
        <Select
          defaultValue={TYPES[0]}
          options={TYPES}
          onChange={handleTypeChange}
        />
        <p className="my-2 text-gray-500">Genre</p>
        <Select
          isMulti
          value={genre}
          options={type === 'movie' ? movieGenres : tvGenres}
          onChange={handleGenreChange}
        />
        <p className="my-2 text-gray-500">Year</p>
        <div className="flex items-center">
          <Select
            value={startYear}
            options={YEAR}
            className="w-24"
            onChange={handleStartYearChange}
          />
          <span className="text-white mx-2">-</span>
          <Select
            value={endYear}
            options={YEAR}
            className="w-24"
            onChange={handleEndYearChange}
          />
        </div>
        <p className="my-2 text-gray-500">Ratings</p>
        <Rate
          allowHalf
          allowClear
          value={rating[0]}
          onChange={handleRatingChange}
        />
        <span className="mx-1 text-white">&amp; up</span>
      </div>
    </aside>
  );
}

export default Filter;