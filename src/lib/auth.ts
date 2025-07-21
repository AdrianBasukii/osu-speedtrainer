import NextAuth from "next-auth"
import User from "@/models/User"
import Google from "next-auth/providers/google"
import connectDB from "./db"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks:{
    async session({session}){
      await connectDB()
      const email = session.user.email
      const existingUser = await User.findOne({email})

      if(!existingUser){
        const user = await User.create({
          name: session.user.name,
          email: session.user.email,
          password: "-",
        })

        
      }
      else{
        console.log("USER EXIST")
      }
    
      return session
    }
  }
})