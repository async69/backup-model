import React from 'react'
import './style/style.css'
import './style/bootstrap.min.css'
import { getUsers, addUser } from './functions/controls'

const Users = ({ users }) => {
    return (
        <div className="users">
            <div className="headers">
                <div className="container-id">ID</div>
                <div className="container-first-name">First Name</div>
                <div className="container-last-name">Last Name</div>
            </div>
            <hr className="long-line" />
            {users.map((item, index) => (
                <div className="user-row" key={index}>
                    <div className="user">
                        <div className="container-id">{item['_id'] + 1}</div>
                        <div className="container-first-name">{item.firstName}</div>
                        <div className="container-last-name">{item.lastName}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const Test = () => {
    const [users, setUsers] = React.useState([])

    const [user, setUser] = React.useState({
        firstName: "", lastName: "", age: 21,
        isAdmin: false, location: { lat: 8.912, lng: 38.273 }
    })

    const updateUsers = async () => {
        const users = await getUsers()
        setUsers(users)
    }

    React.useEffect(() => {
        updateUsers()
    }, [])

    const addPerson = async () => {
        await addUser(user)
        setUser({ firstName: "", lastName: "" })
        updateUsers()
    }

    const handleChange = event => setUser({ ...user, [event.target.name]: event.target.value })

    return (
        <div className="container">
            <Users users={users} />
            <form>
                <h4>Add User</h4>
                <label className="input-field">
                    First Name: <input name="firstName" onChange={handleChange} value={user.firstName} />
                </label>
                <label className="input-field">
                    Last Name: <input name="lastName" onChange={handleChange} value={user.lastName} />
                </label>
                <button type="button" onClick={addPerson}>Add User</button>
            </form>
        </div>
    )
}

export default Test