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


# routes/endpoints
get post by id
GET '/mypov/api/v1/posts/:id' returns a list of posts or an empty array if no post.

get all posts
GET '/mypov/api/v1/posts' returns  a post object 

create a new post -> this requires for the user/client to be authenticathed
POST '/mypov/api/v1/posts'  returns the new post object

update an existing post (requires authorization, only the user who made a post can update it)
PATCH '/mypov//api/v1/posts/:id' returns the updated object

delete a post by id (requires authorization, only the user who made a post can delete it)
DELETE '/mypov/api/v1/posts/:id' returns the deleted object

signup a new user
POST '/mypov/api/v1/signup' returns the new user

login a new user
POST '/mypov/api/v1/login' 

log out from a session
GET '/mypov/api/v1/logout'

get all comments on a post (where id is the id of the post)
GET '/mypov/api/v1/posts/:id/comments' returns a list of comments

get a a particular comment by id
GET '/mypov/api/v1/posts/comments/:id' (where id is the id of the comment)
returns a comment object

comment on a post, requires authorization
POST '/mypov/api/v1/posts/:id/comments' returns the new comment

delete a comment,  requires authorization
DELETE '/mypov/api/v1/posts/comments/:id' returns the deleted comment

update a comment, requires authorization
PATCH '/mypov/api/v1/posts/comments/:id' returns the updated comment

like a post requires authorization, requires authorization (where id is the id of the post)
POST '/mypov/api/v1/posts/:id/like'