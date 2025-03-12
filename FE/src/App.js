// import './App.css';
// import { HashRouter as Router, Route, Routes, Navigate, HashRouter } from 'react-router-dom';
// import Login from './pages/login/Login';
// import Signup from './pages/signup/Signup';
// import Dashboard from './pages/dashboard/Dashboardscreen';
// import Orders from './pages/orders/Orders';
// import Navbar from './components/Navbar';
// import ProtectRoute from './components/ProtectRoute'; // Import ProtectRoute
// import ProtectRoute2 from './components/ProtectRoute2'; // Import ProtectRoute2


// function App() {
//   return (
//     <>
//       {/* <Navbar /> Always render the Navbar */}
//       <HashRouter></HashRouter>
//       <Routes>
//         {/* Redirect root to dashboard if logged in */}
//         <Route path="/" element={<Navigate to="/dashboard" />} />

//         {/* If user is logged in, prevent access to login and register */}
//         <Route path="/login" element={<ProtectRoute2><Login /></ProtectRoute2>} />
//         <Route path="/register" element={<ProtectRoute2><Signup /></ProtectRoute2>} />

//         {/* Protect dashboard and orders routes */}
//         <Route 
//           path="/dashboard" 
//           element={<ProtectRoute allowShop={false}><Dashboard /></ProtectRoute>} 
//         />
//         <Route 
//           path="/orders" 
//           element={<ProtectRoute allowShop={true}><Orders /></ProtectRoute>} 
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;

import './App.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboardscreen';
import Orders from './pages/orders/Orders';
import Navbar from './components/Navbar';
import ProtectRoute from './components/ProtectRoute';
import ProtectRoute2 from './components/ProtectRoute2';

function App() {
  return (
    <>
      {/* Always render the Navbar */}
      <Navbar />
  
        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Public routes with restrictions for logged-in users */}
          <Route path="/login" element={<ProtectRoute2><Login /></ProtectRoute2>} />
          <Route path="/register" element={<ProtectRoute2><Signup /></ProtectRoute2>} />

          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={<ProtectRoute allowShop={false}><Dashboard /></ProtectRoute>} 
          />
          <Route 
            path="/orders" 
            element={<ProtectRoute allowShop={true}><Orders /></ProtectRoute>} 
          />
        </Routes>
      
    </>
  );
}

export default App;
