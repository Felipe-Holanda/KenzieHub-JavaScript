import { toast } from "react-toastify";
import api from "../../services/api";
import { Title2, Button, ButtonDisabed, Headline, HeadlineBold } from "../../styles";
import { Modal, ModalBody, ModalContent, ModalHeader } from "../../styles/modal";

export default function DeleteModal(props) {

    const handleDelete = () => {
        api.delete('/users/techs/' + props.props.id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('@TOKEN')
            }
        }).then((response) => {
            toast.success("Tecnologia deletada com sucesso!")
            props.handleDeleteModal()
        }).catch((error) => {
            toast.error("Erro ao deletar tecnologia!")
        });
    }
    return (
        <Modal>
            <ModalContent>
                <ModalHeader>
                    <Title2>Desejas deletar esta tecnologia? </Title2>
                </ModalHeader>
                <ModalBody>
                    <div id="bySide">
                        <Button onClick={() => handleDelete()}>Prosseguir</Button>
                        <ButtonDisabed onClick={() => props.handleDeleteModal()} >Cancelar</ButtonDisabed>
                    </div>
                    <div className="footerInformation">
                        <HeadlineBold>Você adicionou esta tecnologia em:</HeadlineBold>
                        <Headline>{props.props.created_at}</Headline>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}