import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface ListingData {
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
}

interface ListingProps {
  listing: object;
}

const dummyUser = {
  id: 1,
  firstName: 'William',
  lastName: 'Wallace',
  email: 'toFreedom@scotland.com',
  imageUrl:
    'https://www.britain-magazine.com/wp-content/uploads/William-Wallace.jpg',
  createdAt: '2020-02-06T14:39:56.062Z',
  updatedAt: '2020-02-06T14:39:56.062Z',
};

const dummyDate = {
  dateFrom: new Date(Date.now()),
  dateTo: new Date(Date.now()),
};

const dummyData = {
  id: 2,
  name: "Howl's Moving Castle",
  description: 'Charming castle on the move with charming prince!',
  address: '1986 Wynne Jones Road',
  city: 'Osaka',
  country: 'Japan',
  minOccupants: 3,
  maxOccupants: 6,
  ownerPhotos: [
    'https://i.imgur.com/bMpCKQ3.jpeg',
    'https://i.imgur.com/d8zr5a9.jpeg',
    'https://img.buzzfeed.com/buzzfeed-static/static/2015-07/15/17/enhanced/webdr05/original-9377-1436995231-3.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto',
  ],
  createdAt: '2020-02-06T14:39:55.890Z',
  updatedAt: '2020-02-06T14:39:55.890Z',
  trips: [
    {
      id: 1,
      dateFrom: '2021-04-25',
      dateTo: '2021-05-05',
      status: 'pending',
      createdAt: '2020-02-06T14:39:56.159Z',
      updatedAt: '2020-02-06T14:39:56.224Z',
      listingId: 2,
      users: [
        {
          id: 3,
          firstName: 'Sophie',
          lastName: 'Hatter',
          email: 'sophie@hatter.com',
          imageUrl:
            'https://i.pinimg.com/originals/a8/10/7a/a8107a0f1afa49f51f11566843830a55.jpg',
          createdAt: '2020-02-06T14:39:56.061Z',
          updatedAt: '2020-02-06T14:39:56.061Z',
          UserTrip: {
            createdAt: '2020-02-06T14:39:56.294Z',
            updatedAt: '2020-02-06T14:39:56.294Z',
            userId: 3,
            tripId: 1,
          },
        },
        {
          id: 2,
          firstName: 'Dwayne The Rock',
          lastName: 'Johnson',
          email: 'yourWelcome@moana.com',
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/f/f1/Dwayne_Johnson_2%2C_2013.jpg',
          createdAt: '2020-02-06T14:39:56.062Z',
          updatedAt: '2020-02-06T14:39:56.062Z',
          UserTrip: {
            createdAt: '2020-02-06T14:39:56.294Z',
            updatedAt: '2020-02-06T14:39:56.294Z',
            userId: 2,
            tripId: 1,
          },
        },
      ],
    },
  ],
};

const SingleListing = () => {
  return (
    <div>
      <div>
        {dummyData.ownerPhotos.map((imgUrl) => {
          return <img src={imgUrl} />;
        })}
      </div>
      <div>
        <h2>{dummyData.name}</h2>
        <p>{dummyData.description}</p>
      </div>
      <div>
        <ul>
          {dummyData.trips.map((trip) => {
            if (trip.status === 'pending') {
              return trip.users.map((user) => {
                return <li>{`${user.firstName} ${user.lastName}`}</li>;
              });
            }
          })}
        </ul>
        <button>I'm interested!</button>
      </div>
    </div>
  );
};

SingleListing.getInitialProps = async () => {
  const router = useRouter();
  const { id } = router.query;
  const res = await axios.get(`https://localhost:3000/api/listings/${id}`);
  console.log('RES: ', res);
  const listing = res.data;

  return { listing };
};

export default SingleListing;
