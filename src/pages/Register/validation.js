import * as yup from 'yup';

const validations = yup.object().shape({
    first_name: yup.string().required("Ad mütləq daxil edilməlidir!"),
    last_name: yup.string().required("Soyad mütləq daxil edilməlidir!"),
    email: yup.string().email().required("Email mütləq daxil edilməlidir!"),
    birthdate: yup.date().required("Doğum tarixi mütləq daxil edilməlidir!"),
    address: yup.string().required("Ünvan mütləq daxil edilməlidir!"),
    marital_status: yup.string().required("Ailə statusu mütləq daxil edilməlidir!"),
    employment_status: yup.string().required("İş statusu mütləq daxil edilməlidir!"),
    housing_status: yup.string().required("Ev statusu mütləq daxil edilməlidir!"),
    phone_number: yup.string().required("Telefon nömrəsi mütləq daxil edilməlidir!"),
    credit_cart_number: yup.string().required("Kredit kart nömrəsi mütləq daxil edilməlidir!"),
    debt_amount: yup.number().default(0),
    monthly_income: yup.number().default(0),
    references: yup.array().min(1, "Ən az 1 referans daxil edin!"),
    about: yup.string(),
    password: yup.string().required("Parol mütləq daxil edilməlidir!")
})

export default validations;