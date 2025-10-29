import mongoose from "mongoose";


const authSchema = new mongoose.Schema(
      
      {
            name: {
                  type: String,
                  required: true,
                  trim: true,
                  minLength: [4, "name must be at least 4 characters"],
            },

            email: {
                  type: String,
                  required: [true, "Email is required"],
                  unique: true,
                  trim: true,
                  lowercase: true,
                  minLength: [10, "Email must be at least 5 characters"],
                  match: [/\S+@\S+\.\S+/, "Email is invalid"],
            },

            password: {
                  type: String,
                  required: [true, "Password is required"],
                  minLength: [8, "Password must be at least 8 characters"],
            },

            track: {
                  type: String,
                  enum: [
                        "Data Analytics",
                        "Cloud Computing",
                        "Backend Development",
                        "Fullstack Development",
                        "Cyber Security"
                  ],
                  required: [true, "Track is required"],
            }
      },

      { timestamps: true}


)


const auth = mongoose.model("Auth", authSchema)
export default auth;
