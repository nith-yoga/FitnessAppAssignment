const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// CORS Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your React app's URL if deployed
    methods: ['GET', 'POST'],
  }));

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb+srv://new-user2:ftZK1MdoqghYC8Qx@cluster0.z7l9q.mongodb.net/fitnessApp?retryWrites=true&w=majority&appName=Cluster0',)
/* Console logging for debugging:
.then(() => {
    console.log('Connected to MongoDB Atlas');

    // Perform a basic query to test permissions
    Promise.all([
        User.find(),
        Workout.find()
    ])
    .then(([users, workouts]) => {
        console.log("User find query results:", users);
        console.log("Workout find query results:", workouts);
    })
    .catch(err => {
        console.error("Error performing find query:", err.message);
    });
})
.catch(err => console.error('MongoDB Atlas connection error:', err));
*/


// Defining the schemas and models
const User = require("./api/User");
const Workout = require("./api/Workout");

// Basic route for the homepage
app.get('/', (_, res) => {
    res.render('admin/index');
});

// Route to render user form
app.get('/admin/add-user', (_, res) => {
    res.render('admin/add-user');
})

// User form submission
app.post("/admin/add-user", async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        
        /* console.log("New User Saved:", {
            database: mongoose.connection.name,
            collection: newUser.collection.name,
            documentID: savedUser._id
        }); */
        res.redirect("/admin/add-user");
    } catch (error) {
        console.error("Error adding user: ", error);
        res.status(400).send("Error adding user: " + error.message);
    }
})

// API endpoint to GET users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Route to render workout form
app.get('/admin/add-workout', (req, res) => {
    res.render('admin/add-workout');
});

// Workout form handling
app.post('/admin/add-workout', async (req, res) => {
    try {
        const newWorkout = new Workout(req.body);
        const savedWorkout = await newWorkout.save();
        
        /* console.log("New Workout Saved:", {
            database: mongoose.connection.name,
            collection: newWorkout.collection.name,
            documentID: savedWorkout._id
        }); */ 
        res.redirect("/admin/add-workout");
    } catch (error) {
        console.error("Error adding workout: ", error);
        res.status(400).send("Error adding workout: " + error.message);
    }
})

// API endpoint to GET workouts
app.get('/api/workouts', async (_, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Starting the server and connecting to the database
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
