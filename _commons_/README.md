# Certificate management system - Common Library

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Setup](#project-setup)

## Overview

The common library was developed to reuse code between microservices, facilitating system maintenance with its shared libraries.

## Features

- Prisma ORM schema with its settings.
- Models for Users and Certificates.

## Project Setup

To get started with this project, follow these instructions:

1. Clone the repository:

git clone https://github.com/msalvatti/DocFlow.git

2. Navigate to the project directory:

cd DocFlow

cd _commons_

3. Install dependencies:

npm install

4. Build application:

npm run build

5. Create Prisma files:

npm run prisma:create

A data folder will be created with the Prisma configuration files.