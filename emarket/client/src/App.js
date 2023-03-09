import {Login} from './components/userComponents/Login.jsx'
import {Home} from './components/userComponents/Home.jsx'
import { BrowserRouter as Router,Routes, Route, a } from 'react-router-dom';


function App() {
  return (
    // This should be here as a security measure or something cannot move it to any where elsse
    // What ever is using google login or log out must be wrapped by this
    
    
    <Router>
      <Routes>
      
        <Route exact path='/' element={< Login />}></Route>
        <Route exact path='/home' element={< Home />}></Route>

      </Routes>
    </Router>
    
  );
}

export default App;
