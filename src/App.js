import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      { routes }
    </ConnectedRouter>
  )
}

// class App extends React.Component {
//   render() {
//     return (
//         <div className="App" style={style}>
//           <Router>
//             <>
//               <Navigation />
//                 {/* Uncomment this route when we don't need editor to be home route anymore*/}
//                 {/* <Route exact path='/' component={Home} /> */}
//                 {/* will update this route later when routing is more fleshed out 
//               and we don't need to load the editor right away */}
//                 <Route exact path='/' component={Editor}/>
//                 <Route path='/register' component={Registration} />
//                 <Route path='/login' component={Login} />
//             </>
//           </Router>
//         </div>
//     );
//   }
// }

export default App