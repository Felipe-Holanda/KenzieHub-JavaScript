import { HeadlineBold, LiBtn, ListItem, Title3 } from "../../styles";
import { useState } from "react";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";

export default function TechCard({ props }) {

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const handleEditModal = () => {
        setIsEditModalVisible(!isEditModalVisible);
    }

    const handleDeleteModal = () => {
        setIsDeleteModalVisible(!isDeleteModalVisible);
    }

    return (
        <>
            {isEditModalVisible && <EditModal props={props} handleEditModal={handleEditModal} />}
            {isDeleteModalVisible && <DeleteModal props={props} handleDeleteModal={handleDeleteModal} />}
            <ListItem>
                <Title3>{props.title}</Title3>
                <div>
                    <HeadlineBold color="grey">{props.status}</HeadlineBold>
                    <LiBtn onClick={() => { handleEditModal() }} className='bx bxs-edit'></LiBtn>
                    <LiBtn onClick={() => { handleDeleteModal() }} className='bx bxs-trash'></LiBtn>
                </div>
            </ListItem>
        </>
    )
}