import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000

export const checkSubscription = async () => {
  const { userId } = auth()

  if(!userId) return false

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true
    }
  })

  if(!userSubscription) return false

  // console.log(userSubscription.stripeCurrentPeriodEnd)
  // console.log(userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now())
  // console.log(Date.now())

  const isValid = 
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid
}
