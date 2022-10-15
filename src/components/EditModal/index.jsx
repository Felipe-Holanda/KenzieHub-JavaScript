import { Modal, ModalBody, ModalHeader, ModalContent } from "../../styles/modal"
import { useForm } from "react-hook-form"
import schemaEdit from "../../schemas/schemaEdit"
import { yupResolver } from "@hookform/resolvers/yup";
import { Select, Headline, Title2, Button, ErrorText, HeadlineBold } from "../../styles"
import api from "../../services/api"
import { toast } from "react-toastify"

export default function EditModal(props) {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schemaEdit) });


    const dataParse = (data) => {
        if (data === "1") {
            return "Iniciante"
        } else if (data === "2") {
            return "Intermediário"
        } else if (data === "3") {
            return "Avançado"
        }
    }

    const onSubmit = (data) => {
        api.put('/users/techs/' + props.props.id, {
            status: dataParse(data.status)
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@TOKEN')
            }
        }).then((response) => {
            toast.success("Tecnologia editada com sucesso!")
            props.handleEditModal()
        }).catch((error) => {
            console.log(error)
            toast.error("Erro ao editar tecnologia!")
        })
    }

    const formatDate = (date) => {
        const lastEdit = date
        const splitDate = lastEdit.split("T")
        const dateFormated = splitDate[0].split("-")
        const actualDate = dateFormated[2] + "/" + dateFormated[1] + "/" + dateFormated[0]

        const timeFormated = splitDate[1].split(":")
        const actualTime = timeFormated[0] - 3 + ":" + timeFormated[1]

        return actualDate + " às " + actualTime
    }


    return (
        <Modal>
            <ModalContent>
                <ModalHeader>
                    <Title2>Editar sua Tecnologia</Title2>
                    <i onClick={() => { props.handleEditModal() }} className='bx bx-x'></i>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit((data) => { onSubmit(data) })} id="addForm">
                        <Headline>Nível de Domínio</Headline>
                        <Select {...register('status')} >
                            <option value="0">Selecione seu nível</option>
                            <option value="1">Iniciante</option>
                            <option value="2">Intermediário</option>
                            <option value="3">Avançado</option>
                        </Select>
                        {errors.status && <ErrorText>{errors.status.message}</ErrorText>}
                        <Button type="submit">Salvar</Button>
                    </form>
                    <div className="footerInformation">
                        <HeadlineBold>Ultima edição deste dado:</HeadlineBold>
                        <Headline color="grey">{formatDate(props.props.updated_at)}</Headline>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal >
    )
}