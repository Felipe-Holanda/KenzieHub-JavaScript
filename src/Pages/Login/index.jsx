import { HeaderTitle, Headline, Title1, Form, Input, Button, HeadlineBold, ButtonDisabed, ErrorText } from "../../styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import schemaLogin from "../../schemas/schemaLogin";
import { toast } from "react-toastify";
import api from "../../services/api";
import { useEffect } from "react";

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schemaLogin) });

    const [type, setType] = useState('password');
    const [eye, setEye] = useState('bx bxs-show');
    const [toFocus, setToFocus] = useState(null);

    useEffect(() => {
        if (localStorage.length !== 0 && localStorage.getItem('@TOKEN') !== null) {
            const userToken = localStorage.getItem('@TOKEN');
            api.get('/profile', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            }).then((response) => {
                toast.success(`Bem-vindo de volta, ${response.data.name}! Sua sessão anterior foi restaurada!`);
                navigate('/dashboard');
            }).catch((error) => {
                localStorage.clear();
            });
        }
    }, [navigate])

    function togglePasswordView() {
        if (type === 'password') {
            setType('text');
            setEye('bx bxs-hide');
            if (toFocus !== null) {
                toFocus.focus();
            }
        } else {
            setType('password');
            setEye('bx bxs-show');
            if (toFocus !== null) {
                toFocus.focus();
            }
        }
    }

    const handleLogin = async (data) => {
        await api.post('/sessions', {
            email: data.email,
            password: data.password,
        }).then((response) => {
            localStorage.setItem('@TOKEN', response.data.token);
            localStorage.setItem('@USER', JSON.stringify(response.data.user));
            toast.success(`Bem vindo, ${response.data.user.name}! Você está logado!`);
            navigate('/dashboard', { replace: true });
            return response.data;
        }).catch((error) => {
            if (error.response.status === 401) {
                toast.error('Email ou senha incorretos!');
                return 401;
            } else {
                toast.error('Erro ao fazer login!');
                return 500;
            }
        });
    }


    return (
        <div className="principal">
            <title>Kenzie Hub | Login</title>

            <header id="loginPage">
                <HeaderTitle>KenzieHub</HeaderTitle>
            </header>
            <Form onSubmit={handleSubmit((data) => {
                handleLogin(data);
            })}>
                <Title1 position={'center'}>Login</Title1>
                <Headline>Email</Headline>
                <Input type='email' placeholder='Digite seu email' {...register('email')} />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                <Headline>Senha</Headline>
                <Input type={type} placeholder='Digite sua senha' onChange={(e) => { setToFocus(e) }} {...register('password')} />
                <i className={eye} onClick={togglePasswordView}></i>
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                <Button type="submit">Entrar</Button>
                <HeadlineBold color={'grey'} position={'center'}>Não possui uma conta?</HeadlineBold>
                <ButtonDisabed onClick={() => { navigate('/register', { replace: true }) }}>Cadastre-se</ButtonDisabed>
            </Form>
        </div >
    )
}