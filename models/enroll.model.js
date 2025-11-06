import mongoose from 'mongoose'


const attendanceSchema = new mongoose.Schema({
      date: {
            type:Date,
            required: true
      },
      status:{
            type: String,
            enum: ["present", "absent"],
            required: true
      }
},

{
      _id: false
}

)


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
            },

           attendance: {
            type: [attendanceSchema],
            default: []
           }
},

      { timestamps: true}


);


// Helps us search faster using index
enrollSchema.index({email: 1});
enrollSchema.index({"attendance.date": 1})

// combines firstName and LastName together to search faster using Fullname
enrollSchema.virtual("fullname").get(function (){
      return `${this.firstname} ${this.lastname}`
});


enrollSchema.methods.getAttendancePercentage = function (){
      // step 1: Check if student has any attendance record!
      if (this.attendance.length === 0) return 0;

      // Step 2: Count how many times they were present
      const presentCount = this.attendance.filter((record) => record.status === "present").length;

      // Step 3: Calculate the percentage
      // Formula: (present days / total days) * 100
      return ((presentCount / this.attendance.length) * 100).toFixed(2) 

}


// Method to get attendance by date range
// For example:
// You want to get attendance for November 2025
// const startDate =  new Date("2025-11-01")
// const endDate = new Date("2025-11-30")
enrollSchema.methods.getAttendanceByDateRange = function (startDate, endDate){
      return this.attendance.filter((record)=>{
            const recordDate = new Date(record.date);
            return recordDate >= startDate && recordDate <= endDate;
      });
};


enrollSchema.statics.findLowAttendanceStudents = async function (threshold = 75){
      // Step 1: Get all students from Database
      const students = await this.find({});

      // Step 2: Filter all the students with attendance below threshold
      return students.filter((student)=>{
            const percentage = student.getAttendancePercentage();
            return parseFloat(percentage) < threshold;
      })
}


const Enroll = mongoose.model("enroll", enrollSchema)
export default Enroll;