const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken")
require('dotenv').config()
const { connection } = require("./config/db");
const { UserModel } = require("./model/user.model");
const { FlightModel } = require("./model/flight.model");
const { BookingModel } = require("./model/booking.model");
const { authenticate } = require("./middleware/authentiacte.middleware");
const app = express();
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.send("You Are In Home Page")
})
app.post("/api/register", async (req, res) => {
    try {
        const new_user = new UserModel(req.body);
        await new_user.save();
        res.send(req.body)
    } catch (error) {
        res.send(error)
    }
})
app.post("/api/login", async (req, res) => {
    try {
        const user = await UserModel.find(req.body);
        if (user.length > 0) {
            const token = jwt.sign({ user_id: user[0]._id }, process.env.KEY)
            res.send({ "msg": "Login Successful", token: token })
        } else {
            res.send("No User Found")
        }
    } catch (error) {
        res.send(error)
    }
})
app.get("/api/flights", async (req, res) => {
    try {
        const flights = await FlightModel.find();
        res.send(flights)
    } catch (error) {
        res.send(error)
    }
})
app.get("/api/flights/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const flight = await FlightModel.find({ _id: _id });
        res.send(flight)
    } catch (error) {
        res.send(error)
    }
})
app.post("/api/flights", async (req, res) => {
    try {
        const new_flight = new FlightModel(req.body);
        await new_flight.save();
        res.send(req.body)
    } catch (error) {
        res.send(error)
    }
})
app.patch("/api/flights/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        await FlightModel.findByIdAndUpdate({ _id: _id }, req.body)
        res.send("Updated Flight")
    } catch (error) {
        res.send(error)
    }
})
app.delete("/api/flights/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        await FlightModel.findByIdAndDelete({ _id: _id })
        res.send("Deleted Flight")
    } catch (error) {
        res.send(error)
    }
})
app.use(authenticate)
app.post("/api/booking", async (req, res) => {
    const user_id = req.body.user_id;
    const flight_id = req.body.flight_id
    try {
        const new_booking = new BookingModel({
            user: { type: user_id, ref: 'User' },
            flight: { type: flight_id, ref: 'Flight' }
        });
        await new_booking.save();
        res.send({
            user: { type: user_id, ref: 'User' },
            flight: { type: flight_id, ref: 'Flight' }
        })
    } catch (error) {
        res.send(error)
    }
})
app.get("/api/dashboard", async (req, res) => {
    const user_id = req.body.user_id;
    try {
        const booking = await BookingModel.find({user: { type: user_id, ref: 'User' }})
        res.send(booking)
    } catch (error) {
        res.send(error)
    }
})
app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
})
