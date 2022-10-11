import { HeaderTitle, Headline, Title1, Form, Input, Button, HeadlineBold, ButtonDisabed, ErrorText } from "../../components/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffectX } from 'use-effect-x';

export default function Login() {
    // Tenta recuperar sessão do usuário caso ele tenha pressionado F5 ou saido da página sem querer e retornado antes do Token expirar
    const navigate = useNavigate();
    useEffectX(() => {
        if (localStorage.length > 0) {
            if (localStorage.getItem('@TOKEN') !== null) {
                try {
                    const userToken = localStorage.getItem('@TOKEN');
                    axios.get('https://kenziehub.herokuapp.com/profile', {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        }
                    }).then((_response) => {
                        navigate('/dashboard', { replace: true });
                        toast.success('Recuperamos sua sessão anterior');
                    }).catch((_error) => {

                        toast.error('Encontramos dados de uma sessão anterior, mas ela expirou ou é iválida, autentique-se novamente!');
                        localStorage.clear();
                    });
                } catch (error) {
                }
            }
        }
    }, [toast.success()]);



    const schemaLogin = yup.object().shape({
        email: yup.string().email("Email inválido").required("Campo obrigatório"),
        password: yup.string().required("Campo obrigatório"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schemaLogin) });

    const [type, setType] = useState('password');
    const [eye, setEye] = useState('bx bxs-show');
    const [toFocus, setToFocus] = useState(null);

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

    function onSubmit(data) {
        const body = {
            email: data.email,
            password: data.password,
        }
        try {
            axios.post('https://kenziehub.herokuapp.com/sessions', body)
                .then((response) => {
                    console.log(response)
                    localStorage.setItem("@TOKEN", response.data.token);
                    localStorage.setItem("@USERID", response.data.user.id)
                    navigate('/dashboard');
                    toast.success('Login efetuado com sucesso!');
                }).catch((e) => {
                    if (e.response.status === 401) {
                        toast.error('Email ou senha inválidos!');
                    } else {
                        toast.error('Erro ao efetuar login, tente novamente mais tarde!');
                    }
                });
        } catch (e) {

        }
    }

    return (
        <div className="container">
            <header>
                <HeaderTitle>KenzieHub</HeaderTitle>
            </header>
            <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
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