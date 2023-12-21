# Certificate management system - Certificate Service

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Setup](#project-setup)

## Overview

The certificate service was created to manage certificates.
Through user permissions, they have access and rights to make changes to records.
All routes have authentication using the JWT token that the Auth Service made available when logging in.

## Features

- NodeJS with ExpressJS was used to develop the microservice.
- JWT token used to control user access, ensuring system security.
- Prisma ORM was used to integrate with mongodb database.
- Multer middleware was used for file upload management.

## Project Setup

To get started with this project, follow these instructions:

1. Clone the repository:

git clone https://github.com/msalvatti/DocFlow.git

2. Navigate to the project directory:

cd DocFlow
cd certificate-service

3. Install dependencies:

npm install

4. Configure .env file:

Use the .env.example file to create .env file, fill the variables according the variables descriptions.

5. Build application:

npm run build

6. Run application:

npm run start