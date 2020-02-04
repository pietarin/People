# People

## An app made using the MERN-stack. 
<br />

Mongodb, ExpressJS and nodeJS are used to build a JSON REST api, into which data about "People" can be added. The user interface is  built with react.
<br />

## How to use:
<br />

Run the node application with `node app.js`. The api can be accessed from `http://localhost:3000/api/players/`, or whichever port you chose to run it in. Data can be added to the api by posting JSON data directly to it. A good application for that is postman. The data should contain the name of the person as a string, and a boolean value for their activity status. An example:
<br />
`{"name": "jaakko", "active": true}`
<br />
The data will be stored and displayed in the api in the following format:
<br />
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
<br />

The id is provided by mongoose and is used for HATEOAS navigation. In other words `http://localhost:3000/api/players/` contains all of the players, whereas  `http://localhost:3000/api/players/:id` contains a single player.

<br />

Normal CRUD operations can be used via applications like postman on the data.

<br />

To access the user interface, which currently is no more than a react app that renders an unordered list of players with links to `http://localhost:3000/api/players/:id`, simply run index.html. I used [CDN](https://reactjs.org/docs/cdn-links.html) to keep things simple for now.