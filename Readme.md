
 --To Register
    path-api/register
    method-POST
    body-{
        "name":"Hara",
        "email":"hara@gmail.com",
        "PassWord":"Hara@gmail.com"
    }
    res u get-{
        "name":"Hara",
        "email":"hara@gmail.com",
        "PassWord":"Hara@gmail.com"
    }
--to Login
    path-api/login
    method-POST
    body-{
        "email":"hara@gmail.com",
        "PassWord":"Hara@gmail.com"
    }
    res u get-{
    "msg": "Login Successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNmNzJjMmQ3YWYwMjk2NGIzMGRkMzgzIiwiaWF0IjoxNjc3MTQzMTA2fQ.iR_LtYFHzIEtIa-VcurD681QBvaMkr9EWqceteZGd70"
    }
--to Create A Flight Data
    path-api/flights
    method-POST
    body-{
    "airline": "india",
    "flightNo":"12A18",
    "departure": "departure",
    "arrival": "Arrival",
    "departureTime":" Wed Jul 03 2019 19:01:35 GMT+0530 (India Standard Time)",
    "arrivalTime":"Wed Jul 03 2019 19:01:30 GMT+0530 (India Standard Time)" ,
    "seats": 100,
    "price": 2000
    }
    res u get-{
  "airline": "india",
  "flightNo": "12B10",
  "departure": "departure",
  "arrival": "Arrival",
  "departureTime": " Wed Jul 03 2019 19:01:35 GMT+0530 (India Standard Time)",
  "arrivalTime": "Wed Jul 03 2019 19:01:30 GMT+0530 (India Standard Time)",
  "seats": 100,
  "price": 2000
  }
--to get All flight details
    path-api/flights
    method-GET
    body-
    res u get-
        An arry of object. Each Object represents the information of one flight
--to get a single flight
    path-api/flights/id_of_the_flight
    method-GET,
    response- A array containing single flight object
--to upadte a flight details
    path-api/flights/id_of_the_flight
    method-PATCH
    body-{
    "airline": "india AIRLINE",
    "flightNo": "12B10",
    "departure": "departure",
    "arrival": "Arrival",
    "departureTime": " Wed Jul 03 2019 19:01:35 GMT+0530 (India Standard Time)",
    "arrivalTime": "Wed Jul 03 2019 19:01:30 GMT+0530 (India Standard Time)",
    "seats": 100,
    "price": 2000
    }
    response-Filght Updated
--TO delete a flight
    path-api/flights/id_of_the_flight
    method-DELETE
    body-
    response-Filght Deleted;
--To book a flight
    path-api/flights/booking
    method-POST
    body-{
        "flight_id":id_of_a_flight
    }
    headers:{
        token:token u got while login
    }
    response-objec having user and flight id
--to dashboard
    path-api/flights/booking
    method-GET
    headers:{
        token:token u got while login
    }
    response-Array of object
    it only shows the booking details of the user whose token is sended in headers