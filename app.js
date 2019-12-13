const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

mongoose.connect('mongodb+srv://Young-Einstein:obasanjoh@cluster0-cdo8v.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true })
	.then(() => {
		console.log('successfully connected to MongoDB Atlas');
	})
	.catch((error) => {
		console.log('Unable to connect');
		console.error(error);
	});

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
})

app.use(bodyParser.json());

app.use('/api/recipes', recipeRoutes);


module.exports = app;