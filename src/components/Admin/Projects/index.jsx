import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AuthInput from '../../InputComponents/AuthInput';
import style from "./style.module.css"
import { getAllEntrepreneurAsync } from '../../../redux/EntrepreneurSlice/EntrepreneurSlice';
import { DatePicker, Pagination } from 'antd';
import RadioInput from '../../InputComponents/RadioInput';


const Projects = () => {
    let [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const dispatch = useDispatch();
    let entrepreneurs = useSelector((state) => state.entrepreneur.entrepreneurs)
    let totalPage = useSelector((state) => state.entrepreneur.totalPage)
    let pageLimit = useSelector((state) => state.entrepreneur.pageLimit)

    console.log(entrepreneurs);

    const formik = useFormik({
        initialValues: {
            offset: "",
            start_date__gte: "",
            end_date__gte: "",
            owner: "",
            project_name__icontains: "",
            is_finished: "",
            is_active: ""
        },
        onSubmit: (values) => {
            values.start_date__gte = startDate;
            values.end_date__gte = endDate;
            let filteredValues = { ...values };
            dispatch(getAllEntrepreneurAsync(filteredValues));
        }
    })

    useEffect(() => {
        let filteredValues = { ...formik.values };
        dispatch(getAllEntrepreneurAsync(filteredValues));
    }, [dispatch, formik.values])

    const changePage = (e) => {
        setCurrentPage(e);
        let offset = (e - 1) * pageLimit;
        formik.values.offset = offset;
        let filteredValues = { ...formik.values };
        dispatch(getAllEntrepreneurAsync(filteredValues));
    };

    return (
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col'>
            <div className='w-full flex flex-row flex-wrap'>
                <div className='w-full sm:w-full md:w-1/5 lg:w-1/5'>
                    <form className='rounded h-2/4 flex flex-col' onSubmit={formik.handleSubmit}>
                        <AuthInput
                            placeholder="Proyektin adı"
                            id="project_name__icontains"
                            name="project_name__icontains"
                            type="text"
                            value={formik.values.project_name__icontains}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            // touched={formik.touched.project_name_icontains}
                            // style={{marginTop: '10px'}}
                        />
                        <DatePicker
                            placeholder="Başlanğıc tarix"
                            className="select-time mb-2 mt-2 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder-gray-500 placeholder-opacity-50"
                            // id='start_date__gte'
                            // name='start_date__gte'
                            onChange={(e) => (e ? setStartDate(`${e.$y}-${e.$M + 1}-${e.$D}`) : setStartDate(""))}
                            // onBlur={formik.handleBlur}
                            format="YYYY-MM-DD"
                        />
                        <DatePicker
                            placeholder="Son tarix"
                            className="select-time block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder-gray-500 placeholder-opacity-50"
                            // id='end_date__gte'
                            // name='end_date__gte'
                            onChange={(e) => (e ? setEndDate(`${e.$y}-${e.$M + 1}-${e.$D}`) : setEndDate(""))}
                            // onBlur={formik.handleBlur}                            
                            format="YYYY-MM-DD"
                        />
                     
                        <div className='mt-2 mb-2 border pl-2 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300'>
                            <label className="block text-sm font-bold leading-6 text-gray-900">
                                finished/continue
                            </label>
                            <div className="">
                                <RadioInput
                                    label="bitib"
                                    id="true"
                                    name="is_finished"
                                    type="radio"
                                    value="true"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                    checked={formik.values.is_finished == "true" ? "checked" : ""}
                                />
                                <RadioInput
                                    label="davam edir"
                                    id="false"
                                    name="is_finished"
                                    type="radio"
                                    value="false"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                    checked={formik.values.is_finished == "false" ? "checked" : ""}
                                />
                            </div>
                        </div>

                        <div className=' border pl-2 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300'>
                            <label className="block text-sm font-bold leading-6 text-gray-900">
                                aktiv/deaktiv
                            </label>
                            <div className="">
                                <RadioInput
                                    label="aktiv"
                                    id="true"
                                    name="is_active"
                                    type="radio"
                                    value="true"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                    checked={formik.values.is_active == "true" ? "checked" : ""}
                                />
                                <RadioInput
                                    label="deaktiv"
                                    id="false"
                                    name="is_active"
                                    type="radio"
                                    value="false"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                    checked={formik.values.is_active == "false" ? "checked" : ""}
                                />
                            </div>
                        </div>

                        <button type='submit' className={`${style.search_btn} btn-main-bg rounded mt-4`}>Axtar</button>
                    </form>
                </div>
                <div className='w-full sm:w-full md:w-4/5 lg:w-4/5 mt-0 sm:mt-10 md:mt-0 lg:mt-0'>
                    <table className='table-auto w-full ml-5'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600'>Proyektin Adı</th>
                                <th className='border border-slate-600'>Başlanğıc tarix</th>
                                <th className='border border-slate-600'>Son tarix</th>
                                <th className='border border-slate-600'>bitib/davam edir</th>
                                <th className='border border-slate-600'>Aktiv/Deaktiv</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entrepreneurs.map((v, i) => (
                                <tr key={"entrepreneur" + v.id}>
                                    <td className='border border-slate-700 pl-2'>{v.project_name}</td>
                                    <td className='border border-slate-700 pl-2'>{v.start_date}</td>
                                    <td className='border border-slate-700 pl-2'>{v.end_date}</td>
                                    <td className='border border-slate-700 pl-2'>{v.is_finished ? "bəli" : "xeyr"}</td>
                                    <td className='border border-slate-700 pl-2'>{v.is_active ? "bəli" : "xeyr"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ***************** Pagination ********************* */}
            <div>
                <div className="flex justify-center mt-10">

                    <Pagination
                        onChange={(e) => {
                            changePage(e);
                        }}
                        className="pagination"
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

export default Projects