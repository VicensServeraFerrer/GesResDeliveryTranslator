import { Op } from 'sequelize'
import { User, Customer, Subscription } from '../models/index.js'

export function isSubscriptionActive(userId) {
    try{
        const user = User.findOne({where: {id: userId}})

        const customer = Customer.findOne({where: {id: user.customerId}})

        const activeSubscription = Subscription.findOne({where: {customerId: customer.id, status: 'active', expiresAt: { [Op.lt]: new Date() }}})

        if (!activeSubscription) return false

        return true
    } catch (err) {
        console.log(err)
    }
}