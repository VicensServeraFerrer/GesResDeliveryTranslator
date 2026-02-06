import { Op } from 'sequelize'
import { User, Customer, Subscription } from '../models/index.js'

export async function isSubscriptionActive(userId) {
    try{
        const user = await User.findOne({where: {id: userId}})

        const customer = await Customer.findOne({where: {id: user.customerId}})

        const activeSubscription = await Subscription.findOne({
            where: {
                customerId: customer.id,
                status: 'active', 
                endsAt: { [Op.or]: [
                    { [Op.gt]: new Date() },
                    { [Op.is]: null }
                ]}
            }
        });

        if (!activeSubscription) return false

        return true
    } catch (err) {
        console.log(err)
    }
}