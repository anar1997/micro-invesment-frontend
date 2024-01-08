import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import FileInput from '../../../components/InputComponents/FileInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { getAddPictureAsync, postAddPictureAsync, resetAddPictureSlice } from '../../../redux/AddOrderSlice/AddPictureSlice';
import style from "./style.module.css"
import ResponseMessage from '../../../components/ResponseMessage';


const AddPicture = () => {
    const { state } = useLocation();
    const { id, project_name } = state

    const dispatch = useDispatch();

    let images = useSelector((state)=>state.addPicture.images)

    let successMsg = useSelector((state) => state.addPicture.successMsg)
    let error = useSelector((state) => state.addPicture.error)

    const formik = useFormik({
        initialValues: {
            id: id,
            image: "",
        },
        onSubmit: (values) => {
            dispatch(postAddPictureAsync(values)).then(()=>{
                dispatch(getAddPictureAsync({
                    entrepreneur: id
                }))
            })
        }
    })

    useEffect(() => {
        dispatch(getAddPictureAsync({
            entrepreneur: id
        }))
    }, [dispatch])

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            {
                successMsg ? (<ResponseMessage message={successMsg} type="success" slice={resetAddPictureSlice()}/>) : ""
            }

            {
                error ? (<ResponseMessage message={error} type="error" slice={resetAddPictureSlice()}/>) : ""
            }
            <div className=''>
                <p className='ml-80 font-bold'>
                    {project_name} Media
                </p>
                <hr className='mx-20 mt-5' />
            </div>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6' onSubmit={formik.handleSubmit}>
                    <FileInput 
                        label="Şəkil seç"
                        id="image"
                        name="image"
                        type="file"
                        onChange={(e)=>{
                            formik.setFieldValue("image", e.target.files[0])}}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.image}
                        error={formik.errors.image}
                        style={style}
                    />
                    <div className='flex flex-row flex-wrap  mt-2'>
                        <button className="flex w-40 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                            Əlavə et
                        </button>
                        <NavLink 
                            to="/"
                            className="flex w-40 ml-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Ana Səhifəyə qayıt
                        </NavLink>
                    </div>
                </form>
            </div>
            <div>
                
                <div className='flex flex-row flex-wrap mt-10'>
                    {images.map((image)=>(
                        <img key={image.id} src={image.image} className='w-96 mr-8 mb-8'/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddPicture