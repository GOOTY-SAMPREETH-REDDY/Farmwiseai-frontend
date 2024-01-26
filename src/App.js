


import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Form';
import DisplayFields from './DisplayFields';
import DynamicForm from './DynamicForm';
import store from './store';

function App() {
  return (
    <Provider store={store}> {/* Wrap your components with Provider */}
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/DynamicForm" element={<DynamicForm />} />
        </Routes>
        <DisplayFields />
      </Router>
    </Provider>
  );
}

export default App;

