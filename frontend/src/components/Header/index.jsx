import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    background-color: pink;
`
const NavStyled = styled.nav`
    padding: 15px;
    color: red;
    text-decoration: none;
    font-size: 18px;
    background-color: yellow;
    border: solid 3px black;
    margin: 0;
`
 
function Header() {
    return (
        <NavStyled>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/signup">Signup</StyledLink>
        </NavStyled>

    )
}

export default Header