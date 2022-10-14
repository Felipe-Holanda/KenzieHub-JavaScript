import { Title1 } from "../../styles"

export default function Techs({ children }) {

    return (
        <>
            <section id="techsContainer">
                <div>
                    <Title1 position="center">Tecnologias</Title1>
                    <i className='bx bx-plus'></i>
                </div>
                <ul>
                    {children}
                </ul>
            </section>
        </>
    )
}