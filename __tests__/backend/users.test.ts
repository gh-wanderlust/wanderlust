const axios = require('axios'); 
const db = require("../../server/db"); 
const {User} = require("../../server/db/models");

const URL = (slug: string) => {
    return 'http://localhost:3000/api'+slug
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    correctPassword?: (str: string) => boolean;
    imageUrl?: string;
}

describe("User routes", () => {
    beforeEach( async() => {
        await db.sync({ force: true })
    });

    afterAll( async() => {
        await db.close();
    });

    describe("GET /api/users", () => {
        beforeEach(async () => {
            try {
                await User.create(
                    {
                        firstName: "Harry",
                        lastName: "Potter",
                        email: "harry@potter.com",
                        password: "broomsticks"
                    },
                    {
                        firstName: "Ron",
                        lastName: "Weasley",
                        email: "ron@weasley.com",
                        password: "quidditch"
                    })
            } catch (error) {
                console.error(error)
            }
        });

        it('displays a list of all users', async () => {
            const res = await axios.get(URL('/users'))
            const userList = res.data

            expect(res.status).toEqual(200);
            expect(Array.isArray(userList)).toEqual(true)
        });
    })

    describe("GET /api/users/:userId", () => {
        beforeEach(async () => {
            try {
                await User.create({
                    firstName: "Hermione",
                    lastName: "Granger",
                    email: "hermione@granger.com",
                    password: "leviosa"
                })
            } catch (error) {
                console.error(error)
            }
        });

        it('displays the user with the specified id', async () => {
            const paramId = "1"
            const res = await axios.get(URL(`/users/${paramId}`))
            const user = res.data

            expect(user.firstName).toEqual("Hermione");
            expect(Array.isArray(user.listings)).toEqual(true)
            expect(Array.isArray(user.trips)).toEqual(true)
        });
    })

    describe("POST /api/users", () => {
        beforeEach(async () => {
            await User.create({
                firstName: "Ron",
                lastName: "Weasley",
                email: "ron@weasley.com",
                password: "quidditch"
            })
        });

        it('saves the new user to the database', async () => {
            const res = await axios.get(URL(`/users`))
            const userArray = res.data
            const newUser = res.data[0]

            expect(userArray.includes(newUser)).toEqual(true)
            expect(newUser.firstName).toEqual("Ron")
        });
    })

    // describe("DELETE /api/users/:userId", () => {
    //     let user: User
    //     beforeEach(async () => {
    //         user = await User.create({
    //             firstName: "Hermione",
    //             lastName: "Granger",
    //             email: "hermione@granger.com",
    //             password: "leviosa"
    //         })
    //     });

    //     it('deletes the user by specified id', async () => {

    //         // console.log("USER: ", user)
    //         const paramId = user.id
    //         await axios.delete(URL(`/users/${paramId}`))

    //         expect(user).toEqual(undefined);
            
    //     });
    // })

});

export {}