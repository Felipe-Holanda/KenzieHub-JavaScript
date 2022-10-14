import * as yup from "yup";

export const schemaAdd = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    status: yup.string().required("Campo obrigatório").matches(/^(1|2|3)$/, "Status inválido"),
})

export default schemaAdd;