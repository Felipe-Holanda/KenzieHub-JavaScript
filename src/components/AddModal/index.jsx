import { Button, ErrorText, Title2, Input, Select, Headline } from "../../styles"
import { Modal, ModalContent, ModalBody, ModalHeader, } from "../../styles/modal"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaAdd } from "../../schemas/schemaAdd"
import api from "../../services/api"
import { toast } from "react-toastify"

export default function AddModal(props) {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schemaAdd), });

    function dataParse(arg) {
        if (arg === "1") {
            return "Iniciante"
        } else if (arg === "2") {
            return "Intermediário"
        } else if (arg === "3") {
            return "Avançado"
        }
    }

    function onSubmit(data) {

        const body = {
            title: data.title,
            status: dataParse(data.status),
        }

        api.post(`/users/techs`, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('@TOKEN')}`
            }
        }).then((response) => {
            toast.success("Tecnologia adicionada com sucesso!")
            props.handleModal()
        }).catch((error) => {
            console.log(error)
            if (error.response.status === 401) {
                toast.warn("Você já possui essa tecnologia cadastrada! Considere atualizar o status da mesma.")
            } else {
                toast.error("Erro ao adicionar tecnologia!")
            }
        })
    }


    return (
        <Modal>
            <ModalContent>
                <ModalHeader>
                    <Title2>Adicionar Tecnologia</Title2>
                    <i onClick={() => {
                        props.handleModal()
                    }} className='bx bx-x'></i>
                </ModalHeader>
                <ModalBody>
                    <form id="addForm" onSubmit={handleSubmit((data) => { onSubmit(data) })}>
                        <Headline>Nome da Tecnologia</Headline>
                        <Input type="text" placeholder="Escreva aqui o nome da Tecnologia" {...register('title')} />
                        {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
                        <Headline>Nível de Domínio</Headline>
                        <Select {...register('status')}>
                            <option value="0">Selecione seu nível</option>
                            <option value="1">Iniciante</option>
                            <option value="2">Intermediário</option>
                            <option value="3">Avançado</option>
                        </Select>
                        {errors.status && <ErrorText>{errors.status.message}</ErrorText>}
                        <Button type="submit">Cadastrar Tecnologia</Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}