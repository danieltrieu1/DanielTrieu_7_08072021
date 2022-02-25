import styled from 'styled-components'

const FooterStyled = styled.h2`
    padding: 15px;
    color: red;
    text-decoration: none;
    font-size: 18px;
    background-color: green;
    border: solid 3px black;
    padding: 3rem;
    margin: 0;
`
 
function Footer() {
    return (
        <FooterStyled>Footer</FooterStyled>
    )
}

export default Footer