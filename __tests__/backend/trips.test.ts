const axios = require('axios'); 
const db = require("../../server/db"); 
const {Trip} = require("../../server/db/models");

const URL = (slug: string) => {
    return 'http://localhost:3000/api' + slug
}

describe("Trip routes", () => {
    beforeAll(() => {
        return db.sync({ force: true })
    });

    afterAll( async() => {
        await db.close();
    });

    describe("GET /api/trips", () => {
        beforeEach(async () => {
            await Trip.create(
                {
                    dateFrom: new Date(2020, 3, 24),
                    dateTo: new Date(2020, 3, 27),
                    status: 'booked',
                }
            )
        });

        it('displays a list of all trips', async () => {
            const res = await axios.get(URL('/trips'))
            const tripList = res.data

            expect(res.status).toEqual(200);
            expect(Array.isArray(tripList)).toEqual(true)
        });
    })

    describe("GET /api/trips/:tripId", () => {
        beforeEach(async () => {
            await Trip.create(
                {
                    dateFrom: new Date(2020, 3, 24),
                    dateTo: new Date(2020, 3, 27),
                    status: 'booked',
                }
            )
        });

        it('displays the listing with the specified id', async () => {
            const paramId = "1"
            const res = await axios.get(URL(`/trips/${paramId}`))
            const trip = res.data

            expect(trip.dateFrom).toEqual("2020-04-24");
            expect(Array.isArray(trip.users)).toEqual(true)
        });
    })

    describe("POST /api/trips", () => {
        beforeEach(async () => {
            await Trip.create(
                {
                    dateFrom: new Date(2020, 3, 1),
                    dateTo: new Date(2020, 3, 5),
                    status: 'pending',
                }
            )
        });

        it('saves the new listing to the database', async () => {
            const res = await axios.get(URL(`/trips`))
            const tripsArray = res.data
            const newTrip = tripsArray[0]

            expect(tripsArray.includes(newTrip)).toEqual(true)
            // expect(newTrip.name).toEqual("Cozy Treehouse in the Woods")
        });
    })

    // describe("PUT /api/trips/:tripId", () => {
        
    // })

    // describe("DELETE /api/trips/:tripId", () => {
        
    // })

});

export {}