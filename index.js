import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import * as dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import passport from 'passport';
import exphbs from 'express-handlebars';
import flash from 'connect-flash';
import mongoose from 'mongoose';
import methodOverride from 'method-override';

import { select, match } from './helper/helper.js';
import index from './routes/index.js'
import unit from './routes/units.js';
import system from './routes/system.js';
import pairs from './routes/pairs.js';

dotenv.config();

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cookieParser('keyboardcat'));

// Method override
app.use(
    methodOverride(function(req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            let method = req.body._method
            delete req.body._method
            return method
        }
    })
)

// passport
app.use(passport.initialize());
app.use(passport.session());

// morgan
app.use(logger('dev'));

// handlebars
app.engine('.hbs', exphbs.engine({
    helpers: {
        select,
        match
    },
    defaultLayout: 'main',
    extname: '.hbs'
}));

// app.use(express.static(path.join(_dirname, 'public')))
app.set('view engine', '.hbs');

// flash
app.use(flash());

// global varieble 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//routes
app.use('/', index)

app.use('/unit', unit);

app.use('/system', system);

app.use('/pairs', pairs)

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGO_DB_CONNECTION_STRING;

const appconnect = async () => {
  try {

    const db_conn = await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })

    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT} and DB running ${db_conn.connection.host}`));

  } catch (error) {
    console.log(error)
  }
}

appconnect();
