import mongoose from 'mongoose'


const enrollSchema = new mongoose.Schema({
            firstname: {
                  type: String,
                  required: true,
                  trim: true,
                  minLength: [4, "First name must be at least 4 characters"],
            },

            lastname: {
                  type: String,
                  required: true,
                  trim: true,
                  minLength: [4, "Last name must be at least 4 characters"],
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
            // add phoneNumber field
            phoneNumber: {
                  type: Number,
                  required: [true, "Phone number is required"],
                  unique: true,
                  trim: true,
                  match: [/^\+?[1-9]\d{1,14}$/, "Phone number is invalid"],
            },

            gender: {
                  type: String,
                  enum: [
                        "male",
                        "female",
                  ],
                  required: [true, "Gender is required"],
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

const Enroll = mongoose.model("enroll", enrollSchema)
export default Enroll;