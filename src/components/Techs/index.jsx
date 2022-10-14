import { LiBtn, Title1 } from "../../styles"
import { useState } from "react"
import AddModal from "../AddModal";

export default function Techs({ children }) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    function handleModal() {
        setIsModalVisible(!isModalVisible);
    }


    return (
        <>
            <section id="techsContainer">
                <div>
                    <Title1 position="center">Tecnologias</Title1>
                    <LiBtn onClick={() => {
                        handleModal()
                    }} className='bx bx-plus'></LiBtn>

                </div>
                <ul>
                    {children}
                </ul>
            </section>
            {isModalVisible && <AddModal handleModal={handleModal} />}
        </>
    )
}