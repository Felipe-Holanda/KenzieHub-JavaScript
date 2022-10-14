import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body{
    background-color: #121214;
}

header{
    display: flex;
    flex-direction: row;
    padding: 1em 2em;
    align-items: center;
    justify-content: space-between;
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

section div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

section div i{
    color: #868E96;
    font-size: 1.5em;
    font-weight: bold;
    background-color: #2c3237;
    padding: 2px;
    border-radius: .2em;
}

section div i:hover{
    cursor: pointer;
    background-color: #363d44;
}

.center{
    margin: 0 auto;
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

.container{
    padding: 1em 2em;
}

ul{
    background-color: #212529;
    list-style: none;
    padding: .5em;
    border-radius: .2em;
}

#techsContainer{
    border-radius: .2em;
    padding: .5em 1em;
    outline: .2px solid #868e9660;
}

li i{
    margin-left: .5em;
}

li div{
    display: flex;
    justify-content: space-between;
}

form i{
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

@media screen and (min-width: 768px) {
    #root{
        width: 50%;
        margin: 0 auto;
    }

    header{
        text-align: center;
        justify-content: space-between;
    }

    .center{
        flex-direction: row;
        justify-content: space-between;
        padding: 1em 0;
    }

}
`

export default GlobalStyle;