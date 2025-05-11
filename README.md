##### Afghan Proverbs API

## Project Description

This project is a RESTful API for Afghan Proverbs .
It has the proverbs in Dari and Pashto and also its transelation in English with its actual meaning.
Every proverb has its own unique id.
It support CRUD (Create ,Read ,Delete ,Update) oprations.

## Main Features

# /proverbs

get all proverbs

# /proverbs/:id

Get a single proverb by ID

# /proverbs (POST method)

Add a new proverb

# /proverbs/:id (PUT method)

Update an existing proverb by ID

# /proverbs/:id (Delete method)

Delete a proverb by ID

## Tech Stack Used

-Backend:Node.js,Express js
-Data Storage: JSON file
-Request and Response:JSON

## How to run the project locally

Install dependencies:npm install
Run the server: node index.js

## Request and Response Examples

# Request

http://localhost:3000/proverbs/8

# Response

  {
    "id": 8,
    "textDari": "با دستمال نمی‌شود جلوی آب را گرفت.",
    "textPashto": "د لاسمال سره اوبه نه شي درېدلی.",
    "translation": "You cannot stop water with a handkerchief.",
    "meaning": "Small efforts cannot prevent major events from happening.",
    "category": "Pragmatism"
  }
  
### API Base URL
https://afghan-proverbs-api-na79.onrender.com
