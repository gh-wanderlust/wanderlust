import React from 'react'

interface User {
    firstName: string,
    lastName: string,
    imageUrl: string,
}

interface Listing {
    name: string,
    description: string,
    address: string,
    city: string,
    country: string
}

interface TravelDate {
    dateFrom: Date,
    dateTo: Date
}

const dummyUsers: Array<User> = [
	{
		firstName: 'Puggo',
		lastName: 'Johnson',
		imageUrl:
			'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80'
	},
	{
		firstName: 'Pugginton',
		lastName: 'Ramirez',
		imageUrl:
			'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'
	},
	{
		firstName: 'Pugga',
		lastName: 'Chang',
		imageUrl:
			'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=660&q=80'
	}
];

const dummyListing: Listing = {
	name: 'Peaceful Log Cabin in the Woods',
	description:
		'This log cabin is set in the woods in a rural part of northeastern Vermont. Escape the hustle and bustle, clear your mind, and enjoy nature. A great place to get some fresh air or to stay in and take a nap. Beautiful summers for easy hikes and refreshing swims in the lakes of our local Groton State Forest, unbelievable foliage to view from small dirt roads, and tons of outdoor winter activities. Great for a couples getaway, friends weekend, or some quality time with the kids. Pets welcome, too!',
	address: '123 Furby Lane',
	city: 'Furbtrocity',
	country: 'Furbtopia'
};

const dummyDate: TravelDate = {
    dateFrom: new Date(2020, 2, 14),
    dateTo: new Date(2020, 2, 17)
}

const Booking = function () {
    const listing = dummyListing;
    const users = dummyUsers;
    const date = dummyDate;

    return (
        <div>
            <div>
                <h2>You'll be staying at {listing.name}:</h2>
                <p>{listing.description}</p>
                <p>{listing.address}</p>
                <p>{listing.city}</p>
                <p>{listing.country}</p>
            </div>
            <div>Travel Dates: from {date.dateFrom.toString()} to {date.dateTo.toString()}</div>
            <div>
                Traveling with: {users.map((user: User) => {
                    return (
                        <div>
                            <p>{user.firstName + " " +user.lastName}</p>
                            <img src={user.imageUrl} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Booking