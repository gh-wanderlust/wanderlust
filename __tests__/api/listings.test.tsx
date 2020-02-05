// import axios from 'axios'
// import db from "../../server/db"
// import { Listing } from "../../server/db/models";

// const URL = (slug: string) => {
//     return 'http://localhost:3000/api' + slug
// }

// describe("User routes", () => {
//     beforeEach(() => {
//         return db.sync({ force: true })
//     });

//     describe("GET /api/listings", () => {
//         beforeEach(async () => {
//             await Listing.create(
//                 {
//                     name: "Awesome Lake House",
//                     description: "Great lake house with a view",
//                     address: "234 Lake House Drive",
//                     city: "Great Lakes",
//                     country: "USA"
//                 }
//             )
//         });

//         it('displays a list of all listings', async () => {
//             const res = await axios.get(URL('/listings'))
//             const listingList = res.data

//             expect(res.status).toEqual(200);
//             expect(Array.isArray(listingList)).toEqual(true)
//         });
//     })

//     describe("GET /api/listings/:listingId", () => {
//         beforeEach(async () => {
//             await Listing.create({
//                 name: "Awesome Lake House",
//                 description: "Great lake house with a view",
//                 address: "234 Lake House Drive",
//                 city: "Great Lakes",
//                 country: "USA"
//             })
//         });

//         it('displays the user with the specified id', async () => {
//             const paramId = "1"
//             const res = await axios.get(URL(`/users/${paramId}`))
//             const user = res.data

//             expect(user.firstName).toEqual("Hermione");
//             expect(Array.isArray(user.listings)).toEqual(true)
//             expect(Array.isArray(user.trips)).toEqual(true)
//         });
//     })

//     describe("POST /api/users", () => {
//         beforeEach(async () => {
//             await Listing.create({
//                 firstName: "Ron",
//                 lastName: "Weasley",
//                 email: "ron@weasley.com",
//                 password: "quidditch"
//             })
//         });

//         it('saves the new user to the database', async () => {
//             const res = await axios.get(URL(`/users`))
//             const userArray = res.data
//             const newUser = res.data[0]

//             expect(userArray.includes(newUser)).toEqual(true)
//             expect(newUser.firstName).toEqual("Ron")
//         });
//     })

//     describe("DELETE /api/users/:userId", () => {
//         // beforeEach(async () => {
//         //     await User.create({
//         //         firstName: "Hermione",
//         //         lastName: "Granger",
//         //         email: "hermione@granger.com",
//         //         password: "leviosa"
//         //     })
//         // });

//         // it('deletes the user by specified id', async () => {
//         //     const paramId = "1"
//         //     await axios.delete(URL(`/users/${paramId}`))

//         // });
//     })

// });