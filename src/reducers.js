// Your Redux reducer file (e.g., reducer.js)

const initialState = {
  fields: [] // Initial state for fields
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FIELD':
      // Handle adding field logic
      return {
        ...state,
        fields: [...state.fields, action.payload]
      };
    case 'RESET_FIELDS':
      // Handle resetting fields to an empty array
      return {
        ...state,
        fields: []
      };
    default:
      return state;
  }
};

export default reducer;
