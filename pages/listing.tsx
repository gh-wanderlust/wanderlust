import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

interface User {
	firstName: string;
	lastName: string;
	imageUrl: string;
}

interface ListingData {
    name: string,
    description: string,
    address: string,
    city: string,
    country: string
}

const interestedUsers: Array<User> = [
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
	}
];

const Listing = (props: any) => {
  const [me, setMe] = useState<User>({
    firstName: "Pugga",
    lastName: "Chang",
    imageUrl:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=660&q=80"
  });

  const [interested, setInterested] = useState(
    interestedUsers
  );

  const [isBookingActive, setIsBookingActive] = useState(false);

  const handleInterested = () => {
    if (interested.length === 1) {
      setInterested([...interested, me]);
    }

    if (interested.length === 2) {
      setInterested([...interested, me]);
      setIsBookingActive(true);
    }
  };

  return (
		<Wrapper>
			<HouseImg
				src="https://a0.muscache.com/im/pictures/effe9703-69e5-469e-a280-3acdc5332d8d.jpg?aki_policy=xx_large"
				alt=""
			/>
			<h1>Peaceful Log Cabin in the Woods</h1>
			<p>
				This log cabin is set in the woods in a rural part of northeastern
				Vermont. Escape the hustle and bustle, clear your mind, and enjoy
				nature. A great place to get some fresh air or to stay in and take a
				nap. Beautiful summers for easy hikes and refreshing swims in the lakes
				of our local Groton State Forest, unbelievable foliage to view from
				small dirt roads, and tons of outdoor winter activities. Great for a
				couples getaway, friends weekend, or some quality time with the kids.
				Pets welcome, too!
			</p>
			<ul>
				<li>
					<h4>Niko</h4>
					<p>
						This cabin was so beautiful and exactly as it looked in the photos.
					</p>
				</li>
				<li>
					<h4>Abby</h4>
					<p>
						Such an amazing place to stay. Would highly recommend this cabin to
						everyone.
					</p>
				</li>
				<li>
					<h4>Lena</h4>
					<p>
						Amazing place! Very clean, quite and dog friendly. We had amazing
						time there. Thank you so much Emily and Patty!
					</p>
				</li>
			</ul>

			<div>
				<h3>Guest Photos</h3>
				<GuestPhotos>
					<HouseImg
						src="https://a0.muscache.com/im/pictures/4dcae065-71cf-4a51-b3bb-dd3ed50c082e.jpg?aki_policy=xx_large"
						alt="guest photo"
					/>
					<HouseImg
						src="https://a0.muscache.com/im/pictures/d4118ddd-677a-4dec-ae97-407c012405b1.jpg?aki_policy=xx_large"
						alt="guest photo"
					/>
					<HouseImg
						src="https://a0.muscache.com/im/pictures/f350b2e2-08b4-418c-873d-cdec2fa1ac2e.jpg?aki_policy=xx_large"
						alt="guest photo"
					/>
				</GuestPhotos>
			</div>
			<div>
				{interested.map((user: any) => (
					<ProfilePic src={user.imageUrl} alt="person  interested" />
				))}
			</div>
			<button onClick={() => handleInterested()}>I'm interested</button>
			{isBookingActive ? (
				<Link href="/booking">
					<button>Book now</button>
				</Link>
			) : (
				<button disabled>Book now</button>
			)}
		</Wrapper>
	);
};

export default Listing;

const Wrapper = styled.div``;

const HouseImg = styled.img`
  max-width: 97vw;
`;

const GuestPhotos = styled.div`
  display: flex;
  width: 97vw;
`;
const ProfilePic = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
`;
