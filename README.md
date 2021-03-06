# CPSC-455-Project

A11yMaps is an accessibility first web application that provides navigation services for users with diverse mobility needs. Using the Google Maps and Elevation APIs, we developed a proof of concept tool to assess and rank the difficulty of potential routes for a journey based on a user’s elevation profile preferences. Through this app, we sought to create an accessible navigation app with a user-friendly and Inclusive Design oriented approach.

**Appname**

**A11yMaps**

# Project Description

**Who is it for?**

Individuals with impaired mobility/those constrained to utilising a wheelchair

**What will it do? (What "human activity" will it support?) **

Will support better routing data to individuals with mobility impairments, giving them better/more information for choosing routes

**What type of data will it store?**

Favourite routes/locations

User profiles

**What will users be able to do with this data?**

With pre-saved locations individuals will more rapidly be able to input start points and destinations, as well as quickly pull up past routes that they may use frequently

**What is some additional functionality you can add/remove based on time constraints? **

# Project Task Requirements

● Project task requirements:

**3-5 minimal requirements (will definitely complete)**

- User account setup

- Basic, intuitive UI

- Enter source/destination locations

- Store/save locations/routes

- Retrieve routes from a maps API (Google or OpenStreetMaps)

- Rank them by “difficulty”

**3-7 "standard" requirements (will most likely complete)**

- Give user an elevation/distance profile to view

- A method for allowing users to compare routes at a glance

- ~~ability to update path in database should map change~~

- [x] implement email verification recover password

- add per-request authentication via cookie

- ability to compare between routes side by side

**2-3 stretch requirements (plan to complete at least 1!)**

- ~~See about implementing a routing algorithm~~

- ~~Users can report construction/obstacles along route, and the app can incorporate this information~~

- ~~Turn by turn navigation~~

- ~~ability to simulate the route~~

- allow maps to display alternative routes by clicking cards

- Give users the option to rate things to prioritise for them (slope, elevation, distance) - save preferences to profile?

- Add “use my location”, both as a start/end point, but also when initialising the map view

- Pick 2 of your minimal requirements and break each of them down into ~2-5 smaller tasks!

# Task Breakdown

**User setup**

- Sign up with username and password

- Log in based on the above following signup

- Store credentials in database

**User Input/Output UI**

- Have search boxes for start/destination locations

- Smart fill?

- Embed google maps into page

- Display selected locations on map interface

- Display route to user once calculated

- Store calculated route in database

Finally, draw 2-3 rough sketch prototypes of some key tasks of your app. Sketch these physically on paper and then scan and add to your repo.

How to hand in: Put all of the writing (Project Description, Project Task requirements, task breakdown), as well as your prototypes into the README of your project repo. Send the repo link to your lab TAs in a slack channel along with your group members. ALSO, for each team member, go on slack and edit your profile. In the “What I do” space, put your team name!
