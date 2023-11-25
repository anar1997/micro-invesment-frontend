import { useFormik } from 'formik'
import React from 'react'
import AuthInput from '../../../InputComponents/AuthInput';
import style from "./style.module.css"
import { useDispatch } from 'react-redux';
import { postExperienceAsync } from '../../../../redux/ExperienceSlice/ExperienceSlice';
import { useNavigate } from 'react-router-dom';
import CheckInput from '../../../InputComponents/CheckInput';


const AddExperience = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            experience_place: "",
            position: "",
            description: "",
            city: "",
            start_year: "",
            end_year: "",
            is_continue: false
        },
        onSubmit: (values) => {
            if(values.is_continue) {
                values.end_year = null
            }
            dispatch(postExperienceAsync(values))
            .then(()=>{
                navigate("/profile")
            });
        }
    })

    return (
        <div className='mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6' onSubmit={formik.handleSubmit}>
                <AuthInput
                    label="Müəssisə"
                    id="experience_place"
                    name="experience_place"
                    type="text"
                    style={style}
                    value={formik.values.experience_place}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <AuthInput
                    label="Vəzifə"
                    id="position"
                    name="position"
                    type="text"
                    style={style}
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <AuthInput
                    label="Açıqlama"
                    id="description"
                    name="description"
                    type="text"
                    style={style}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <AuthInput
                    label="Şəhər"
                    id="city"
                    name="city"
                    type="text"
                    style={style}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <AuthInput
                    label="Başlanğıc tarixi"
                    id="start_year"
                    name="start_year"
                    type="number"
                    style={style}
                    value={formik.values.start_year}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                    formik.values.is_continue ? "" : (
                        <AuthInput
                            label="Bitmə tarixi"
                            id="end_year"
                            name="end_year"
                            type="number"
                            style={style}
                            value={formik.values.end_year}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    )
                }
                <CheckInput
                    label="Davam edirmi"
                    id="is_continue"
                    name="is_continue"
                    type="checkbox"
                    style={style}
                    value={formik.values.is_continue}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Əlavə et
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddExperience