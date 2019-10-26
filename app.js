const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

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

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// export class Recipe {
//   title: string;
//   ingredients: string;
//   instructions: string;
//   difficulty: number;
//   time: number;
//   _id: string;
// }


app.post('/api/recipes', (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time,
    _id: req.body._id
  });

  console.log(recipe)
  recipe.save().then(
    () => {
      res.status(201).json({
        message: console.log('Post saved successfully!')
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: console.log(error)
      });
    }
  );
});

app.get('/api/recipes/:id', (req, res, next) => {
  Recipe.findOne({
    _id: req.params._id
  }).then(
    (recipe) => {
      res.status(200).json(recipe);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});

app.put('/api/recipes/:id', (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time,
    _id: req.body._id
  });
  Recipe.updateOne({id: req.params._id}, recipe).then(
    () => {
      res.status(201).json({
        message: 'Recipe updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.delete('/api/recipes/:id', (req, res, next) => {
  Recipe.deleteOne({id: req.params._id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.use('/api/recipes', (req, res, next) => {
  Recipe.find().then(
    (recipes) => {
      res.status(200).json(recipes);      
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

module.exports = app;