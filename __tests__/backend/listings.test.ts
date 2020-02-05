import axios from 'axios'
import db from "../../server/db"
import { Listing } from "../../server/db/models";

const URL = (slug: string) => {
    return 'http://localhost:3000/api' + slug
}

interface Listing {
    id: number,
    name: string,
    description: string,
    address: string,
    city: string,
    country: string,
    minOccupants: number,
    maxOccupants: number
}

describe("Listing routes", () => {
    beforeAll(() => {
        return db.sync({ force: true })
    });

    afterAll( async() => {
        await db.close();
    });
    
    describe("GET /api/listings", () => {
        beforeEach(async () => {
            await Listing.create(
                {
                    name: "Awesome Lake House",
                    description: "Great lake house with a view",
                    address: "234 Lake House Drive",
                    city: "Great Lakes",
                    country: "USA",
                    minOccupants: 3,
                    maxOccupants: 6
                }
            )
        });

        it('displays a list of all listings', async () => {
            const res = await axios.get(URL('/listings'))
            const listingList = res.data

            expect(res.status).toEqual(200);
            expect(Array.isArray(listingList)).toEqual(true)
        });
    })

    describe("GET /api/listings/:listingId", () => {
        beforeEach(async () => {
            await Listing.create({
                name: "Awesome Lake House",
                description: "Great lake house with a view",
                address: "234 Lake House Drive",
                city: "Great Lakes",
                country: "USA",
                minOccupants: 4,
                maxOccupants: 8
            })
        });

        it('displays the listing with the specified id', async () => {
            const paramId = "1"
            const res = await axios.get(URL(`/listings/${paramId}`))
            const listing = res.data

            expect(listing.name).toEqual("Awesome Lake House");
        });
    })

    describe("POST /api/listings", () => {
        beforeEach(async () => {
            await Listing.create({
                name: "Cozy Treehouse in the Woods",
                description: "Come prepared with hot chocolate!",
                address: "234 Tree House Lane",
                city: "Great Trees",
                country: "USA",
                minOccupants: 2,
                maxOccupants: 4
            })
        });

        it('saves the new listing to the database', async () => {
            const res = await axios.get(URL(`/listings`))
            const listingArray = res.data
            const newListing = res.data[res.data.length-1]

            expect(listingArray.includes(newListing)).toEqual(true)
            expect(newListing.name).toEqual("Cozy Treehouse in the Woods")
        });
    })


    // describe("DELETE /api/listings/:listingId", () => {
    //     let listing: Listing
    //         beforeEach(async () => {
    //             listing = await Listing.create({
    //                 name: "Cozy Treehouse in the Woods",
    //                 description: "Come prepared with hot chocolate!",
    //                 address: "234 Tree House Lane",
    //                 city: "Great Trees",
    //                 country: "USA",
    //                 minOccupants: 8,
    //                 maxOccupants: 10
    //             })
    //         });

    //     it('deletes the listing by specified id', async () => {
    //         console.log("WHAT IS THE LISTING id: ", listing.id)
    //         const paramId = listing.id
    //         const res = await axios.delete(URL(`/listings/${paramId}`))

    //         expect(listing).toBe(undefined)

    //     });
    // })

});