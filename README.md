# 14 Model-View-Controller (MVC): Tech Blog


## Description

This application is a Tech Blog.  It creates an environment for users to share tips and information about technology they are passionate about discussing.  Through building this project, I learned to use the Model-View-Controller (MVC) structure to build a full-stack application.  I practiced creating sequelize models for storing data, and creating backend routes for completing the CRUD operations necessary for the application to function.  I practiced using frontend javascript to make HTTP requests to the routes I built when the user interacted with elements of the site, and I learned how to dynamically display the results of the interaction back to the user through the Views files, and to use Handlebars as a templating engine to render (and update) pages to the user.  I also learned to use the Controller files to connect the site's Views to the Model and backend of the application.  This project also helped me gain more understanding of the process of authenticating users for login, and forcing authentication to access or alter certain information on the site.  It was also vital in teaching me how to interact with session storage for authentication and keeping track of a user's being signed in.  Additionally, this project was good practice in creating environment variables to protect sensitive information, and in deploying the finished site to Heroku.
## Installation

This application is deployed on Heroku, but if you'd like to clone the gitHub repository yourself and run the application locally, below are instructions for doing so:
First, run "npm install" to install the project's dependencies through Node.
You will need to set up a .env file with your database's information and login, as well as your own session secret.
Then, from the terminal in the db folder, run "mysql -u root -p" and enter your password.
Next, run "source schema.sql" to set up our database, and then run "source seeds.sql" to seed data into the database.
After that, you can move back into the project's main folder and run "node server.js" in the terminal to start the application.  You'll be able to access the site at localhost:3001

## Usage

This application is deployed at https://radiant-everglades-93421.herokuapp.com/ 

## Credits

This application used the MYSQL2 package, sequelize, bcrypt, dotenv, express, express-handlebars, and express-session.  I also used DBeaver to view my database as it developed.

## License

See LICENSE.TXT file in repository.

---


