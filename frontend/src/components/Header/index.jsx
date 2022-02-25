import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    background-color: pink;
`
function Header() {
    return (
        <nav>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/signup">Signup</StyledLink>
        </nav>
    )
}

export default Header