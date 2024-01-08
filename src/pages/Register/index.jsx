import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import AuthInput from "../../components/InputComponents/AuthInput";
import RadioInput from "../../components/InputComponents/RadioInput";
import validations from "./validation";
import style from "./style.module.css"
import FileInput from "../../components/InputComponents/FileInput";
import MultiSelectDropdown from "../../components/InputComponents/MultiSelectDropdown";
import TextAreaInput from "../../components/InputComponents/TextAreaInput";
import { getAllUsersAsync, postRegisterAsync } from "../../redux/AuthSlice/AuthSlice";


function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    let users = useSelector((state) => state.auth.users)
    let usersData = []  

    if(users){
        console.log("burdayam");
        usersData = users.map((result)=> ({
            value: result.id,
            label: `${result.user.first_name} ${result.user.last_name}` 
        }))
    }    
   
    const formik = useFormik({
        initialValues: {
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
        },
        onSubmit: (values) => {
            console.log('burdayam');
            // values.references === users
            let refer = []
            values.references.map((re)=>(
                refer.push(re.value)
            ))
            values.references = refer
            dispatch(postRegisterAsync(values)).then(()=>{navigate('/login')});
        },
        // validationSchema: validations,
    });

    let successMsg = useSelector((state) => state.auth.successMsg)
    let errorMsg = useSelector((state) => state.auth.error)

    useEffect(() => {
        dispatch(getAllUsersAsync({
            birthdate: "",
            marital_status: "",
            employment_status: "",
            housing_status: "",
            phone_number: "",
            monthly_income: "",
            monthly_income__gte: "",
            monthly_income__lte: ""
        }))
    }, [dispatch])  


    const access = localStorage.getItem("access");

    useEffect(() => {
        if (access != null) {
            navigate("/");
        }
    }, [navigate, access]);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {
                    errorMsg && (
                    <div className="error-div">
                        <span>
                        {errorMsg}
                        </span>
                    </div>)
                }
                {
                    successMsg && (
                    <div className="error-div">
                        <span>
                        {successMsg}
                        </span>
                    </div>)
                }
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Qeydiyyatdan keçin:
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <AuthInput
                            label="Ad"
                            id="first_name"
                            name="first_name"
                            type="text"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.first_name}
                            error={formik.errors.first_name}
                            style={style}
                        />
                        <AuthInput
                            label="Soyad"
                            id="last_name"
                            name="last_name"
                            type="text"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.last_name}
                            error={formik.errors.last_name}
                            style={style}
                        />
                        <AuthInput
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.email}
                            error={formik.errors.email}
                            style={style}
                        />
                        <AuthInput
                            label="Doğum tarixi"
                            id="birthdate"
                            name="birthdate"
                            type="date"
                            value={formik.values.birthdate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.birthdate}
                            error={formik.errors.birthdate}
                            style={style}
                        />
                        <AuthInput
                            label="Ünvan"
                            id="address"
                            name="address"
                            type="text"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.address}
                            error={formik.errors.address}
                            style={style}
                        />

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Ailə statusu
                            </label>
                            <div className="mt-2">
                                <RadioInput
                                    label="Evli"
                                    id="married"
                                    name="marital_status"
                                    type="radio"
                                    value="married"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="Subay"
                                    id="single"
                                    name="marital_status"
                                    type="radio"
                                    value="single"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                İşləmə statusu
                            </label>
                            <div className="mt-2">
                                <RadioInput
                                    label="İşləyirəm"
                                    id="working"
                                    name="employment_status"
                                    type="radio"
                                    value="working"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="İşsizəm"
                                    id="unemployed"
                                    name="employment_status"
                                    type="radio"
                                    value="unemployed"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Ev statusu
                            </label>
                            <div className="mt-2">
                                <RadioInput
                                    label="Şəxsi evim var"
                                    id="own_home"
                                    name="housing_status"
                                    type="radio"
                                    value="own home"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                                <RadioInput
                                    label="Kirayədə qalıram"
                                    id="renting"
                                    name="housing_status"
                                    type="radio"
                                    value="renting"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={style}
                                />
                            </div>
                        </div>
                        <AuthInput
                            label="Telefon nömrəsi"
                            id="phone_number"
                            name="phone_number"
                            type="phone"
                            value={formik.values.phone_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.phone_number}
                            error={formik.errors.phone_number}
                            style={style}
                        />
                        <AuthInput
                            label="Kredit kartı nömrəsi"
                            id="credit_cart_number"
                            name="credit_cart_number"
                            type="text"
                            value={formik.values.credit_cart_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.credit_cart_number}
                            error={formik.errors.credit_cart_number}
                            style={style}
                        />
                        <AuthInput
                            label="Var olan borcunuz"
                            id="debt_amount"
                            name="debt_amount"
                            type="number"
                            value={formik.values.debt_amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.debt_amount}
                            error={formik.errors.debt_amount}
                            style={style}
                        />
                        <AuthInput
                            label="Aylıq gəliriniz"
                            id="monthly_income"
                            name="monthly_income"
                            type="number"
                            value={formik.values.monthly_income}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.monthly_income}
                            error={formik.errors.monthly_income}
                            style={style}
                        />
                        <FileInput
                            label="Profil Şəkli"
                            id="profile_picture"
                            name="profile_picture"
                            type="file"
                            onChange={(e)=>{
                                formik.setFieldValue("profile_picture", e.target.files[0])}}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.profile_picture}
                            error={formik.errors.profile_picture}
                            style={style}
                        />
                        <MultiSelectDropdown
                            label="Referanslar"
                            id="references"
                            name="references"
                            options={usersData}  
                            onChange={(e)=>{
                                formik.setFieldValue("references", e);
                                // console.log(e);
                            }}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.references}
                            error={formik.errors.references}
                            style={style}
                        />
                        <TextAreaInput
                            label="Biznez Fəaliyyətləri"
                            id="business_activities"
                            name="business_activities"
                            value={formik.values.business_activities}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.business_activities}
                            error={formik.errors.business_activities}
                            style={style}
                        />
                        <TextAreaInput
                            label="Qeyd"
                            id="about"
                            name="about"
                            value={formik.values.about}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.about}
                            error={formik.errors.about}
                            style={style}
                        />
                        
                        <AuthInput
                            label="Parol"
                            id="password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            touched={formik.touched.password}
                            error={formik.errors.password}
                            style={style}
                        />
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Qeydiyyatdan keç
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Hesabınız var?{" "}
                        <NavLink
                            to="/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Daxil olun
                        </NavLink>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;
