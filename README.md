# [MyWorldMap](https://myworldmap.netlify.app/)

A map-based personal memo App with Node + Express + Mongo + React (hooks).  
**Deployed site**: https://myworldmap.netlify.app/

## Author

- [Shushu Chen](https://vanishima.github.io/index.html)

## Link to class

Class: [CS 5610 Web Development Northeastern University Bay Area](https://johnguerra.co/classes/webDevelopment_fall_2021/)  
Instructor: [John Alexis Guerra Gómez](https://johnguerra.co/)

## Screenshot

![MyWorldMap demo](https://github.com/vanishima/MyWorldMap/blob/main/demo/interactive-map.gif?raw=true)
![MyWorldMap demo](https://github.com/vanishima/MyWorldMap/blob/main/demo/register.png?raw=true)
![MyWorldMap demo](https://github.com/vanishima/MyWorldMap/blob/main/demo/login-2.png?raw=true)

## Tech requirements

- Basics: HTML5, CSS, Bootstrap, JavaScript, Node.js. Express, nodemon
- Database: MongoDB
- Authentication: bcryptjs, jsonwebtoken
- Map-related: use-places-autocomplete, @reach/combobox, @react-google-maps/api
- React

## How to install/use

- `git clone [repo link]`
- `yarn start`

## Video demo

https://youtu.be/VEIjh7Rc74I

## Slides

[MyWorldMap - Demo Slides](https://docs.google.com/presentation/d/1-geLwJzYKJlspD50PFWPP8-ywgT82o4Yulhyj5pynX8/edit?usp=sharing)

# Code Review from Zhenghao Lin
Hello, Shushu!
Nice application! I like your idea of applying Google Map and embeding it in the website.
I need to report a small defect that when switching from differnt tags causes tags duplicated.
Your code looks well-documented. If I must give a suggestion, I suggest you make a shared base module for postDB.js and userDB.js.
For example if I click the tag button "All", then click "Eat", then click "All", in this case "Eat" tag will be duplicated on the screen.
