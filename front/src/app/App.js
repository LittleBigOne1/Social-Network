import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../Containers/Home/Home';
import NotFound from '../Containers/NotFound/NotFound';
import Navbar from '../Components/Navbar/Navbar';
import Login from '../Containers/Login/Login';
import Signup from '../Containers/Signup/Signup';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
