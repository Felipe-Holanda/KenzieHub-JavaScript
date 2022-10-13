import { HeaderTitle, Headline, Title1 } from "../../styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Dashboard() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (localStorage.length === 0 || localStorage.getItem('@TOKEN') === null) {
            toast.error('Você precisa estar logado para acessar essa página!');
            navigate('/');
        } else {
            try {
                const userToken = localStorage.getItem('@TOKEN');
                axios.get('https://kenziehub.herokuapp.com/profile', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }).then((response) => {
                    setUserData(response.data);
                }).catch((error) => {
                    toast.error('Sessão inválida, autentique-se novamente!');
                    navigate('/');
                });
            } catch (error) {
                console.log(error);
            }
        }
    })

    return (
        <div className="container">
            <header>
                <HeaderTitle>KenzieHub</HeaderTitle>
                <button onClick={() => {
                    toast.success('Sessão encerrada com sucesso!');
                    navigate('/', { replace: true })
                    localStorage.clear();
                }}>Sair</button>
            </header>
            <div className="center">
                <Title1 position="center">Olá, {userData.name}!</Title1>
                <Headline color="grey" position="center">{userData.course_module}</Headline>
            </div>
            <article className="onlyPC">
                <Title1>Que pena! Estamos em desenvolvimento :(</Title1>
                <Headline>Nossa aplicação está em desenvolvimento, em breve teremos novidades</Headline>
            </article>
        </div>
    )
}