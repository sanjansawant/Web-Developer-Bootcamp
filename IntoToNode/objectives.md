#into to node

what is node?==>node is a way for writing code on server side
why are we learning it?==>

    *its popular
    *Great LIbraries
    *High performance
    *Great Community
    *Javascript
    
*(it doesn't matter(long time))

*Interact with node console
*Run a file with node

#intro to npm
npm is the largest ecosystem of open source libraries in the world, npm is the package manager for javascript
*define npm
*explain why npm is awesome
*intro the packages we will be using

#installing and using packages
*use 'npm install' to install packages
*use 'require()' to include a package


#Rendering HTML and Templates
*Use res.render() to render HTML(from an EJS file)
* Explain what EJS is and why we use it
* Pass variables to EJS templates

#EJS Control flow
* show examples of control flow in EJS templates
* write if statements in an ejs file
* write loops in an ejs file
 

#styles and partials
* show how to include public assests
* properly configure our app to use ejs
* use partials to dry up our code
 

#Post Request
* Write post request and test them with postman
* Use a form to send a post request
* use body parser to get form data


#YelpCamp

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has

* Name
* Image

#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap


#Creating new CampGrounds
* Setup new campground POST route
* Add in body parser
* setup route to show form
* add basic unstyled form
 

# Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new Campground form

#INTRO to database
*what is a database

    * Collection of information/data
    * Has an interface
    
*SQL(relational) VS NOSQL(non-relational)


#Intro to MangoDB
* What is MangoDB
* Why are we using it
* Lets install it


#Our first Mango Commands
* mongod
* mongo
* help
* show dbs
* use
* insert
* find
* update  $set:
* remove .limit(1)

CRUD

#Mangoose
* What is Mangoose==> elegant mongodb object modelling for node.js 
*interact with mongodb database with javascript llar to jquery interact with dom easy than javascript
* Why are we using it
* Interaction with a Mango database using Mangoose


#Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes


#Show Page
* Review the Restful routes we've seen
* Add description to our campground model
* show db.collection.drop()
* add a show route/templates

RESTFUL ROUTES
name         url            verb        desc.
====================================================================
INDEX       /dogs           GET       Display a list of all dog
NEW         /dogs/new       GET       Displays form to make a new dog
CREATE      /dogs           POST      Add a new dog to DB
SHOW        /dogs/:id       GET       show info about one dog
Edit        /dogs/:id/edit  GET       show edit form for one dog
Update      /dogs/:id       PUT       Update a particular dog, then redirect somewhere
Destroy     /dogs/:id       DELETE    Delete a particular dog, then redirect somewheress


#RESTFUL ROUTING

##Introduction
* Define Rest and explain why it matters==>REST stands for Representational State Transfer

Rest is a pattern for defining routes. Its a way of mapping HTTP routes and CRUD together

* List all 7 Restful Routes
* Show example of Restful routing in practice


REST - a mapping between HTTP routes and CRUD


# Blog Index
* Setup a Blog App
* Create the BLOG Model
* Add Index route and templates
* Add Simple Nav Bar


# Basic Layout
* Add a Header and Footer Partials
* Include Semantic UI
* Add Simple Nav


 
# PUTTING THE C IN CRUD
* ADD new route
* ADD NEW templates
* ADD create Route
* ADD create template


#SHOWTime
* Add Show Route
* Add show template
* Add links to show page
* Style show template


#Edit/Update
* Add Edit/Route
* Add Edit Form
* Add update route
* Add update Form
* Add Method-Override


#DESTROYYYY
* Add Destroy Route
* Add Edit and Destroy Links


# Final Updates
* Sanitize blog body 
* Style Index
* Update Rest Table


#Association

##Intro to Associations
* Define associations
* Discuss one:one, one:many, and many:many relationships


User
Post 
Photos
Albums
Comments
Tags
Likes


Associations between two mongoose models

##Embedding Data
User
Post

##Referencing Data



##Module Experts
* Introduce module.exports
* Move our models into seperate files

 
# Refactor Mongoose code
* Create a models directory
* Use module.exports
* Require everything correctly

# Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts


#Add the Comment Model
* Make our errors go away
* Display Comments on campground show page

 
#  Comment New/Create
* Discuss nested routes
* add the comment new and create routes
* Add the comment form



# v5 Style show page

* Add sidebar to show page
* Diplay comments nicely


# Intro to Auth

* Sessions allow us to have state in our HTTP requests

* What tools are we using?
     * Passport
     * Passport Local
     * Passport Local Mongoose
* Walk through auth flow
* Discuss sessions
    * Express - session 


# Auth Code Along Part 1

* Set Up Folder Structure
* Install needed packages
* Add root route and template
* Add secret route and template
    

# Auth CodeAlong Part 2

* Create User Model
* Configure passport


# Auth CodeAlong Part 3

* Add register routes
* Add Register Form


# Auth CodeAlong Part 4

* Add Login Routes
* Add Login Form

# Auth CodeAlong Part 5

* Add Logout Route
* Add isLoggedIn middleware
 

# Back to yelp campground
## Add User Model
* Install all packages needed for auth
* Define User Model

# Auth Pt-2 Register
* Configure passport
* Add register routes
* Add register template

# Auth Pt. 3 - Login
* Add Login Routes
* Add Login Template
 

#Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent User from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly


##Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar correctly


##Refactor the Routes
* Use Express Router to recognize all routes


##Users + Comments
* Associate users and comments
* Save author's name to a comment automatically


##Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* save username+id to newly created campground


# Editing Campgrounds
* Add Method Override
* Add Edit Route for campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set problem

# Deleting Campgrounds
* Add destroy route
* Add delete button

# Authorization
* User can only edit his.her campgrounds
* User can only delete his/her campgrounds
* Hide/show edit and delete buttons


# Editing Comments
* Add Edit route for comments
* Add Edit button
* Add update route

# Deleting comments
* Add destroy route
* Add delete button

# Authorization part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware


#Adding in Flash
* Demo Working Version 
*  Install and configure connect-flash
*  Add bootstrap alerts to header 