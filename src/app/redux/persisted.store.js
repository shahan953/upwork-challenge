const StoreKey = 'USER_AUTHENTICATION_DATA';

export const saveState = (state) => {
  try {
    // Parsing auth data from Redux store
    let stateFilter = JSON.parse(JSON.stringify(state))

    // Saving auth Data to localStorage
    let rawState = JSON.stringify({
      auth: stateFilter.auth,
    });

    localStorage.setItem(StoreKey, rawState)
  } catch (err) {
    // Ignore write error
  }
}

/* Use an IIFE to export the persisted state in a variable */
export const persistedState = (() => {
  try {
    const rawState = localStorage.getItem(StoreKey);
    if (rawState === null) return undefined;
    let state = JSON.parse(rawState);
    if (state.auth.status === 401) state.auth = {};
    return state;
  } catch (err) {
    return undefined;
  }
})();