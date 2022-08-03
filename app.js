const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const ejs = require('ejs');
const { response } = require('express');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

const app = express();

//connect DB
mongoose
  .connect(
    'mongodb+srv://rbdikmen:vvNgAfRZ5WCUUdvv@cluster.khxkz76.mongodb.net/pcat-db?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/photos/edit/:id', pageController.getEditPage);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
