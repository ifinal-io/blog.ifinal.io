/* -------------------------------------------------------------------------- */
/*                              Search Suggestion                             */
/* -------------------------------------------------------------------------- */

const searchInit = () => {
  const Selectors = {
    SEARCH_DISMISS: '[data-bs-dismiss="search"]',
    DROPDOWN_TOGGLE: '[data-bs-toggle="dropdown"]',
    SEARCH_BOX: ".search-box",
    SEARCH_INPUT: ".search-input",
    SEARCH_TOGGLE: '[data-bs-toggle="search"]',
  };

  const Events = {
    CLICK: "click",
    FOCUS: "focus",
    SHOW_BS_DROPDOWN: "show.bs.dropdown",
    SEARCH_CLOSE: "search.close",
  };

  const hideSearchSuggestion = (searchArea) => {
    const el = searchArea.querySelector(Selectors.SEARCH_TOGGLE);
    const dropdown = window.bootstrap.Dropdown.getInstance(el);
    dropdown?.hide();
  };

  const searchAreas = document.querySelectorAll(Selectors.SEARCH_BOX);

  const hideAllSearchAreas = () => {
    searchAreas.forEach(hideSearchSuggestion);
  };

  searchAreas.forEach((searchArea) => {
    const input = searchArea.querySelector(Selectors.SEARCH_INPUT);
    const btnDropdownClose = searchArea.querySelector(Selectors.SEARCH_DISMISS);

    input.addEventListener(Events.FOCUS, () => {
      hideAllSearchAreas();
      const el = searchArea.querySelector(Selectors.SEARCH_TOGGLE);
      const dropdown = new window.bootstrap.Dropdown(el);
      dropdown.show();
    });

    document.addEventListener(Events.CLICK, ({ target }) => {
      !searchArea.contains(target) && hideSearchSuggestion(searchArea);
    });

    btnDropdownClose &&
      btnDropdownClose.addEventListener(Events.CLICK, (e) => {
        hideSearchSuggestion(searchArea);
        input.value = "";
        const event = new CustomEvent(Events.SEARCH_CLOSE);
        e.currentTarget.dispatchEvent(event);
      });
  });

  document.querySelectorAll(Selectors.DROPDOWN_TOGGLE).forEach((dropdown) => {
    dropdown.addEventListener(Events.SHOW_BS_DROPDOWN, () => {
      hideAllSearchAreas();
    });
  });
};

export default searchInit;
