import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './Pages';

function App() {
  return (
    
    <BrowserRouter basename='/cardmemorygame'>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
