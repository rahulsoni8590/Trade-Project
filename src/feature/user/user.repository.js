import userModel from "./user.schema.js";

export default class UserRepo {

    async findUser(email) {
        try {
            const user = await userModel.findOne({ email })
            return user
        } catch (err) {
            console.log(err)
        }
    }

    async addUser(username, password, email) {
        try {
            const data = new userModel({ username, password, email });
            const newUser = await data.save()
            console.log(newUser)
            return newUser
        } catch (err) {
            console.log(err)
        }
    }
}


