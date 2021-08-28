import range from "lodash.range";

const TYPES = [
  { label: 'Movie', value: 'movie' },
  { label: 'TV Shows', value: 'tv' }
];

const YEAR = range(1900, (new Date()).getFullYear()).map((i) => ({
  label: i,
  value: i
}));

export {
  TYPES,
  YEAR
};
