import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Editor from 'pages/Editor';
// import Home from 'pages/Home';
import Login from 'pages/Login';
import Registration from 'pages/Registration';

const style = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden'
}

class App extends React.Component {
  render() {
    return (
        <div className="App" style={style}>
          <Router>
            <>
              <Navigation />
                {/* Uncomment this route when we don't need editor to be home route anymore*/}
                {/* <Route exact path='/' component={Home} /> */}
                {/* will update this route later when routing is more fleshed out 
              and we don't need to load the editor right away */}
                <Route exact path='/' component={Editor}/>
                <Route path='/register' component={Registration} />
                <Route path='/login' component={Login} />
            </>
          </Router>
        </div>
    );
  }
}

export default App