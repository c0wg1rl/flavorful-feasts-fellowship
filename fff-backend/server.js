const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB Atlas connection
const dbURI = 'mongodb+srv://<username>:<password>@<cluster-address>/mydatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error(err));

app.use(express.json());

// Define a simple schema and model for demonstration purposes
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model('User', UserSchema);

// Routes
app.get('/', (req, res) => res.send('Hello World from Express and MongoDB Atlas!'));

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
