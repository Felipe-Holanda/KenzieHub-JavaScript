import api from "../../services/api";
import { toast } from "react-toastify";
import { HeadlineBold, ListItem, Title3 } from "../../styles";

export default function TechCard({ props }) {

    function handleDeleteTech(arg) {
        api.delete(`/users/techs/${arg}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            toast.success('Tecnologia deletada com sucesso!');
        }).catch((error) => {
            if (error.response.status === 500) {
                toast.error('Ocorreu um erro, tente novamente mais tarde!');
            } else {
                toast.error('Erro ao deletar tecnologia!');
            }
        });
    }

    return (
        <ListItem>
            <Title3>{props.name}</Title3>
            <div>
                <HeadlineBold color="grey">{props.level}</HeadlineBold>
                <i onClick={() => { handleDeleteTech(props.id) }} className='bx bxs-edit'></i>
                <i onClick={() => { }} className='bx bxs-trash'></i>
            </div>
        </ListItem>
    )
}