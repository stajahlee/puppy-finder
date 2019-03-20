# Puppy Finder
_MERN-stack application providing a user friendly interface for visualization of results from machine learning data._

<img width="100px" src="https://i.imgur.com/2Fqqqrp.png" alt="puppy">

***

The Front End of this application is built with React.js. and is found in the `react-frontend` folder.

The Back End of this application is built with Node.js and is found in the `node-backend` folder.

The data is stored in a MongoDB with sample data found in the `data` folder.

***

**To run this application:**

_Docker skeleton has been set up but has not been fully implemented so the code as is will be run without Docker._

1. Be sure that you have the following installed (from npm, homebrew, or whatever package manager you prefer): 

- `npm`
- `node`
- `mongod`
- `mongoimport`
- `mongo`
- `cors`
- `express`

2. From the root folder `puppy-finder/` run in command-line the following: `mongod` unless you already have mongo running. If the MongoDB daemon process (mongod) is running already, skip this step. Keep this running in the background.

3. To load the data into the MongoDB, open another terminal window or tab and run the following command: `mongoimport --jsonArray --db puppy_finder_mongodb --collection puppies --file ../data/data.json`

4. Open another terminal window or tab and from the server folder `node-backend` run the following command: `npm i` then after node_modules are finished installing, run `node app` and leave this running as well.

4. From the client folder `react-frontend` run the following command:  `npm i` then after node_modules are finished installing, run `npm start`. This should open a browser window for you at `localhost:3000` which is where you will view the front-end of the application.

Run concurrently (mongod, backend, and frontend):
<img src='https://i.imgur.com/R7cb7u0.png'>
***

#### _Other Comments_
* **With more time I would accomplish the following:**
1. The styling library `Material-UI` uses _CSS-in-JS_ and I would research the pros and cons of this. I lean toward separating styles into stylesheets but want to spend some time understanding why this trend is being utilized by this library.
2. Because I used some starter code provided by this same UI library to take advantage of the components that create a carousel-like effect, there are console errors regarding nesting of elements and such that I would like to investigate and resolve with more time.
3. I started setting up Docker and was able to start the containers for the back-end and front-end but it seemed like I was missing a piece of the puzzle as subsequent builds after code change didn't start the back-end and I had to go into the `node-backend` folder and run `node app` again.
4. I set up a mlab.com hosted mongo database cluster and would see about hosting the database with more time.
5. The data results in the tables gather the ages of the canines based on the first canine in the array and it seems likely that this was a coincidence in the sample data. It would be better to calculate this given a potential variety of canine ages.

***

#### This is what you should see (3rd slide):

<img src='https://i.imgur.com/opcDrcf.jpg' />