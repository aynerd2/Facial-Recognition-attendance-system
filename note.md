# Creating  the GitHub repo
# Creating Mongodb account

#  Mongodb - connected Mongodb


# INSTALLATIONS
# 1. Install express - npm install express
# 2. Install nodemon - npm install nodemon -D
# 3. Install dotenv - npm install dotenv
# 4. Install cors - npm install cors
# 5. Install cookie-parser - npm install cookie-parser
# 6. Install Mongoose - npm install mongoose
# 7. Jweb token and bcrypt - npm install jsonwebtoken bcryptjs
# 8. Install node-cron - npm install node-cron


# Project setup 
# folder structure
# Model 



# Signup Model (Name, Email, Password, Confirm Password, Tracks)



Steps: 
1. Connect to Mongodb
2. Created an Admin Model
3. .env configuration (hide sensitive informations)
4. Build a controller logic for our model





MODEL ==> CONTROLLER ===>ROUTER ===> APP.JS


1. Listen to what the customers wants
2. Prepare what they ordered
3. Respond with what they ask for


Lets see how req, res and next


1. req - Request Object
 ==> It contains what the customer(user) is sending to your app

 req.body (datas like email, password, tracks, name)
 req.params (data's that are part of your URL -- "/users/id: ")
 req.query
 req.headers

 {
      "name": "Elon Musk",
      "email": "elonmus@tesla.com",
      "password": "Elon@123_55",
      "Track": "Cloud Computing"
 } = req.body

console.log(req.body)


2. res - Response Object

res.send
res.json
res.status(200,201,301,404,400,401,500)

example - res.send("Signup sucessfull")
            res.json({
                  message: "Signup Sucessfully",
                  name: "Ayobami O"
            })


3. Next - an express function that tracks progress


4. Status Code - 
i. anything that is 1xx - information
ii. anything that is 2xx - successfull
iii. anthing that is 3xx - redirection
iv. anything that is 4xx - Client Error
v. anything that is 5xx - server error

200 - OK
example res.status(200).json({message: "Login Successful"})

201 - Created
example res.status(201).json({message: "User Created Successful"})

204 - No content

400 - Bad request
example res.status(400).json({message: "Opps something went wrong!"})

401 - Unuathorized
example res.status(404).json({message: "Unauthorized, please login"})

403 -forbiden

404 - Not found
example res.status(404).json({message: "User not found!"})

500 - Internal Server Error
example res.status(500).json({message: "Server Error"})

503 - Service Unavaliable 
example res.status(503).json({message: "Oops Service unavaliable.."})