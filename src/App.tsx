// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css'
// import Card from './Component/Card'
// import Login from './Component/Login'
// import Navbar from './Component/Navbar'

// function App() {

//   return (
//     <>
//     {/* bg-gradient-to-r from-gray-100 to-gray-200 */}
//     <div className="min-h-screen ">
//     <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Navbar/>}/>
//       <Route path="/" element={<Card/>}/> 
//       {/* <Login/> */}
//       </Routes>
//       </BrowserRouter>
//       </div>
//     </>
//   )
// }

// export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Card from './Component/Card'
// import Login from './Component/Login'
import Navbar from './Component/Navbar'
import Login from './Component/Login';
import Register from './Component/Register';
import Protected from './Component/Protected';
import ErrorBoundary from './Component/Error Boundries';

function App() {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <ErrorBoundary>
          <Navbar />
          <Routes>
            <Route path='/' element={<Protected cmp={Card} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
