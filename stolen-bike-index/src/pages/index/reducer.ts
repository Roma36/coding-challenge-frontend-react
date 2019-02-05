import { Reducer } from "redux";

interface IndexState {
  items: object[]
};

const initialState: IndexState = {
  items: []
}

const reducer: Reducer<IndexState> = (state: IndexState = initialState, action) => {
  return state;
};

export default reducer;
