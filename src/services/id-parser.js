/**
 * Parses the id from a given URL.
 * Not flexible or anythings, but it works ;)
 *
 * @example Extract <id> from https://swapi.co/api/planets/<id>/
 * @param {string} url
 */
export const getIDFromUrl = (url) => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
};
