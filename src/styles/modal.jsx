import styled from "styled-components";


const greys = {
    grey0: "#F8F9FA",
    grey1: "#868E96",
    grey2: "#343B41",
    grey3: "#212529",
    grey4: "#121214"
}

export const Modal = styled.span`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0,0,0,0.4);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ModalContent = styled.div`
    width: 95rem;
    max-width: 500px;
    display: flex;
    flex-direction: column;
`

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    background-color: ${greys.grey2};
    color: ${greys.grey0};
    border-radius: 0.5em 0.5em 0 0;
    font-size: 1.5em;
`

export const ModalBody = styled.div`
    padding: 1em;
    background-color: ${greys.grey3};
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0 0 0.5em 0.5em;

`
