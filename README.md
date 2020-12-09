# README

## Lab Instructions

https://github.com/alchemycodelab/alchemy-fsjs-december-2020/tree/main/07_one-to-many/lab

## Overview

1. Create local repo
1. Install dependendcies
1. Create README
1. Create remote repo
1. Connect remote repo to local repo
1. Create top level files:
    1. server.js
1. Create folders & files:
    1. **lib**
        1. app.js
    1. **sql**
        1. setup.sql
    1. **__ tests__**
        1. app.test.js
        1. or:
            1. flower.test.js
            1. bees.test.js

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
1. *git checkout -b main* (creates main branch)
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

