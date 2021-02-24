import PerfectIndex from './../../index'
import DB from './keys'

const getInstance = () => {
    const Database = new PerfectIndex({ name: DB.database.USER })
    const User = Database.useTable({ name: "user_details", schema: {
        firstName: "string", lastName: "string", age: "number",
        isAdmin: "boolean", location: "object"
    }})
    return User
}

export default getInstance()