import * as yup from "yup";

export const schemaAdd = yup.object().shape({
    status: yup.string().required("Campo obrigatório").matches(/^(1|2|3)$/, "Status inválido"),
});

export default schemaAdd