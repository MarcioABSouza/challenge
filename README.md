#Challenger!

Hi! My name is Marcio, as you can see here on Github, and this is a simple project with NodeJs.

This basic project was created to exemplify how i have been evolving during the last few months.

The code consists in an pretty simple API that allows a "manager" to save users information and cities.

Ok, but how can you run this code? 
### Running the code local machine

1. First you should install the dependencies with `npm install`
2. Run the docker-compose up with `docker-compose -f "docker-compose.yml" up -d --build` to up mongodb database
3. Run the application in development mode with `npm run dev`
4. Access `https://localhost:3000` and you're ready to go!

## Scripts

The Api provides a collection of npm scripts that can help you. You can run them with `npm run <script name>`:

- `dev`: Run the application in development mode
- `start` Run the application in production mode (prefer not to do that in development)
- `lint`: Lint the codebase

## Tech

The most important tecnologies used on this project can be found at: 

- [Node v10.13+](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [Awilix](https://www.npmjs.com/package/awilix)
- [Joi](https://www.npmjs.com/package/joi)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [ESLint](https://www.npmjs.com/package/eslint)
