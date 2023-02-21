# API Reference/Documentation
## Getting Started
* Base URL: https://uptick-note-app.cyclic.app/api/v1
* Authentiction: Authentication is being handled by `/login` endpoint and user session is managed by Jason Web Token (JWT) of which logged in user gets logged out automatically after a specified period of time.

## Error Handling
Error responses are returned in format below:
```
{
  "success": false,
  "status": "Short error message",
  "message": "Detailed error message"
}
```
The API will return these error types when requests fail:
* 400: Bad Request
* 401: Authorization Not Granted
* 404: Resource Not Found
* 409: Conflict Operation
* 500: Internal Server Error

#
## Endpoints
### POST `/users/register`
* General:
    * Registers the user on the system
    * Request Arguments: None
* Sample Request:
```
POST https://uptick-note-app.cyclic.app/api/v1/users/register
Content-Type: application/json

{
    "username": "mustopha",
    "password": "password1"
}
```
* Sample Response:
```
{
  "success": true,
  "status": "Success",
  "message": "User created successfully",
  "data": {
    "id": 3,
    "username": "ayomide2"
  }
}
```

### POST `/users/login`
* General:
    * Logs in the user into the system
    * Authorizes the logged in user by assigning a unique Jason Web Token with which which the user access resources on the system
    * Request Arguments: None
* Sample Request:
```
POST https://uptick-note-app.cyclic.app/api/v1/users/login
Content-Type: application/json

{
    "username": "mustopha",
    "password": "ayinde_99"
}
```
* Sample Response:
```
{
  "success": true,
  "status": "Success",
  "message": "User Logged in Successfuly!",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJ1c2VybmFtZSI6ImF5b21pZGUyIiwicGFzc3dvcmQiOiIkMmIkMTAkV1JLb3BHSWhaTmxseHFVLzY3d3R1TzdJY3F4bExFa2pwbWtjc2VOMXN3cUFheHZSSWlWeEMiLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTIxVDE2OjM5OjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAyLTIxVDE2OjM5OjAwLjAwMFoifSwiaWF0IjoxNjc2OTk4NDU1LCJleHAiOjE2NzcwMDAyNTV9.0KVhQhWSi6J0mkaNktlU1RGN9sLH2WvBSYAwJUNAyAw"
  }
}
```
### POST `/notes/create`
* General:
    * Inserts a new note into the `note` table
    * Request Arguments: None
* Sample Request:
```
POST https://uptick-note-app.cyclic.app/api/v1/notes/create
Content-Type: application/json
authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJ1c2VybmFtZSI6ImF5b21pZGUyIiwicGFzc3dvcmQiOiIkMmIkMTAkV1JLb3BHSWhaTmxseHFVLzY3d3R1TzdJY3F4bExFa2pwbWtjc2VOMXN3cUFheHZSSWlWeEMiLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTIxVDE2OjM5OjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAyLTIxVDE2OjM5OjAwLjAwMFoifSwiaWF0IjoxNjc2OTk4NDU1LCJleHAiOjE2NzcwMDAyNTV9.0KVhQhWSi6J0mkaNktlU1RGN9sLH2WvBSYAwJUNAyAw

{
    "title": "Ogboju Ode Nini Igbo Irunmole",
    "content": "Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsumLorem ipum lorem ipsumLorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsumLorem ipum lorem ipsum Lorem ipum lorem ipsum"
}
```
* Sample Response:
```
{
  "success": true,
  "message": "Note created successfully"
}
```
### GET `/notes/:id`
* General:
    * Fetches a note by Id
    * Request Arguments: id (the id of the intended note)
* Sample Request:
```
GET https://uptick-note-app.cyclic.app/api/v1/notes/2
```
* Sample Response:
```
{
  "success": true,
  "status": "operation successful",
  "message": "Note was recovered successfuly",
  "data": {
    "id": 2,
    "author": "mustopha",
    "title": "Uptick",
    "content": "Uptick note uptick note uptic note uptick note"
  }
}
```

### GET `/notes`
### GET `/notes/:id`
* General:
    * Fetches all notes in the DB
    * Request Arguments: None
* Sample Request:
```
GET https://uptick-note-app.cyclic.app/api/v1/notes
```
* Sample Response:
```
{
  "success": true,
  "status": "operation successful",
  "message": "Notes were recovered successfuly",
  "data": [
    {
      "id": 1,
      "author": "mustopha",
      "title": "Ogboju Ode",
      "content": "Ogboju ode nla ninu igbo irunmole lati owo Ojogbon Akinwumi Ishola"
    },
    {
      "id": 2,
      "author": "mustopha",
      "title": "Uptick",
      "content": "Uptick note uptick note uptic note uptick note"
    },
    {
      "id": 3,
      "author": "ayomide2",
      "title": "Ogboju Ode Nini Igbo Irunmole",
      "content": "Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsumLorem ipum lorem ipsumLorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsumLorem ipum lorem ipsum Lorem ipum lorem ipsum"
    }
  ]
}
```

### GET `/mynotes`
* General:
    * Fetches all notes authored by the currently logged in user
    * Request Arguments: None
* Sample Request:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJ1c2VybmFtZSI6ImF5b21pZGUyIiwicGFzc3dvcmQiOiIkMmIkMTAkV1JLb3BHSWhaTmxseHFVLzY3d3R1TzdJY3F4bExFa2pwbWtjc2VOMXN3cUFheHZSSWlWeEMiLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTIxVDE2OjM5OjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAyLTIxVDE2OjM5OjAwLjAwMFoifSwiaWF0IjoxNjc3MDAwNTc1LCJleHAiOjE2NzcwMDIzNzV9.LBGQoBl6ceAMDQmFVu6tjx93mkYKsIkxjXvIhg5WDdg
```
* Sample Response:
```
{
  "success": true,
  "status": "operation successful",
  "message": "Your notes were recovered successfuly",
  "data": [
    {
      "id": 3,
      "author": "ayomide2",
      "title": "Ogboju Ode Nini Igbo Irunmole",
      "content": "Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsumLorem ipum lorem ipsumLorem ipum lorem ipsum Lorem ipum lorem ipsum Lorem ipum lorem ipsumLorem ipum lorem ipsum Lorem ipum lorem ipsum"
    }
  ]
}
```

### PUT `/notes/update`
### DELETE `/notes/:id`











