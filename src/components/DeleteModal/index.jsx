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
                    <Title2>Desejas deletar esta tecnologia? </Title2>
                </ModalHeader>
                <ModalBody>
                    <div id="bySide">
                        <Button onClick={() => handleDelete()}>Prosseguir</Button>
                        <ButtonDisabed onClick={() => props.handleDeleteModal()} >Cancelar</ButtonDisabed>
                    </div>
                    <div className="footerInformation">
                        <HeadlineBold>Você adicionou esta tecnologia em:</HeadlineBold>
                        <Headline color="grey">{formatDate(props.props.created_at)}</Headline>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}