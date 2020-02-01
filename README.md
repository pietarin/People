## People

# An app made using the MERN-stack. 
<br />

Mongodb, ExpressJS and nodeJS are used to build a JSON REST api, into which data about "People" can be added. The user interface is  built with react.
<br />

# How to use:
<br />

Run the node application with `node app.js`. The api can be accessed from `http://localhost:3000/api/players/`, or whichever port you chose to run it in. Data can be added to the api by posting JSON data directly to it. A good application for that is postman. The data should contain the name of the person as a string, and a boolean value for their activity status. An example:

`{"name": "jaakko", "active": true}`

The data will be stored and displayed in the api in the following format:
`{
    "_id": "5e35bfb5673e192a782dd2d5",
    "name": "jaakko",
    "active": true,
    "__v": 0,
    "links": [
        {
            "self": "http://localhost:3000/api/players/5e35bfb5673e192a782dd2d5"
        }
    ],
    "id": "5e35bfb5673e192a782dd2d5"
}`

The id is provided by mongoose and is used for HATEOAS navigation.