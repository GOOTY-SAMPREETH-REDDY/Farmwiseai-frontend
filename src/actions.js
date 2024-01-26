
export const ADD_FIELD = 'ADD_FIELD';
export const SUBMIT_FORM_DATA = 'SUBMIT_FORM_DATA';

// Action creators
export const addField = (fieldData) => {
  return {
    type: ADD_FIELD,
    payload: fieldData
  };
};

export const submitFormData = (formData) => {
  return {
    type: SUBMIT_FORM_DATA,
    payload: formData
  };
};
