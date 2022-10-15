import { ButtonDisabed, HeaderTitle, Headline } from "../../styles";
import { Link } from "react-router-dom";

export default function ErrorPage() {

    const errorMessages = [
        "Acho que você não deveria estar aqui...",
        "Estamos a deriva no mar?",
        "O que você está fazendo aqui?",
        "Você cavalgou para muito longe, forasteiro!",
        "Está perdido?",
        "Longe de casa...",
    ]

    function redirect() {
        if (localStorage.length > 0) {
            if (localStorage.getItem("@TOKEN") !== undefined && localStorage.getItem("@TOKEN") !== null) {
                return <Link to="/dashboard"><ButtonDisabed>Voltar para o Dashboard</ButtonDisabed></Link>
            }
        } else {
            return <Link to="/"><ButtonDisabed>Retornar à página de Login</ButtonDisabed></Link>
        }
    }

    const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    return (
        <div id="errorPage">
            <title>Página não encontrada!</title>
            <i class='bx bxs-ghost'></i>
            <HeaderTitle>{randomMessage}</HeaderTitle>
            <Headline color="grey">A página que você está tentando acessar não existe!</Headline>
            {redirect()}
        </div>
    )
}