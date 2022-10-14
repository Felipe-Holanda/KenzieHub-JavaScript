import { Modal, ModalBody, ModalHeader, ModalContent } from "../../styles/modal"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { Select, Headline, Title2, Button, ErrorText } from "../../styles"

export default function EditModal(props) {
    return (
        <Modal>
            <ModalContent>
                <ModalHeader>
                    <Title2>Editar Tecnologia</Title2>
                    <i onClick={() => {
                        props.handleEditModal()
                    }} className='bx bx-x'></i>
                </ModalHeader>
                <ModalBody>
                    <form id="addForm">
                        <Headline>Nível de Domínio</Headline>
                        <Select>
                            <option value="0">Selecione seu nível</option>
                            <option value="1">Iniciante</option>
                            <option value="2">Intermediário</option>
                            <option value="3">Avançado</option>
                        </Select>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}