import { HeadlineBold, ListItem, Title3 } from "../../styles";
import { useState } from "react";
import { EditModal } from "../EditModal";

export default function TechCard({ props },) {

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const handleEditModal = () => {
        setIsEditModalVisible(!isEditModalVisible);
    }

    return (
        <ListItem>
            <Title3>{props.title}</Title3>
            <div>
                <HeadlineBold color="grey">{props.status}</HeadlineBold>
                <i onClick={() => { handleEditModal() }} className='bx bxs-edit'></i>
                {isEditModalVisible && <EditModal props={props} handleModal={handleEditModal} />}
                <i onClick={() => { }} className='bx bxs-trash'></i>
            </div>
        </ListItem>
    )
}