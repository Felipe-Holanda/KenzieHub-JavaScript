import './default.css';
import styled from "styled-components";

const colors = {
    primary: "#FF577F",
    primaryFocus: "#FF427F",
    primaryNegative: "#59323F"
}

const greys = {
    grey0: "#F8F9FA",
    grey1: "#868E96",
    grey2: "#343B41",
    grey3: "#212529",
    grey4: "#121214"
}

function identify(arg) {
    if (arg === "pink") {
        return colors.primary
    } else if (arg === "grey") {
        return greys.grey1
    } else if (arg === "white") {
        return greys.grey0
    }
}

function alignIt(arg) {
    if (arg === "left") {
        return `left`
    } else if (arg === "center") {
        return `center`
    } else if (arg === "right") {
        return `right`
    }
}

export const ErrorText = styled.small`
    color: red;
    text-align: center;
    font-family: 'Inter', sans-serif;
    margin-top: 10px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: ${greys.grey3};
`

export const Button = styled.button`
    margin: 2em 0;
    border: none;
    color: white;
    padding: 1em;
    padding: ${(props) => `${props.width}em ${props.height}em`};
    border-radius: 0.5em;
    background-color: ${colors.primary};

    &:hover{
        cursor: pointer;
        background-color : ${colors.primaryFocus};
    }
`
export const ButtonNegative = styled.button`
    margin: 2em 0;
    font-family: 'Inter', sans-serif;
    border: none;
    color: white;
    padding: 1em;
    padding: ${(props) => `${props.width}em ${props.height}em`};
    border-radius: 0.5em;
    background-color: ${colors.primaryNegative};

    &:hover{
        cursor: not-allowed;
    }
`
export const ButtonDisabed = styled.span`
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    text-align: center;
    color: white;
    padding: 1em;
    padding: ${(props) => `${props.width}em ${props.height}em`};
    border-radius: 0.5em;
    background-color: ${greys.grey1};

    &:hover{
        cursor: pointer;
        background-color: ${greys.grey2};
    }
`

export const HeaderTitle = styled.h1`
    font-size: 22px;
    color: ${colors.primary};
    font-family: 'Inter' , sans-serif;
    text-align: center;
`

export const Title1 = styled.h1`
    font-size: 16px;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
    color: white;
    color: white;
    color: ${(props) => identify(props.color)};
    text-align: ${(props) => alignIt(props.position)}
`

export const Title2 = styled.h2`
    font-size: 16px;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
    color: white;
    color: white;
    color: ${(props) => identify(props.color)};
    text-align: ${(props) => alignIt(props.position)}
`

export const Title3 = styled.h3`
    font-size: 16px;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
    color: white;
    color: ${(props) => identify(props.color)};
    text-align: ${(props) => alignIt(props.position)}
`

export const Headline = styled.p`
    font-size: 12px;
    font-weight: normal;
    font-family: 'Inter', sans-serif;
    color: white;
    color: ${(props) => identify(props.color)};
    text-align: ${(props) => alignIt(props.position)}

`

export const HeadlineBold = styled.p`
    font-size: 12px;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
    color: white;
    color: ${(props) => identify(props.color)};
    text-align: ${(props) => alignIt(props.position)}
`

export const HeadlineItalic = styled.p`
    font-size: 12px;
    font-weight: italic;
    font-family: 'Inter', sans-serif;
    color: white;
    color: ${(props) => identify(props.color)};
    text-align: ${(props) => alignIt(props.position)}
`

export const Input = styled.input`
    font-size: 12px;
    font-weight: normal;
    font-family: 'Inter', sans-serif;
    border: none;
    background-color: ${greys.grey2};
    color: ${greys.grey1};
    padding: 1.2em 2em;
    border-radius:.5em;

    &:focus {
        outline: 1px solid ${greys.grey0};
        color: ${greys.grey0};
    }

`

export const Select = styled.select`
    font-size: 12px;
    font-weight: normal;
    font-family: 'Inter', sans-serif;
    border: none;
    background-color: ${greys.grey2};
    color: ${greys.grey1};
    padding: 1.2em 2em;
    border-radius:.5em;

    &:focus {
        outline: 1px solid ${greys.grey0};
        color: ${greys.grey0};
    }
`