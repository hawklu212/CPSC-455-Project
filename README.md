# A11yMaps

A11yMaps (Accessibility Maps) is an accessibility focused web application that provides walking navigation services for users with diverse mobility needs. Using the Google Maps and Elevation APIs, we developed a proof of concept tool to assess and rank the difficulty of potential routes for a journey based on a user’s specified elevation profile preferences. Through this app, we sought to provide a more inclusive navigation experience that allows users to tailor their journeys by finding the most suitable route to get to their destination.

## Project Description & Goals

--------------------------------------------------------------------------------------------------

The main goals of this project were to design a tool to allow individuals who may not be able to travel routes with steeper inclines to plan their journeys, as well as utilize the tool to conveniently store these ranked routes for easy referencing.

With this main goal in mind, our task requirements were the following:

### Minimal requirements

- :white_check_mark: **User Account Setup** - allow users to create accounts to persist their data, and allow login and logout functionality.

- :white_check_mark: **Create Elevation Preference Profile** - allow users to specify elevation criteria preferences that can be tied to their profile, and used in route ranking calculations.

- :white_check_mark: **Query For Routes** - provide users with an intuitive UI to get route results for a journey by inputting an origin and destination location

- :white_check_mark: **Retrieve Route & Elevation Data from Google Maps API** - retrieve route data from the Google Maps Directions API using the locations provided by the user, and tie this with Elevation Data from the Google Elevation API.

- :white_check_mark: **Rank Routes by “Difficulty”** - rank and re-order routes by how difficult they are in terms of how steep the elevation/incline is.

### Standard Requirements

- :white_check_mark: **Incorporate User Preferences into Route Calculations** -  use the user profile settings for weight, max incline, and preference for distance or incline to calculate a total score for each route. This would require figuring out how to adapt calculations from https://doi.org/10.1179/000870406X93517.

- :white_check_mark: **Display Elevation/Distance Profile of Each Route** - provide a detailed display of information about each route, including elevation, distance, rating, etc. to allow users to gauge which routes they may prefer.

- :white_check_mark: **Saved Locations/Routes** - allow users to label and save routes so that they can easily pull up past searched routes for reference.

- :white_check_mark: **Email Verification For Recovering Password** - allow users to recover a forgotten password via email verification. This requires figuring out how to use `nodemailer`.

### Stretch Requirements

- :white_check_mark: **Add Per-Request Authentication via Cookies** - add authentication using cookies for every request to secure our application. This would require figuring out how to use the `js-cookie` 3rd party library to safely transmit session ids.

- :white_check_mark: **Allow Users to Visually Compare Routes** - allow users to switch the map display depending on which route they want to view. This would require a lot of coordination on the React-Redux state, in addition to properly liasing with the payloads from the backend.

- :x: **Store Saved Routes Locally (To Improve Latency) and Update Route As Necessary** - This would require figuring out a representation for the routes to be saved in the database, and implementing watchers for changes.
  
- :x: **Implementing a Custom Routing Algorithm** - implement a custom routing algorithm. Doing this would allow us to sample elevation from points and come up with our own routes independent of Google's results.

- :x: **Allow Users to Self-Report Obstructions Along Route and Accomodate Paths or Recommendations Accordingly** - this requires the previous stretch goals to be accomplished.

- :x: **Turn by Turn Navigation** - this would provide users with detailed instructions for turn by turn navigation.

- :x: **Ability to Simulate the Route** - this would allow users to view the route, like in Google Maps Street Views.

- :x: **Add “Use My Location" as an Origin/Destination and for Map Initialization** - this would be a quality of life improvement.

## Tech

--------------------------------------------------------------------------------------------------

- **Unit 1 - HTML, CSS, JS** - These 3 technologies were heavily utilized indirectly throughout the project, through the realization of all the other technologies. For the UI, manipulation and interfacing with HTML was used through the virtual DOM of React to quickly create components, while CSS was utilized to add custom styling to components. And Javascript was the primary development language utilized to write both frontend (React+Redux) and backend (Node+MongoDB) code.
- **Unit 2 - React/Redux** - The user interface was designed with the React Framework and leveraging the MaterialUI component library to quickly build the structure of our application using standardized components. Redux was also incorporated to allow us to easily manage state across the various components we created as our frontend grew in complexity.
- **Unit 3 - Node/Express** - The Node.js framework was used to write the backend code, allowing us program queries to the Google Maps API services, and to code the processing of this route data. 
- 
-  was used to convey cookies, query information, and processed data between the front and back-ends.
- **Node.js** - the backend was coded in Node.js and was responsible for all calculations as well as queries to the Google Maps services such as directions and elevation.
- **MongoDB** - UserPreferences, access tokens, validation status, and saved routes were stored in a MongoDB server, with the information being associated with the user's email address.
- **Heroku** - deployment was handled by Heroku, with two separate apps being set up track the front and back-ends, respectively, with automated deployments.


## Above and Beyond Functionality

------------------------------------------------------------------------------------------------

Cookies?

## Next Steps

------------------------------------------------------------------------------------------------

In the future our goals are to continue improving the usability and accuracy of our application, this would be done in three main area: by making the application more accessible through the full integration of ARIA standards such as tagging all components with aria-tags, or the utilization of React-Aria library; by incorporating road surface and curb/step information we will be able to more accurately model the score for a given route, as well as steer users clear of those obstacles; and finally to allow self-reporting of obstacles or impediments on routes which would be incorporated into the route rating, this would require storing the entire path object to a database which would also have to be implemented. Finally, due to the nature of the application and the likelihood of being used on the go we would furthermore like to support a mobile-friendly experience.

# Task Breakdown
## Justin ##
-  
## Fraser ##
- research, backend calculations, initial maps setup
- challenge: managing passing of data between the front and back ends - overcome through 
## Hawk ##
- 

## Prototype Sketches

### Wireframe Sketches

#### Login Page
![Login Page](Prototype_Sketches/Login_Page.png)

#### Input Page
![Input Page](Prototype_Sketches/Input_Page.png)

#### Output Page
![Output Page](Prototype_Sketches/Output_Page.png)
#### Request-Response Flow with Google Maps API

![Sample Request Response Flow](Prototype_GMA_Request_Response_Flow.png)
