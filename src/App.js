import React from 'react';
import { Router, Route } from 'react-router-dom';
import BlocksContainer from './components/BlocksContainer';
import DetailsContainer from './components/DetailsContainer';
import NavigationBar from './components/NavigationBar';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <NavigationBar/>
            <Route path='/' exact component={BlocksContainer} />
            <Route path='/details' component={DetailsContainer} />
          </div>
        </Router>
      </div>
      
    );
  }
}

export default App;
