import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

interface ListingData {
    name: string,
    description: string,
    address: string,
    city: string,
    country: string
}

interface ListingProps {
    listing: object
}

const dummyListing = {
    name: 'Peaceful Log Cabin in the Woods',
    description:
      'This log cabin is set in the woods in a rural part of northeastern Vermont. Escape the hustle and bustle, clear your mind, and enjoy nature. A great place to get some fresh air or to stay in and take a nap. Beautiful summers for easy hikes and refreshing swims in the lakes of our local Groton State Forest, unbelievable foliage to view from small dirt roads, and tons of outdoor winter activities. Great for a couples getaway, friends weekend, or some quality time with the kids. Pets welcome, too!',
    address: '888 Loch Ness Way',
    city: 'Inverness',
    country: 'Scotland',
    minOccupants: 4,
    maxOccupants: 8,
    ownerPhotos: [
      'https://roadesque.com/assets/a-peaceful-cabin-in-the-canadian-woods-at-logden-lodge/logdenLodge-2.jpg',
      'https://i.pinimg.com/originals/51/5e/8e/515e8e2f8de4ce6b42f6aaebbf923543.jpg',
      'https://www.impressiveinteriordesign.com/wp-content/uploads/2012/10/Cabin-Design-Ideas-For-Inspiration-7.jpg',
    ]
  }

const SingleListing = () => {

    return (
        <div>
            <div>
                {dummyListing.ownerPhotos.map(imgUrl => {
                    return (
                        <img src={imgUrl}/>
                    )
                })}
            </div>
            <div>
                <h2>{dummyListing.name}</h2>
                <p>{dummyListing.description}</p>
            </div>
            <div>
                
            </div>
            <button>I'm interested!</button>
        </div>

    )

}

SingleListing.getInitialProps = async () => {
    const router = useRouter()
    const { id } = router.query
    const res = await axios.get(`https://localhost:3000/api/listings/${id}`)
    console.log("RES: ", res)
    const listing = res.data

    return { listing }
}


export default SingleListing