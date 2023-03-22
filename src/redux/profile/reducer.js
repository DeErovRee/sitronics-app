const initialState = {
  profileClose: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SWITCH_PRIVACY":
      return {
        ...state,
        profileClose: !state.profileClose,
      };

    default:
      return state;
  }
};
