import { HeaderTitle, Headline, HeadlineBold, Title1, Title3 } from "../../styles";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Techs from "../../components/Techs";
import TechCard from "../../components/TechCard";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (!isAuthenticated) {
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
                    navigate('/');
                });
            } catch (error) {
                console.log(error);
            }
        }
    })

    function displayTechs() {
        if (userData.techs) {
            if (userData.techs.length === 0) {
                return (
                    <li>
                        <Title3 position="center">Parece que você não tem nenhuma tecnologia adicionada!</Title3>
                        <HeadlineBold color="grey" position="center">Adicione uma tecnologia para visualizá-la aqui!</HeadlineBold>
                    </li>
                )
            } else {
                return userData.techs.map((tech) => {
                    return (
                        <TechCard key={tech.id} props={tech} setUserData={setUserData} />
                    )
                })
            }
        }
    }

    return (
        <div className="principal">
            <title>Kenzie Hub | Dashboard</title>
            <header>
                <HeaderTitle>KenzieHub</HeaderTitle>
                <button onClick={() => {
                    toast.info('Sua sessão foi encerrada.');
                    navigate('/', { replace: true })
                    localStorage.clear();
                    setIsAuthenticated(false);
                }}>Sair</button>
            </header>
            <div className="container">
                <div className="center">
                    <Title1 position="center">Olá, {userData.name}!</Title1>
                    <Headline color="grey" position="center">{userData.course_module}</Headline>
                </div>
                <Techs>
                    {displayTechs()}
                    {userData.techs && userData.techs.length > 0 && <div id="bySide"><HeadlineBold>Quantidade de Tecnologias adicionadas:</HeadlineBold><Headline>{userData.techs ? userData.techs.length : 0}</Headline></div>}
                </Techs>
            </div>
        </div>
    )
}