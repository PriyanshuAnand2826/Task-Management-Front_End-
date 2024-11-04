import './App.css'
import {BrowserRouter , Routes , Route,Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import ViewTask from './pages/ViewTask'
import "react-toastify/dist/ReactToastify.css";


function App() {
  const ProtectRoute=({children})=>{
    const token =localStorage.getItem("token")
    if(!token){
      return <Navigate to="/" />
    } 
    else{
      return children;
    }

  }

 return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} /> 
          <Route path="/login" element={
            <Login/>} /> 
          <Route path="/board" element={
            <ProtectRoute>
            <Home/>
            </ProtectRoute>} /> 
          <Route path="/analytics" element={
            <ProtectRoute>
            <Analytics/>
            </ProtectRoute>} /> 
          <Route path="/settings" element={
            <ProtectRoute>
            <Settings/>
            </ProtectRoute>} /> 
          <Route path="/viewtask/:id" element={<ViewTask/>} /> 
          <Route path="*" element={<NotFound/>} /> 
        </Routes>
      
      </BrowserRouter>
      
    </>
  )
}

export default App
