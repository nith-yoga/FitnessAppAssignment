const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://new-user2:ftZK1MdoqghYC8Qx@cluster0.z7l9q.mongodb.net/fitnessApp?retryWrites=true&w=majority&appName=Cluster0',)

app.use(express.json());

app.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;