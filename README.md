# Leapsome-testing
 
This is an example for cypress e2e and api testing on example application found here
https://github.com/leapsome-interview/tibor_pacalat

## Prerequisites

* Application mentioned above needs to run at http://localhost:3000 and api needs to be accessible at http://localhost:3022
* Freshly seeded database

## Local Setup

```
npm install
```

## How to use it

* ```npm run cypress:e2e:open``` - start e2e tests in cypress interactive runner
* ```npm run cypress:e2e:run``` - run e2e tests in headless mode
* ```cypress:api-tests:open``` - start api tests in cypress interactive runner
* ```cypress:api-tests:run``` - run api tests in headless mode
