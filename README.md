# Diet Day App Documentation

## Introduction

The Diet Day App is a web application that helps users track their daily food intake and monitor their progress towards their weight loss goals. With the Diet Day App, users can easily log their meals and snacks, and share their diet day to the public.

## Features

- User-friendly interface for logging meals and snacks
- Built-in calorie calcuator
- Public diet days and user profiles

## Installation

To install the Diet Day App, follow these steps:

1. Download the React app which is in the this github link.
2. Download the softuni practice server.
3. Launch the app and create an account.
4. Open a terminal in the diet-day folder and run the command: "npm i && npm start" (you have to have installed node.js localy on your device)
5. Open a terminal in the server folder directory and run the command: "node server.js".
6. Register or login if you already have an accaunt.
7. Calculate your daily calories intake in the calorie calculator.
8. Start logging your meals and snacks and tracking your progress towards your goals!

## Code Structure

The Diet Day App is built using React and follows a standard file structure for a web application. The main components of the app include:

- App.js: The root component of the app that handles navigation and state management.
- components/: A directory containing all the reusable UI components used throughout the app.
- services/: A directory containing 3 services for http requests to an external server (softuni practice server) and a requester which is a function that helps the services for easier requests and clener code.
- contexts/: A directory containing auth context which helps the authentication in the app.
- hooks/: A directory containing a hook that prevents the app from reloading.


## Dependencies

The Diet Day App relies on 2 external libraries and dependencies to function properly. These include:

- React 
- React Router v6

## Contact

If you have any questions or feedback about the Diet Day App, please feel free to contact us at pepsitodege@gmmail.com.
