import React, { useState } from 'react'
import UsersTable from '../../components/Admin/UsersTable';
import Projects from '../../components/Admin/Projects';
import Report from '../../components/Admin/Report';

const Admin = () => {
  const [showTab, setShowTab] = useState(<UsersTable />);

    return (
        <>
            <div className='w-full pt-4 mt-5 mr-2 rounded drop-shadow-md overflow-auto h-5/6'>
                <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
                    <button onClick={() => { setShowTab(<UsersTable />) }} className={`p-2 rounded btn-main-bg`}>İstifadəçilər</button>
                    <button onClick={() => { setShowTab(<Projects />) }} className={`p-2 ml-2 rounded btn-main-bg`}>Lahiyələr</button>
                    <button onClick={() => { setShowTab(<Report />) }} className={`p-2 ml-2 rounded btn-main-bg`}>Hesabat</button>
                </div>
                <div className='overflow-auto'>
                    {
                        showTab
                    }
                </div>
            </div>
        </>
    )
}

export default Admin