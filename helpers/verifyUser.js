import { User } from '../models/index.js'

export async function isAppUser(userId) {
    try{
        const user = await User.findOne({where: {id: userId}})

        if (!user) return false

        return true
    } catch (err) {
        console.log(err)
    }
}