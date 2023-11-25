import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EntreprenuerTable from '../../components/Profile/EntreprenuerTable'
import Orders from '../../components/Profile/Orders'
import Education from '../../components/Profile/Education'
import Experience from '../../components/Profile/Experience'
import { getMeAsync } from '../../redux/AuthSlice/AuthSlice'
import ResponseMessage from '../../components/ResponseMessage'
import { resetEducationSlice } from '../../redux/EducationSlice/EducationSlice'
import { resetExperienceSlice } from '../../redux/ExperienceSlice/ExperienceSlice'

function Profile() {
  const [showTab, setShowTab] = useState(<EntreprenuerTable />);

  const dispatch = useDispatch()

  let me = useSelector((state) => state.auth.me)

  let successMsg = useSelector((state) => state.education.successMsg)
  let error = useSelector((state) => state.education.error)

  let successMsgExp = useSelector((state) => state.experience.successMsg)
  let errorExp = useSelector((state) => state.experience.error)


  useEffect(() => {
    dispatch(getMeAsync())
  }, [])


  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 w-full">
      {
        successMsg ? (<ResponseMessage message={successMsg} type="success" slice={resetEducationSlice()}/>) : ""
      }

      {
        error ? (<ResponseMessage message={error} type="error"  slice={resetEducationSlice()}/>) : ""
      }

      {
        successMsgExp ? (<ResponseMessage message={successMsgExp} type="success" slice={resetExperienceSlice()}/>) : ""
      }

      {
        errorExp ? (<ResponseMessage message={errorExp} type="error" slice={resetExperienceSlice()}/>) : ""
      }
      <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row'>
        <div className='w-full sm:w-full md:w-2/5 lg:w-2/5 xl:w-2/5 h-96 border mr-2 rounded drop-shadow mb-2'>
          {
            me ?
              <img src={me.profile_picture} alt="default" className='w-full h-full object-cover rounded' />
              : <img src="/src/assets/images/default_avatar.png" alt="default" className='w-full h-full object-cover rounded' />
          }
        </div>
        <div className='w-full sm:w-full md:w-3/5 lg:w-3/5 xl:w-3/5 h-96 border rounded drop-shadow-md '>
          <div className='w-full h-20 flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
            <p className='text-5xl m-4'>
              {
                me ? <>
                  {
                    me.user ? <>
                      {me.user.first_name} {me.user.last_name}
                    </> : ""
                  }
                </> : ""
              }
            </p>
            <NavLink to="profile-update" className={`rounded btn-main-bg w-50 h-10 p-2 m-4`}>Məlumatları Dəyiş</NavLink>
          </div>
          <div className={`w-full h-72 flex flex-col justify-between p-4 rounded mt-16 sm:mt-16 md:mt-16 lg:mt-16 xl:mt-4`}>
            <div className='overflow-auto h-48'>
              <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                <p className='text-slate-400'>Email:</p>
                <span>
                  {
                    me ? <>
                      {
                        me.user ? <>
                          {me.user.email}
                        </> : ""
                      }
                    </> : "-"
                  }
                </span>
              </div>
              <hr />
              <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                <p className='text-slate-400'>Telefon nömrəsi:</p>
                <span>
                  {
                    me ? <>{me.phone_number}</> : "-"
                  }
                </span>
              </div>
              <hr />
              <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                <p className='text-slate-400'>Doğum tarixi:</p>
                <span>
                  {
                    me ? <>{me.birthdate}</> : "-"
                  }
                </span>
              </div>
              <hr />
              <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                <p className='text-slate-400'>Ünvan:</p>
                <span>
                  {
                    me ? <>{me.address}</> : "-"
                  }
                </span>
              </div>
              <hr />
              <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                <p className='text-slate-400'>Evlilik statusu:</p>
                <span>
                  {
                    me ? <>
                      {
                        me.marital_status === "single" ? "Subay" : "Evli"
                      }
                    </> : "-"
                  }
                </span>
              </div>
              <hr />
              <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                <p className='text-slate-400'>İşləmə statusu:</p>
                <span>
                  {
                    me ? <>
                      {
                        me.employment_status === "working" ? "İşləyir" : "İşləmir"
                      }
                    </> : "-"
                  }
                </span>
              </div>
              <hr />
              <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                <p className='text-slate-400'>Ev statusu:</p>
                <span>
                  {
                    me ? <>
                      {
                        me.housing_status === "own home" ? "Şəxsi ev" : "Kirayə"
                      }
                    </> : "-"
                  }
                </span>
              </div>
              <hr />
              <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between'>
                <p className='text-slate-400'>Kredit kartı nömrəsi:</p>
                <span>
                  {
                    me ? <>{me.credit_cart_number}</> : "-"
                  }
                </span>
              </div>
              <hr />
              <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-col'>
                <p className='text-slate-400'>Haqqında:</p>
                <span className='place-items-end'>
                  {
                    me ? <>{
                      me.about ? <>{me.about}</> : "-"
                    }</> : "-"
                  }
                </span>
              </div>
              <hr />
              <div className='w-full flex flex-col md:flex-col lg:flex-col xl:flex-col'>
                <p className='text-slate-400'>Biznes fəaliyytələri:</p>
                <span className='place-items-end'>
                  {
                    me ? <>{
                      me.business_activities ? <>{me.business_activities}</> : "-"
                    }</> : "-"
                  }
                </span>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-96 border pt-4 mt-5 mr-2 rounded drop-shadow-md'>
        <div>
          <button onClick={() => { setShowTab(<EntreprenuerTable />) }} className={`p-2 ml-2 rounded btn-main-bg`}>Yatırımlarım</button>
          <button onClick={() => { setShowTab(<Orders />) }} className={`p-2 ml-2 rounded btn-main-bg`}>Sifarişlərim</button>
          <button onClick={() => { setShowTab(<Education />) }} className={`p-2 ml-2 rounded btn-main-bg`}>Təhsilim</button>
          <button onClick={() => { setShowTab(<Experience />) }} className={`p-2 ml-2 rounded btn-main-bg`}>Təcrübələrim</button>
        </div>
        <div className='overflow-auto'>
          {
            showTab
          }
        </div>
      </div>
    </div>
  )
}

export default Profile