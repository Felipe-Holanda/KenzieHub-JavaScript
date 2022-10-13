import { useNavigate } from "react-router-dom";
import { Button, Form, HeaderTitle, Headline, Select, Title2, Input, ErrorText } from "../../styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemaRegister from "../../schemas/schemaRegister";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schemaRegister), });
    const navigate = useNavigate();


    function identifyCourse(arg) {
        if (arg === "1") {
            return "Módulo 1 - Introdução ao Frontend";
        } else if (arg === "2") {
            return "Módulo 2 - Frontend Avançado";
        } else if (arg === "3") {
            return "Módulo 3 - React.JS e Redux";
        } else if (arg === "4") {
            return "Módulo 4 - Back-end com Node.JS";
        } else if (arg === "5") {
            return "Módulo 5 - Back-end com Python";
        } else if (arg === "6") {
            return "Módulo 6 - Trilha de Empregabilidade";
        }
    }

    const handleRegister = async (data) => {
        await api.post('/users', {
            email: data.email,
            password: data.password,
            name: data.nome,
            bio: data.bio,
            contact: data.contact,
            course_module: identifyCourse(data.courseModule),
        }).then((response) => {
            api.post('/sessions', {
                email: data.email,
                password: data.password,
            }).then((response) => {
                localStorage.setItem('@TOKEN', response.data.token);
                localStorage.setItem('@USER', JSON.stringify(response.data.user));
                toast.success(`Bem vindo, ${response.data.user.name}! Você está logado!`);
                navigate('/dashboard', { replace: true });
                return response.data;
            })
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                toast.error("E-mail já cadastrado!");
            } else {
                toast.error("Erro ao cadastrar usuário!");
            }
        });
    }

    return (
        <div className="container">
            <header>
                <HeaderTitle>KenzieHub</HeaderTitle>
                <button onClick={() => { navigate('/', { replace: true }) }}>Voltar</button>
            </header>
            <Form onSubmit={handleSubmit((data) => {
                handleRegister(data);
            })}>
                <Title2 position="center">Crie sua conta</Title2>
                <Headline color="grey" position="center">Rapido e gratis, vamos nessa</Headline>
                <Headline htmlFor="nome">Nome e Sobrenome</Headline>
                <Input type="text" placeholder="Digite aqui seu nome e sobrenome" {...register('nome')} />
                {errors.nome && <ErrorText>{errors.nome.message}</ErrorText>}
                <Headline>Email</Headline>
                <Input type="email" placeholder="Digite aqui seu email" {...register('email')} />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                <Headline>Senha</Headline>
                <Input type="password" placeholder="Digite aqui sua senha" {...register('password')} />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                <Headline>Confirme sua senha</Headline>
                <Input type="password" placeholder="Repita aqui sua senha" {...register('confirmPassword')} />
                {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
                <Headline>Bio</Headline>
                <Input type="text" placeholder="Fale sobre você!" {...register('bio')} />
                {errors.bio && <ErrorText>{errors.bio.message}</ErrorText>}
                <Headline>Contato</Headline>
                <Input type="text" placeholder="Opção de contato" {...register('contact')} />
                {errors.contact && <ErrorText>{errors.contact.message}</ErrorText>}
                <Headline>Módulo</Headline>
                <Select {...register('courseModule')}>
                    <option value="0">Selecione o módulo</option>
                    <optgroup label="Front-End">
                        <option value="1">Módulo 1 - (Introdução a Front-End)</option>
                        <option value="2">Módulo 2 - (Front-End Avançado)</option>
                        <option value="3">Módulo 3 - (React)</option>
                    </optgroup>
                    <optgroup label="Back-End">
                        <option value="4">Módulo 4 - (Back-End com Node.JS)</option>
                        <option value="5">Módulo 5 - (Back-End com Python)</option>
                    </optgroup>
                    <optgroup label="Empregabilidade">
                        <option value="6">Módulo 6 - (Soft Skills e Empregabilidade)</option>
                    </optgroup>
                </Select>
                {errors.courseModule && <ErrorText>{errors.courseModule.message}</ErrorText>}
                <Button type="submit">Cadastrar</Button>
            </Form>

        </div>
    )
}