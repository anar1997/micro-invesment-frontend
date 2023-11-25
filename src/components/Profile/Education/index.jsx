import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, Routes, Route } from 'react-router-dom'
import { deleteEducationAsync, getEducationAsync } from '../../../redux/EducationSlice/EducationSlice';
import { getMeAsync } from '../../../redux/AuthSlice/AuthSlice';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
const { confirm } = Modal;

const Education = () => {
  
  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Silmək istədiyinizə əminsinizmi?',
      icon: <ExclamationCircleFilled />,
      content: '',
      okText: 'Bəli',
      okType: 'danger',
      cancelText: 'Xeyr',
      onOk() {
        dispatch(deleteEducationAsync({'id':id})).then(()=>{dispatch(getEducationAsync(me.id))})
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const dispatch = useDispatch();

  let educations = useSelector((state)=>state.education.educations)
  let me = useSelector((state)=>state.auth.me)    

  console.log(me);

  useEffect(()=>{
    dispatch(getMeAsync());
    dispatch(getEducationAsync(me.id))
  }, [])

  return (
    <div className='mt-4 mx-4 flex flex-col overflow-auto h-72'>
      <NavLink to="add-education" className={`rounded btn-main-bg text-center w-40 h-10 p-2 mb-2`}>Yeni əlavə et</NavLink>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border border-slate-600">Təhsil aldığı yer</th>
            <th className="border border-slate-600">Sahə</th>
            <th className="border border-slate-600">Şəhər</th>
            <th className="border border-slate-600">Başlama tarixi</th>
            <th className="border border-slate-600">Bitmə tarixi</th>
            <th className="border border-slate-600">Davam edirmi</th>
            <th className="border border-slate-600"></th>
          </tr>
        </thead>
        <tbody>
          {educations.map((v, i) => (
          <tr key={v.id}>
            <td className="border border-slate-700 pl-2">{v.education_place}</td>
            <td className="border border-slate-700 pl-2">{v.education_branch}</td>
            <td className="border border-slate-700 pl-2">{v.city}</td>
            <td className="border border-slate-700 pl-2">{v.start_year}</td>
            <td className="border border-slate-700 pl-2">{v.end_year}</td>
            <td className="border border-slate-700 pl-2">{v.is_continue ? "Bəli" : "Xeyr"}</td>
            <td className='border-r border-b border-slate-700 flex justify-center'>
              <NavLink to={`update-education/${v.id}`} className={`px-2 mx-2`}><img className='w-5 h-10 edit' src='/src/assets/icons/edit-icon.svg' alt="" /></NavLink>
              <NavLink onClick={()=>{showDeleteConfirm(v.id)}} className={`px-2 mx-2`}><img className='w-5 h-10 delete' src='/src/assets/icons/remove.svg' alt="" /></NavLink>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Education