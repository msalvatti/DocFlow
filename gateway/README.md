# Certificate management system - Gateway Service

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Setup](#project-setup)

## Overview

The Gateway service was created to manage requests coming from the Frontend and distribute them among the responsible microservices.
Upon receiving an authentication request, the Gateway service directs to the Auth service that if the user authenticates successfully, they will receive a JWT token which the gateway forwards to the Frontend to send in all their requests.
Receiving other requests such as registration of request certificates, the Gateway service forwards it to the Certificate service that will process the request, returning it to the Gateway that communicates with the Frontend.

## Features

- NodeJS with ExpressJS was used to develop the microservice.
- JWT token used to control user access, ensuring system security.
- Multer middleware was used for file upload management. At the Gateway, Multer middleware only manages the sent file and redirects it to the Certificate service, which will store it.

## Project Setup

To get started with this project, follow these instructions:

1. Clone the repository:

git clone https://github.com/msalvatti/DocFlow.git

2. Navigate to the project directory:

cd DocFlow

cd gateway

3. Install dependencies:

npm install

4. Build application:

npm run build

6. Run application:

npm run start