require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const morgan = require("morgan");
const session = require('express-session')
const passport = require('passport')



const authRouter = require("./routes/router");
const db = require("./db/db");

const app = express();
const apiPort = process.env.PORT || 8000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
    session({
        secret: "This is me Abhijeet Wankhade",
        resave: false,
        saveUninitialized: false
    })
)

app.use(
    passport.initialize()
);

app.use(
    passport.session()
);




db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(morgan('tiny'));

app.use('/', authRouter)

app.listen(apiPort, function() {
  console.log(`Server started on port ${apiPort}`);
});


/*
<% usersWithSecrets.forEach(function(user){ %>
    <p class="secret-text"><%=user.secret%></p>
    <%})%>
*/