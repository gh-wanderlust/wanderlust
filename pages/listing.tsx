import React from "react";

const Listing = () => {
  return (
    <div>
      <img
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
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          alt="person 1 interested"
        />
        <img
          src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          alt="person 2 interested"
        />
      </div>

      <div>
        <img
          src="https://a0.muscache.com/im/pictures/4dcae065-71cf-4a51-b3bb-dd3ed50c082e.jpg?aki_policy=xx_large"
          alt="guest photo"
        />
        <img
          src="https://a0.muscache.com/im/pictures/d4118ddd-677a-4dec-ae97-407c012405b1.jpg?aki_policy=xx_large"
          alt="guest photo"
        />
        <img
          src="https://a0.muscache.com/im/pictures/f350b2e2-08b4-418c-873d-cdec2fa1ac2e.jpg?aki_policy=xx_large"
          alt="guest photo"
        />
      </div>

      <button>I'm interested</button>
      <button>Book now</button>
    </div>
  );
};

export default Listing;
