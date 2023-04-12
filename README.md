# Passenger Transport CRM

Passenger Transport CRM is a web application for managing transportation services with different user roles (passenger, driver, manager) and CRUD functionality for user and trip management.

## Features

- User authentication using Firebase (Email & Password, Phone, and Facebook)
- Role-based access (passenger, driver, manager)
- CRUD functionality for users
- CRUD functionality for trips
- Mobile-friendly design with React-Bootstrap


---------------------
## For testing purposes
### Admin account:
 - login: testuser@gmail.com
 - password: testuser


---------------------

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.


### Prerequisites

Before you start, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (v7.0.0 or higher)

----
### Installation

1. Clone the repository:

- git clone https://github.com/GarryRocksman/passenger-transport-crm.git


2. Change the current directory:

 - cd passenger-transport-crm

3. Install the dependencies:

 - npm install


4. Create a `.env` file in the root folder of the project and add your Firebase configuration:

REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id
REACT_APP_MEASUREMENT_ID=your_measurement_id


5. Start the development server:

 - npm start

#### The app should now be running on `http://localhost:3000/`.



---------------------
## Deployment

#### To build the project for production, run the following command:

 - npm run build


This will create a `build` directory with the optimized production build. You can then deploy the contents of this directory to your preferred hosting provider.

## Built With

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Firebase](https://firebase.google.com/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [React-Router](https://reactrouter.com/)
- [React-Redux](https://react-redux.js.org/)
