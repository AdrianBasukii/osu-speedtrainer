import NextAuth, { type DefaultSession } from "next-auth"
import User from "@/models/User"
import Records from "@/models/Records"
import Google from "next-auth/providers/google"
import connectDB from "./db"
import { ObjectId } from "mongoose"

interface Session {
  user: {
    id: ObjectId
  } & DefaultSession["user"]
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks:{
    async session({session}){
      await connectDB()
      const email = session.user.email
      let existingUser = await User.findOne({email})

      if(!existingUser){
        await User.create({
          name: session.user.name,
          email: session.user.email,
          password: "-",
        })

        existingUser = await User.findOne({email: session.user.email})

        await Records.create({userID: existingUser._id})
      }
    
      return {
        ...session,
        user: {
          ...session.user,
          name: existingUser.name,
          id: existingUser._id
        }
      }
    }
  }
})