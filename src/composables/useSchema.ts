import * as yup from "yup";

export const TaskSchema = () => {

    return yup.object({
        Date: yup
            .string()
            .required(() => required()),
        Priority: yup
            .string()
            .required(() => required()),
        Device: yup
            .string()
            .required(() => required()),
        Message: yup
            .string()
            .required(() => required()),
        Owner: yup
            .string()
            .required(() => required()),
    })

};

let required = () => "Это обязательное поле";