export default function navReducer(state = {}, action) {
  switch (action.type) {
    case "ACTIVE_NAV": {
      localStorage.setItem("navTab", action.payload);
      return action.payload;
    }
    case "DELETE_NAV": {
      return null;
    }

    default: {
      return state;
    }
  }
}
