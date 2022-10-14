import { Title1 } from "../../styles"
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
                    <i onClick={() => {
                        handleModal()
                    }} className='bx bx-plus'></i>

                </div>
                <ul>
                    {children}
                </ul>
            </section>
            {isModalVisible && <AddModal handleModal={handleModal} />}
        </>
    )
}