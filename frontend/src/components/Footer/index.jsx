import styled from 'styled-components'

const FooterStyled = styled.div`
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
        <FooterStyled>
            <h2>Footer</h2>
        </FooterStyled>
    )
}

export default Footer