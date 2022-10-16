import produce from "immer";
import { SET_USER } from "./action";

const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const nextState = produce(state, (draft) => {
        draft.user = action.payload;
      });
      return nextState;
    }
    default:
      return state;
  }
};

export default reducer;
