# Certificate management system

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Setup](#project-setup)

## Overview

Welcome to Certificate Management System! The robust web application, built using NodeJS, ReactJS, Prisma, Mongodb and incorporating modern technologies, is designed to streamline the issuance and tracking of various certificates. Let's dive into the key features and qualities that make our system stand out.

## Features

Authentication and User Roles:

- Secure login functionality with distinct user profiles: Client, Operator, and Administrator.
- User-friendly interface ensuring a smooth and intuitive experience for all users.
- Client User Functionality.
- Request Certificate Issuance.
- User-friendly form with mandatory fields for capturing essential information.
- Support for three types of certificates: Marriage, Birth, and Property.
- Seamless attachment of supporting documents.

## Client User Functionality:
- Track the progress of each of your requests (Pending, Issued or Denied).
- Conveniently manage and delete pending requests.

## Operator User Functionality:
- View All Requests:
- Access and review all certificate requests from CLIENT users.
- Ability to update request statuses and delete non-issued certificates.

## Administrator User Functionality:
- Full access to all features and functionalities.
- Authority to perform any action, including deleting requests with an "Issued" status.

## Technologies and Resources:

- Microservices Architecture was used for modular and scalable architecture for future expansion and maintenance.
- Backend developed in NodeJS using Express and Typescript. Prisma ORM is used with mongodb database.
- Frontend developed in React 18, Material Dashboard is used with theme and Typescript.
- Docker was used to create the mongodb database to facilitate local deployment.
- Common library was used to reuse codes between microservices.

## Project Setup

To get started with this project, follow these instructions:

1. Clone the repository:

git clone https://github.com/msalvatti/DocFlow.git

2. Navigate to the project directory:

cd DocFlow

3. Create the docker image for database - (Make sure you have the docker app installed and started)

npm run docker:create

4. Start the docker image of database - (Make sure you have the docker app installed and started)

npm run docker:start

5. Use the postman collection

In the postman folder, the collection and environment was made available to test all endpoints through postman, just import the collection file and import the environment file into your postman to use it.

To start this project, follow the instructions in the README files found in the respective project folders.