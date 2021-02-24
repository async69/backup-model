import User from '../model/User'

const getUsers = async ()  => {
    const users = await User.find({})
    return users
}

const addUser = async (user = { firstName: "", lastName: "" }) => {
    if (user.firstName === "" || user.lastName === "") {
        console.error("Incorrent user format")
        return null
    }

    await User.insertOne(user)
}

export {
    getUsers, addUser
}