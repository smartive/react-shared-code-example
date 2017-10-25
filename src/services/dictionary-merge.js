/**
 * Creates an new hashmap which merges previous entries with new new ones.
 * The item's keys are their respective `id` properties, so they need to be
 * defined.
 *
 * @param {object} existing
 * @param {array} items
 */
export const mergeItems = (existing, items) =>
  items.reduce((dictionary, result) => {
    // If the dictionary already contains the `id` as a key, it should _not_ override previous
    // values.
    if (!dictionary[result.id]) {
      // Return the previous dictionary with the new element.
      return {
        ...dictionary,
        [result.id]: result,
      };
    }

    return dictionary;
  }, existing);
