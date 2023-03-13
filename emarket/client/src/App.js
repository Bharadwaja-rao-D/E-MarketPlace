import Signin from './components/userComponents/Signin'
import Signup from './components/userComponents/Signup'
import {Home} from './components/userComponents/Home'
import {Error} from './components/commonComponents/Error'
import { BrowserRouter as Router,Routes, Route, a } from 'react-router-dom';


function App() {
  return (
    // This should be here as a security measure or something cannot move it to any where elsse
    // What ever is using google login or log out must be wrapped by this


    <Router>
      <Routes>
        <Route exact path='/' element={< Signin />}></Route>
        <Route exact path='/signin' element={< Signin />}></Route>
        <Route exact path='/signup' element={< Signup />}></Route>
        <Route exact path='/home' element={< Home />}></Route>
        <Route exact path='/error' element={< Error />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
