// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './Components/view/partials/Home';
// import Login from './Components/view/Login/Login';
// import Header from './Components/view/partials/Header'; // Import Header component
// import Register from './Components/view/Register/Register';
// import SignIn from './signln';


// const App = () => {
//   return (
//     <Router>
      
//       <div>
        
//         <Header /> 
       
//         <Routes>
          
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/Register" element={<Register />}/>
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
// src/App.js
// src/App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './Components/view/partials/Home';
import Login from './Components/view/Login/Login';
import Header from './Components/view/partials/Header'; 
import Register from './Components/view/Register/Register';
import './transitions.css'; // Import the transitions CSS

const App = () => {
  const location = useLocation();
  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={300}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
