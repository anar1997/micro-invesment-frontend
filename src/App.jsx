import { useState, useEffect } from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import { useDispatch, useSelector } from 'react-redux'
import NotFoundPage from './pages/NotFoundPage'
import About from './pages/About'
import EntrepreneurDetail from './pages/EntrepreneurDetail'
import Footer from './components/Footer'
import EntreprenuerTable from './components/Profile/EntreprenuerTable'
import Experience from './components/Profile/Experience'
import Orders from './components/Profile/Orders'
import Education from './components/Profile/Education'
import ProfileUpdate from './pages/ProfileUpdate'
import AddEducation from './components/Profile/Education/AddEducation'
import AddExperience from './components/Profile/Experience/AddExperience'
import UpdateEducation from './components/Profile/Education/updateEducation'
import UpdateExperience from './components/Profile/Experience/UpdateExperience'


function App() {
  const access = localStorage.getItem("access");

  return (
    <>
        {
          !access ? (
            <>
              <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='*' element={<NotFoundPage/>} />
              </Routes>
            </>
          ) : (
            <div className='flex flex-col h-screen justify-between'>
              <div>
                <Header />
                <div>
                  <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/about' element={<About/>} />
                    <Route path='/entrepreneur-detail/:id' element={<EntrepreneurDetail/>} />
                    <Route path='/profile' element={<Outlet/>}>
                      <Route path='' element={<Profile/>} />
                      <Route path='profile-update' element={<ProfileUpdate/>}/>
                      <Route path='add-education' element={<AddEducation/>} />
                      <Route path='add-experience' element={<AddExperience/>} />
                      <Route path='update-education/:id' element={<UpdateEducation/>}/>
                      <Route path='update-experience/:id' element={<UpdateExperience/>}/>
                    </Route>
                    <Route path='/login' element={<Login/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='*' element={<NotFoundPage/>} />
                  </Routes>
                </div>
              </div>
              <Footer />
            </div>
          )
        }
    </>
  )
}

export default App
