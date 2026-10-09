import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QuestionsProvider } from './features/questions/state/QuestionsContext';
import { AppRoutes } from './app/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <QuestionsProvider>
        <AppRoutes />
      </QuestionsProvider>
    </BrowserRouter>
  );
}

export default App;
