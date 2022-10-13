import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body{
    background-color: #121214;
}

header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
}

header button{
    border: none;
    color: #fff;
    background-color: #212529;
    text-decoration: none;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    padding: .8em 2em;
    border-radius: .2em;
}

header button:hover{
    background-color: #1e2328;
    cursor: pointer;
}

.center{
    margin: 0 auto;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

article{
    display: none;
    width: 40%;
    margin: 0 auto;
}

i{
    position: inherit;
    width: fit-content;
    display: inline-flex;
    color: #868E96;
    font-size: 25px;
    align-self: flex-end;
    margin-right: .5em;
    transform: translateY(-1.4em);
}

a[href]{
    color: white;
    text-decoration: none;
}

@media screen and (min-width: 800px) {
    form{
        width: 33%;
        margin: 0 auto;
    }

    .center{
        flex-direction: row;
    }
    article{
        display: block;
    }

    header{
        justify-content: space-evenly;
        padding: 1em  11em;
    }
}
`

export default GlobalStyle;