# MyPov
# a blog api built using  mongodb, express and nodejs

MyPov is a blog API.
MyPov is a user-friendly API built with MongoDB, Express, and Node.js. It's designed to streamline the process of building blogs by handling the complex server-side log

Key features of mypov

Simplified Development: MyPov provides a set of intuitive endpoints that allow you to easily perform CRUD (Create, Read, Update, Delete) operations on your blog's data.

Efficient Data Storage: Leveraging MongoDB's powerful NoSQL capabilities, MyPov ensures reliable and scalable storage of your blog's content.

Enhanced Performance: Built on the efficient Node.js platform, MyPov delivers high-performance and responsive blogging experiences.
Achievements of mypov
By abstracting away the underlying complexities, MyPov empowers developers to focus on crafting engaging content and building unique blogging experiences

MongoDb: MongoDB is a NOSQL relational database management system, it was used in this application to store data.
As of now the API has three data models, the post, user and comment models this models are all stored as collections on mongodb, so when a user sends a request the database is queried for the appropriate response.

Express: express is a nodejs framework for building robust APIs, it helps simplify the process.
Nodejs: nodejs is a runtime environment that allows the JavaScript code to be executed on the server, it basically runs the application 

THIRD PARTY SERVICES
Mutler: for uploading image files.
Bcryt: for hashing passwords.
Jwt: for authentication and authorisation 

# Getting started
1: clone this repo

2: change directory to {server}

3: on the terminal run 
    npm install ; to install all dependencies

4: create a database on the mondodb atlas

5: copy the connection string from atlas

6: create a .env file in the server directory

7: in the .env file
    store the connection string from atlas in a variable MONGO_URI
    
    MONGO_URI={atlas connection string}
    
    PORT={desiredport}
    
    TOKEN_KEY={key generated using any key generation service or any random string(not encouraged)}

8: on the terminal run npm run dev
    a server starts running on your desired port

post object
{

}
comment object
{

}
user object
{

}


# routes/endpoints
get post by id

GET '/mypov/api/v1/posts/:id'
        
        returns  a post object

get all posts

GET '/mypov/api/v1/posts'
    
        returns a list of posts or an empty array if no post. 

create a new post -> this requires for the user/client to be authenticathed

POST '/mypov/api/v1/posts'

        request body object should contain the following entries
        
            1: title a string which is goimg to be the blogs title
            
            2: text -> a string which represents the blogs body

            3: req.file -> image => optonal
        image can be uploaded as a file in the request.
    
    returns the new post object


update an existing post (requires authorization, only the user who made a post can update it)

PATCH '/mypov//api/v1/posts/:id'
    
    returns the updated object

delete a post by id (requires authorization, only the user who made a post can delete it)

DELETE '/mypov/api/v1/posts/:id'

    returns the deleted object


signup a new user

POST '/mypov/api/v1/signup'
    
    returns the new user onbject

    request body object should contain the following entries
    
    1: username-> a string
    
    2: name-> string
    
    3: password-> string
    
    4: email-> string
    
    5: bio-> string optional
    
    req.file, optional


update a users data, requires authentication

PATCH '/mypov/api/v1/update'

    the request can contain any of the following parameters
    
    1: username
    
    2: name
    
    3:bio
    
    req.file
    
    returns the updated user object


login a new user

POST '/mypov/api/v1/login' 

    request body object should contain the following entries
    
    1: username
    
    2: password
    
    returns two entries in the response json
    
        1: message->registration successful
        
        2: token-> the jwt token generated
    
    a cookie named token is also set 


log out from a session

GET '/mypov/api/v1/logout'

    sets the token cookie to null a returns a successful message


get all comments on a post (where id is the id of the post)

GET '/mypov/api/v1/posts/:id/comments'

    returns a list of comments


get a a particular comment by id

GET '/mypov/api/v1/posts/comments/:id' (where id is the id of the comment)

    returns a comment object


comment on a post, requires authorization

POST '/mypov/api/v1/posts/:id/comments'

    request body
    
    1: body
    
    returns the new comment


delete a comment,  requires authorization

DELETE '/mypov/api/v1/posts/comments/:id'

    returns the deleted comment


update a comment, requires authorization

PATCH '/mypov/api/v1/posts/comments/:id'

    returns the updated comment


like a post requires authentication (where id is the id of the post)

POST '/mypov/api/v1/posts/:id/like'

    returns the liked post object
