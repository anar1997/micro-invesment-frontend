import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAsync } from '../../../redux/AuthSlice/AuthSlice';
import AuthInput from '../../InputComponents/AuthInput';
import style from "./style.module.css"
import { useFormik } from 'formik';
import { Pagination } from 'antd';


const UsersTable = () => {
    let [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    let users = useSelector((state) => state.auth.users)
    let totalPage = useSelector((state) => state.auth.totalPage)
    let pageLimit = useSelector((state) => state.auth.pageLimit)

    console.log(users);

    const formik = useFormik({
        initialValues: {
            fullname: "",
            is_active: "",
            offset: "",
            first_name: "",
            last_name: "",
            email: "",
            birthdate: "",
            address: "",
            marital_status: "",
            employment_status: "",
            housing_status: "",
            phone_number: "",
            credit_cart_number: "",
            debt_amount: 0,
            monthly_income: 0,
            about: "",
            business_activities: "",
            profile_picture: "",
            references: [],
            password: "",
            monthly_income__gte: 0,
            monthly_income__lte: 0
        },
        onSubmit: (values) => {
            let filteredValues = { ...values };
            dispatch(getAllUsersAsync(filteredValues))
        }
    })

    useEffect(() => {
        let filteredValues = { ...formik.values };
        dispatch(getAllUsersAsync(filteredValues));
    }, [dispatch, formik.values])

    const changePage = (e) => {
        setCurrentPage(e);
        let offset = (e-1) * pageLimit
        formik.values.offset = offset
        let filteredValues = { ...formik.values };
        dispatch(getAllUsersAsync(filteredValues))
    }


    return (
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col'>
            <div className='w-full flex flex-row flex-wrap'>
                <div className='w-full sm:w-full md:w-1/5 lg:w-1/5'>
                    <form className='rounded h-2/4 flex flex-col' onSubmit={formik.handleSubmit}>
                        <AuthInput 
                            placeholder="Ad"
                            id="fullname"
                            name="fullname" 
                            type="text"
                            value={formik.values.fullname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <button type='submit' className={`${style.search_btn} btn-main-bg rounded mt-4`}>Axtar</button>
                    </form>
                </div>
                <div className='w-full sm:w-full md:w-4/5 lg:w-4/5 mt-0 sm:mt-10 md:mt-0 lg:mt-0'>
                    <table className='table-auto w-full ml-5'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600'>Ad</th>
                                <th className='border border-slate-600'>Aktiv/Deaktiv</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((v, i) => (
                                <tr key={"user" + v.id}>
                                    <td className='border border-slate-700 pl-2'>{v.user.first_name}</td>
                                    <td className='border border-slate-700 pl-2'>{v.user.is_active ? "bəli" : "xeyr"}</td>
                                </tr>
                            ))}
                                {/* <td className='border border-slate-700 pl-2'>asd</td>
                                <td className='border border-slate-700 pl-2'>asd</td> */}
                        </tbody>
                    </table>
                </div>
            </div>
          {/* ***************** Pagination ********************* */}
            <div>
                <div className='flex justify-center mt-10'>
                    <Pagination 
                        onChange={(e)=>{
                            changePage(e);
                        }}
                        className='pagination'
                        current={currentPage}
                        total={totalPage}
                        defaultPageSize={pageLimit}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default UsersTable