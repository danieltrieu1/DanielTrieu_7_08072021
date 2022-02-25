import { useEffect } from 'react'

function Users() {

    useEffect(() => {
        fetch(`http://localhost:8080/auth/users`)
             .then((response) => response.json()
             .then(({ usersData }) => console.log(usersData))
             .catch((error) => console.log(error))
         )
     }, [])
}

export default Users

