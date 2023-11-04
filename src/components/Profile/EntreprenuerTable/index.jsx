import React from 'react'
import { NavLink } from 'react-router-dom'

const EntreprenuerTable = () => {
  return (
    <div>
      <NavLink className={`rounded btn-main-bg text-center w-40 h-10 p-2 mb-2`}>Yeni əlavə et</NavLink>
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='border border-slate-600'>a</th>
            <th className='border border-slate-600'>b</th>
            <th className='border border-slate-600'>c</th>
            <th className='border border-slate-600'>c</th>
            <th className='border border-slate-600'>c</th>
            <th className='border border-slate-600'>c</th>
            <th className='border border-slate-600'></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border border-slate-700'>a</td>
            <td className='border border-slate-700'>b</td>
            <td className='border border-slate-700'>c</td>
            <td className='border border-slate-700'>c</td>
            <td className='border border-slate-700'>c</td>
            <td className='border border-slate-700'>c</td>
            <td className='border-r border-b border-slate-700 flex justify-center'>
              <NavLink className={`px-2 mx-2`}><img className='w-5 h-10 edit' src='src/assets/icons/edit-icon.svg' alt="" /></NavLink>
              <NavLink className={`px-2 mx-2`}><img className='w-5 h-10 delete' src='/src/assets/icons/remove.svg' alt="" /></NavLink>
            </td>
          </tr>
          <tr>
            <td className='border border-slate-700'>a</td>
            <td className='border border-slate-700'>b</td>
            <td className='border border-slate-700'>c</td>
            <td className='border border-slate-700'>c</td>
            <td className='border border-slate-700'>c</td>
            <td className='border border-slate-700'>c</td>
            <td className='border-r border-b border-slate-700 flex justify-center'>
              <NavLink className={`px-2 mx-2`}><img className='w-5 h-10 edit' src='src/assets/icons/edit-icon.svg' alt="" /></NavLink>
              <NavLink className={`px-2 mx-2`}><img className='w-5 h-10 delete' src='/src/assets/icons/remove.svg' alt="" /></NavLink>
            </td>
          </tr>
          <tr>
            <td className='border border-slate-700'>a</td>
            <td className='border border-slate-700'>b</td>
            <td className='border border-slate-700'>c</td>
            <td className='border border-slate-700'>c</td>
            <td className='border border-slate-700'>c</td>
            <td className='border border-slate-700'>c</td>
            <td className='border-r border-b border-slate-700 flex justify-center'>
              <NavLink className={`px-2 mx-2`}><img className='w-5 h-10 edit' src='src/assets/icons/edit-icon.svg' alt="" /></NavLink>
              <NavLink className={`px-2 mx-2`}><img className='w-5 h-10 delete' src='/src/assets/icons/remove.svg' alt="" /></NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default EntreprenuerTable