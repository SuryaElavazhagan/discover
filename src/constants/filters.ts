import range from "lodash.range";

const TYPES = [
  { label: 'Movie', value: 'movie' },
  { label: 'TV Shows', value: 'tv' }
];

const YEAR = range(1900, (new Date()).getFullYear()).map((i) => ({
  label: i,
  value: i
}));

function isDefaultValue(genre: number[], year: number[], rating: number[]) {
  const noGenre = genre.length === 0;
  const isDefaultYearRange = year[0] === 1900 && year[1] === (new Date()).getFullYear();
  const isDefaultRating = rating[0] === 0 && rating[1] === 5;

  return noGenre && isDefaultYearRange && isDefaultRating;
}

export {
  TYPES,
  YEAR,
  isDefaultValue
};
