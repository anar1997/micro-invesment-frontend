import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import AuthInput from '../../../InputComponents/AuthInput';
import style from "./style.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { getExperienceDetailAsync, putExperienceAsync } from '../../../../redux/ExperienceSlice/ExperienceSlice';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateExperience = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    let experience = useSelector((state) => state.experience.experience)

    console.log(id);

    const formik = useFormik({
        initialValues: {
            experience_place: experience ? experience.experience_place || "" : "",
            position: experience ? experience.position || "" : "",
            description: experience ? experience.position || "" : "",
            city: experience ? experience.position || "" : "",
            start_year: experience ? experience.start_year || "" : "",
            end_year: experience ? experience.end_year || "" : "",
            is_continue: experience ? experience.is_continue || false : false,
        },
        onSubmit: (values) => {
            if (values.is_continue) {
                values.end_year = null
            }
            values.id = id
            dispatch(putExperienceAsync(values))
            .then(()=>{
                navigate("/profile")
            });
        }
    })

    useEffect(()=>{
        dispatch(getExperienceDetailAsync({"id" : id}));
    }, [dispatch])

    useEffect(()=>{
        if(experience) {
            formik.setValues({
                experience_place: experience ? experience.experience_place || "" : "",
                position: experience ? experience.position || "" : "",
                description: experience ? experience.description || "" : "",
                city: experience ? experience.city || "" : "",
                start_year: experience ? experience.start_year || "" : "",
                end_year: experience ? experience.end_year || "" : "",
                is_continue: experience ? experience.is_continue || false : false,
            })
        }
    }, [experience])

    console.log(experience);

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
                    type="date"
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
                            type="date"
                            style={style}
                            value={formik.values.end_year}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    )
                }
                <AuthInput
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
                        Məlumatları dəyiş
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateExperience