import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const DashboardStyled = styled.div`
    color: white;
    background-color: red;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 200px;
`
const DashButton = styled.button`
    font-weight: bold;
    color: white;
    border: none;
    padding: 1rem;
    background: red;
    border-radius: 1rem;
`



function Dashboard() {
    const [isOpen, setIsOpen] = useState(false)
    return isOpen ? (
        <DashboardStyled>
            <button onClick={() => setIsOpen(false)}>X</button>
            <Link to="/profile">Editer votre Profil</Link>
            <Link to="/disconnected">Deconnexion</Link>
        </DashboardStyled>

    ): (
        <DashButton onClick={() => setIsOpen(true)}>Dashboard</DashButton>
    )

}

export default Dashboard
