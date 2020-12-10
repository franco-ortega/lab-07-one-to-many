# README

## Lab Instructions

https://github.com/alchemycodelab/alchemy-fsjs-december-2020/tree/main/07_one-to-many/lab

## Overview

1. Create local repo
1. Install dependendcies
1. Create README
1. Create remote repo
1. Connect remote repo to local repo
1. Create folders and files
1. Create server.js
1. Update package.json
1. Update app.js to connect with server.js
1. Add sample test to app.test.js
1. Add sample GET endpoint to app.js
1. Add tables to setup.sql:
    1. flowers table
        1. DROP TABLE...CASCADE
        1. CREATE TABLE
            1. id
            1. color
            1. fragrance
            1. petals
    2. bees table
        1. DROP TABLE....
        1. CREATE TABLE
            1. id
            1. bee_name
            1. buzz_style
            1. fuzzy_factor
            1. bee_id

1. Add class Flower to flowers.js
    1. Add constructor to Flower model
        1. id
        1. color
        1. fragrance
        1. petals
    1. Add CRUD to Flower:
        1. Create/insert/post
            1. Create test in app.test.js
            1. Create insert() in flowers.js
            1. Create POST endpoint in app.js
        1. Read/find/findById/GET
            1. Get all test in app.test.js
            1. find() in flowers.js
            1. GET endpoint in app.js
            1. Get one item test in app.test.js
            1. findById() in flowers.js
            1. POST endpoint in app.js
        1. Update/update/PUT
            1. Update test in app.test.js
            1. update() in flowers.js
            1. PUT endpoint in app.js
        1. Delete/delete/DELETE
            1. Delete test in app.test.js
            1. delete() in flowers.js
            1. DELETE endpoint in app.js

1. Add class Bee to bees.js
    1. Add constructor to Bee model
        1. id
        1. bee_name
        1. buzz_style
        1. fuzzy_factor
    1. Add CRUD to Bee:
        1. Create/insert/post
            1. Create test in app.test.js
            1. Create insert() in flowers.js
            1. Create POST endpoint in app.js
        1. Read/find/findById/GET
            1. Get all test in app.test.js
            1. find() in flowers.js
            1. GET endpoint in app.js
            1. Get one item test in app.test.js
            1. findById() in flowers.js
            1. POST endpoint in app.js
        1. Update/update/PUT
            1. Update test in app.test.js
            1. update() in flowers.js
            1. PUT endpoint in app.js
        1. Delete/delete/DELETE
            1. Delete test in app.test.js
            1. delete() in flowers.js
            1. DELETE endpoint in app.js
1. Add JOIN to Flower class for Bee class:
    1. Update findById() test in app.test.js
    1. Update findById() function in flowers.js
    1. Update GET endpoint with findById() in app.js


## Setup

1. *mkdir **lab-07-one-to-many***
1. *cd **lab-07-one-to-many***
1. *npm init @alchemycodelab/app@latest*
    1. Application Type // sql only for today
    1. Application Folder // select . to add this to existing folder
    1. Application Name // lab-06-postgres-models
1. *npm i express*
1. *npm i supertest*
1. *code .*
1. Create main branch:
    1. *git checkout -b main*
1. Create README.md
1. Create .env
    1. postgres login
1. Create remote repo on GitHub
    1. Repo name: lab-07-one-to-many
    1. Public
    1. No README, .gitignore, or license
    1. Copy repo link
1. Add remote repo to local repo:
    1. *git remote add origin https://github.com/franco-ortega/lab-07-one-to-many.git*

1. ACP:
    1. *git add -A*
    1. *git commit -m 'add initial commit'*
    1. *git push origin main*
1. Create dev branch:
    1. *git checkout -b dev*
1. Connect to pgAdmin
1. Create top level files:
    1. server.js
1. Create folders & files:
    1. **lib**
        1. app.js
        1. **models**
            1. flowers.js
            1. bees.js
    1. **sql**
        1. setup.sql
    1. **__ tests__**
        1. app.test.js
        1. or:
            1. flowers.test.js
            1. bees.test.js
