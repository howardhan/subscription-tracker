import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { serve } = require('@upstash/workflow/express')
import Subscription from '../models/subscription.model.js'
import dayjs from 'dayjs'
import { sendReminderEmail } from '../utils/send-email.js'

const RMINDERS = [7, 5, 2, 1]

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload
  const subscription = await fetchSubscription(context, subscriptionId)
  if (!subscription || subscription.status !== 'active') return
  const renewalDate = dayjs(subscription.renewalDate)
  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`
    )
    return
  }

  for (const daysBefore of RMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day')
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      )
    }
    if (dayjs().isSame(reminderDate, 'day')) {
      await triggerReminder(
        //TODO 2025/9/25 02：59：25
        context,
        `${daysBefore} days before reminder`,
        subscription
      )
    }
  }
})

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', async () => {
    return await Subscription.findById(subscriptionId).populate(
      'user',
      'name email'
    )
  })
}

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`)
  await context.sleepUntil(label, date.toDate())
}
const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`)
    //   send email SMS push notification...
    await sendReminderEmail({
      to: '2225813275@qq.com', //subscription.user.name,
      type: label, // TODO 2:54:05
      subscription,
    })
  })
}
