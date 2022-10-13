import { useNavigate } from "react-router-dom";
import { Button, Form, HeaderTitle, Headline, Select, Title2, Input, ErrorText } from "../../styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

export default function Register() {

    const formSchema = yup.object().shape({
        name: yup.string().required("Campo obrigatório").matches(/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi, "Preencha com Nome e Sobrenome!"),
        email: yup.string().email("E-mail inválido").required("Campo obrigatório").matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, "E-mail inválido"),
        password: yup.string().min(6, "Mínimo de 6 caracteres").required("Campo obrigatório").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/, "Sua senha deve conter: 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial (Apenas: @#!)"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não coincidem").required("Campo obrigatório"),
        bio: yup.string().required("Preencha este campo").matches(/^.{10,}$/, "Não seja tímido, Fale um pouco sobre você! (15 Caracteres no mínimo)"),
        contact: yup.string().required("Campo obrigatório"),
        courseModule: yup.string().required("Campo obrigatório").matches(/^(1|2|3|4|5|6)$/, "Módulo inválido"),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
    });

    const navigate = useNavigate();

    function onSubmit(data) {
        try {
            axios.post('https://kenziehub.herokuapp.com/users', {
                email: data.email,
                password: data.password,
                name: data.nome,
                bio: data.bio,
                contact: data.contact,
                course_module: identifyCourse(data.courseModule)
            }).then(function (response) {
                navigate('/');
                toast.success("Cadastro realizado com sucesso, autentique-se na página de login!");
            }).catch(function (error) {
                if (error.response.data.message === "Email already registered") {
                    toast.error("E-mail já cadastrado! Tente fazer login.");
                } else if (error.response.data.message === "Email already exists") {
                    toast.error("E-mail já cadastrado! Tente fazer login.");
                }
            })
        } catch (error) {
            toast.error("Erro ao cadastrar usuário!");
        }
    }

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



    return (
        <div className="container">
            <header>
                <HeaderTitle>KenzieHub</HeaderTitle>
                <button onClick={() => { navigate('/', { replace: true }) }}>Voltar</button>
            </header>
            <Form onSubmit={handleSubmit((data) => { onSubmit(data) })}>
                <Title2 position="center">Crie sua conta</Title2>
                <Headline color="grey" position="center">Rapido e gratis, vamos nessa</Headline>
                <Headline htmlFor="nome">Nome</Headline>
                <Input type="text" placeholder="Digite aqui seu nome" {...register('name')} />
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
                <Select {...register('course_module')}>
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