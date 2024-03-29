import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getMeAsync } from '../../../redux/AuthSlice/AuthSlice';
import { deleteExperienceAsync, getExperienceAsync } from '../../../redux/ExperienceSlice/ExperienceSlice';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
const { confirm } = Modal;

const Experience = () => {

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Silmək istədiyinizə əminsinizmi?',
      icon: <ExclamationCircleFilled />,
      content: '',
      okText: 'Bəli',
      okType: 'danger',
      cancelText: 'Xeyr',
      onOk() {
        dispatch(deleteExperienceAsync({'id':id})).then(()=>{dispatch(getExperienceAsync(me.id))})
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const dispatch = useDispatch();

  let experiences = useSelector((state)=>state.experience.experiences)
  let me = useSelector((state)=>state.auth.me)

  console.log(me);

  useEffect(()=>{
    dispatch(getMeAsync());
    dispatch(getExperienceAsync(me.id));
  }, [])

  return (
    <div className='mt-4 mx-4 flex flex-col overflow-auto h-72'>
      <NavLink to="add-experience" className={`rounded btn-main-bg text-center w-40 p-2 mb-2`}>Yeni əlavə et</NavLink>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border border-slate-600">Müəssisə</th>
            <th className="border border-slate-600">Vəzifə</th>
            <th className="border border-slate-600">Açıqlama</th>
            <th className="border border-slate-600">Şəhər</th>
            <th className="border border-slate-600">Başlama tarixi</th>
            <th className="border border-slate-600">Bitmə edirmi</th>
            <th className="border border-slate-600">Davam edirmi</th>
            <th className="border border-slate-600"></th>
          </tr>
        </thead>  
        <tbody>
          {experiences.map((v, i) => (
          <tr key={"experience" + v.id}> 
            <td className="border border-slate-700 pl-2">{v.experience_place}</td>
            <td className="border border-slate-700 pl-2">{v.position}</td>
            <td className="border border-slate-700 pl-2">{v.description}</td>
            <td className="border border-slate-700 pl-2">{v.city}</td>
            <td className="border border-slate-700 pl-2">{v.start_year}</td>
            <td className="border border-slate-700 pl-2">{v.end_year}</td>
            <td className="border border-slate-700 pl-2">{v.is_continue ? "Bəli" : "Xeyr"}</td>
            <td className='border border-slate-700 pl-2'>
              <div className='flex justify-center'>
                <NavLink to={`update-experience/${v.id}`} className={`px-2 mx-2`}><div className='w-5 h-10 pt-2 edit'><img src='/src/assets/icons/edit-icon.svg' alt="" /></div></NavLink>
                <NavLink onClick={()=>{showDeleteConfirm(v.id)}} className={`px-2 mx-2`}><div className='w-5 h-10 pt-1 delete'><img src='/src/assets/icons/remove.svg' alt="" /></div></NavLink>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Experience