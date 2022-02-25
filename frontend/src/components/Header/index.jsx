import { Link } from 'react-router-dom'
import Logo from '../../assets/icon-left-font-monochrome-white.png'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    display: inline-block;
    float: right;
    margin-left: 1rem;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    background-color: pink;
`
const NavStyled = styled.nav`
    color: red;
    text-decoration: none;
    font-size: 18px;
    background-color: orange;
    border: solid 3px black;
    margin: 0;
`
const LogoStyled = styled.img`
    margin-top: -4rem;
    margin-bottom: -4rem;
    height: 10rem;
    width: 10rem;
`
 
function Header() {
    return (
        <NavStyled>
            <Link to="/"><LogoStyled src={Logo} alt='Logo'/></Link>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/signup">Signup</StyledLink>
        </NavStyled>

    )
}

export default Header