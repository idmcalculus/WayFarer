import pool from "../models/pool";

const trips = {
    createTrip: (req, res) => {
        const { 
            token,
            user_id,
            is_admin,
            bus_id,
            origin,
            destination,
            fare,
         } = req.body;
       
    pool.query(`INSERT INTO 
    trips(bus_id, origin, destination, fare)
    VALUES($1, $2, $3, $4)
    RETURNING *`,
    [bus_id, origin, destination, fare])
    .then((result) => {
        res.send({
            status: "success",
            data: {
                trip_id: result.rows[0].id,
                bus_id: result.rows[0].bus_id,
                origin: result.rows[0].origin,
                destination: result.rows[0].destination,
                trip_date: result.rows[0].trip_date,
                fare: result.rows[0].fare,
            }
        });
    })
    .catch((err) => {
        res.status(500).send({
            status: "error",
            error: "internal server error"
        });
    });
    
    },
    getTrips: (req, res) => {
        pool.query(`SELECT * FROM trips;`)
        .then((result) => {
            res.send({
                status: "success",
                data: result.rows,
            });
        })
        .catch((err) => {
            res.status(500).send({
            status: "error",
            error: "internal server error"
        });
    });
    }
};
export default trips;