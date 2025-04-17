import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Contact from './pages/Contact'
import Home from './pages/Home'
import AddTask from './pages/AddTask'
import NoPage from './pages/NoPage'
import SingleTask from './pages/SingleTask'


function App() {




  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout />} >
       <Route index element={<Home /> } />
       <Route path='/contactus'  element={<Contact />} />
       <Route path="/addtask"  element={<AddTask />} /> 
       <Route path="/task/:id"  element={<SingleTask />} /> 
       <Route path="*" element={<NoPage />} />
    </Route>
  </Routes>
  </BrowserRouter>
  ) 
}

export default App
