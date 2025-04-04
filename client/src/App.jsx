import React, { useContext } from 'react'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import {Routes,Route, useNavigate} from 'react-router-dom';
import Update from './pages/Update.jsx'
import { AuthContextProvider, useAuthContext } from './context/AuthContext.jsx';
import Protected from './components/Protected.jsx'
import {Toaster} from 'react-hot-toast';

function App() {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  return (
      <div>
          <Toaster position='top-center' toastOptions={{duration:4000}}/>
          <Routes>
            <Route path='/' element={<Protected><Home/></Protected>}/>
            <Route path='/profile/:username' element={<Protected><Profile/></Protected>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={ <Login/>}/>
            <Route path='/update/:id' element={<Protected><Update/></Protected>}/>
            <Route path='*' element={<h1>No link found</h1>}/>
          </Routes> 
    </div> 
  )
}
export default App