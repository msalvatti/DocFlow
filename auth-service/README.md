# Certificate management system - Auth Service

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Setup](#project-setup)

## Overview

The Auth service was created to manage user authentication and provide a JWT access token, where the other microservices and frontend use the token to manage each user's permissions.

## Features

- NodeJS with ExpressJS was used to develop the microservice.
- JWT token used to control user access, ensuring system security.
- Prisma ORM was used to integrate with mongodb database.
- Seeders are used to include users in the database.

## Project Setup

To get started with this project, follow these instructions:

1. Clone the repository:

git clone https://github.com/msalvatti/DocFlow.git

2. Navigate to the project directory:

cd DocFlow

cd auth-service

3. Install dependencies:

npm install

4. Configure .env file:

Use the .env.example file to create .env file, fill the variables according the variables descriptions.

5. Build application:

npm run build

6. Populate the database for Users

npm run seeder

7. Run application:

npm run start