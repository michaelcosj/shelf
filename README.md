# [shelf](https://shelfwebapp.herokuapp.com/)

A simple library management web application for any personal libraries.

# Features

- Responsive UI that looks good across devices
- Google oauth 2.0 authentication
- Create/edit/delete shelves and books in shelves
- Borrow and return books

# Getting Started

- Clone this repo
  `git clone https://github.com/michaelcosj/shelf.git`

- Install nodejs
  [https://nodejs.org/download/release/](https://nodejs.org/download/release/)

- Install mongodb
  [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)

- Setup environment:
```
  Run `npm install` to install all dependencies
```

- Rename config.env.example to config.env and fill in the information

> PORT = 3000 </br>
> MONGO_URI = //mongodb server uri </br>
> SESSION_SECRET = //express-session secret </br>
> GOOGLE_CLIENT_ID = //google oauth client id </br>
> GOOGLE_CLIENT_SECRET = //google oauth client secret </br>
> CALLBACK_URL = //google oauth callback url </br>
