const db = require('../../server/db/database');
const { User, Listing, Trip } = require('../../server/db/models');

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  correctPassword?: (str: string) => boolean;
  imageUrl?: string;
}

interface Listing {
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  minOccupants: number;
  maxOccupants: number;
  ownerPhotos?: Array<string>;
}

interface Trip {
  dateFrom: Date;
  dateTo: Date;
  status: string;
}

describe('Models', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  describe('User Model', () => {
    const userSkeleton: User = {
      firstName: 'Furb',
      lastName: 'McPhurbeson',
      email: 'watching@furby.com',
      password: 'hello',
    };

    it('should have correct firstName, lastName, email, imageUrl', async () => {
      const user: User = await User.create({
        ...userSkeleton,
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/61vI30cJerL._AC_SX425_.jpg',
      });
      expect(user.firstName).toEqual('Furb');
      expect(user.lastName).toEqual('McPhurbeson');
      expect(user.email).toEqual('watching@furby.com');
      expect(user.imageUrl).toEqual(
        'https://images-na.ssl-images-amazon.com/images/I/61vI30cJerL._AC_SX425_.jpg'
      );
    });

    it('should set a default value for imageUrl if not provided', async () => {
      let noImageUrl: User = await User.create(userSkeleton);

      expect(noImageUrl.imageUrl).toEqual('http://placekitten.com/600/400');
    });

    it('should validate emails', async () => {
      await User.create({
        ...userSkeleton,
        email: 'thisisnotanemail',
      }).then(
        () => {
          throw new Error('User should not be created when email is invalid');
        },
        (err: Error) => expect(err).toBeInstanceOf(Error)
      );
    });

    it('should not store plaintext passwords, but should be able to verify them', async () => {
      const user: User = await User.create(userSkeleton);
      expect(user.password).not.toEqual('hello');
      if (user.correctPassword)
        expect(user.correctPassword('hello')).toEqual(true);
      else throw new Error('All users should have correctPassword()');
    });
  });

  describe('Listing Model', () => {
    const listingSkeleton: Listing = {
      name: 'Name',
      description: 'Desc',
      address: 'Address',
      city: 'City',
      country: 'Country',
      minOccupants: 1,
      maxOccupants: 2,
    };

    it('should have correct name, description, address, city, country, occupants, photos', async () => {
      const listing: Listing = await Listing.create({
        ...listingSkeleton,
        ownerPhotos: ['link1', 'link2'],
      });

      expect(listing.name).toEqual('Name');
      expect(listing.description).toEqual('Desc');
      expect(listing.address).toEqual('Address');
      expect(listing.city).toEqual('City');
      expect(listing.country).toEqual('Country');
      expect(listing.minOccupants).toEqual(1);
      expect(listing.maxOccupants).toEqual(2);
      expect(listing.ownerPhotos).toEqual(['link1', 'link2']);
    });

    it('should set a default value for ownerPhotos if not provided', async () => {
      const listing: Listing = await Listing.create(listingSkeleton);

      expect(listing.ownerPhotos).toEqual([]);
    });
  });

  describe('Trip Model', () => {
    let dateFrom: Date;
    let dateTo: Date;

    beforeAll(() => {
      dateFrom = new Date(Date.now());
      dateTo = new Date(Date.now());
    });

    it('should have correct dateFrom, dateTo, status', async () => {
      const trip: Trip = await Trip.create({
        dateFrom,
        dateTo,
        status: 'pending',
      });

      const dateOnly = (date: Date) => {
        const year: number = date.getUTCFullYear();
        let month: number | string = date.getUTCMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day: number | string = date.getUTCDate();
        day = day < 10 ? '0' + day : day;
        return `${year}-${month}-${day}`;
      };

      console.log(trip.dateFrom, dateFrom);
      expect(trip.dateFrom).toEqual(dateOnly(dateFrom));
      expect(trip.dateTo).toEqual(dateOnly(dateTo));
      expect(trip.status).toEqual('pending');
    });

    it('should only take "pending" or "booked" for status', () => {
      Trip.create({ dateFrom, dateTo, status: 'notastatus' }).then(
        () => {
          throw new Error('Trip should not be created when status is invalid');
        },
        (err: Error) => expect(err).toBeInstanceOf(Error)
      );
    });
  });
});
