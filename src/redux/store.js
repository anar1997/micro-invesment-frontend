import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice/AuthSlice";
import InvestmentSlice from "./InvestmentSlice/InvestmentSlice";
import EntrepreneurSlice from "./EntrepreneurSlice/EntrepreneurSlice";
import EducationSlice from "./EducationSlice/EducationSlice";
import ExperienceSlice from "./ExperienceSlice/ExperienceSlice";
import EntrepreneurTableSlice from "./EntreprenuerTableSlice/EntrepreneurTableSlice";
import OrderSlice from "./OrderSlice/OrderSlice";
import AddOrderSlice from "./AddOrderSlice/AddOrderSlice";
import AddPictureSlice from "./AddOrderSlice/AddPictureSlice";

export default configureStore({
    reducer: {
        auth: AuthSlice,
        investment: InvestmentSlice,
        entrepreneur: EntrepreneurSlice,
        education: EducationSlice,
        experience: ExperienceSlice,
        entrepreneurTable: EntrepreneurTableSlice,
        order: OrderSlice,
        addOrder: AddOrderSlice,
        addPicture: AddPictureSlice
    }
})