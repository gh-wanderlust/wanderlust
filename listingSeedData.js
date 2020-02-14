const listingSeed = [
	{
		name: 'Peaceful Log Cabin in the Woods',
		description:
			'This log cabin is set in the woods in a rural part of Montpelier. Escape the hustle and bustle, clear your mind, and enjoy nature. A great place to get some fresh air or to stay in and take a nap. Beautiful summers for easy hikes and refreshing swims in the lakes of our local Groton State Forest, unbelievable foliage to view from small dirt roads, and tons of outdoor winter activities. Great for a couples getaway, friends weekend, or some quality time with the kids. Pets welcome, too!',
		address: '67 Bliss Rd',
		city: 'Montpelier',
		country: 'United States of America',
		zipCode: '05602',
		minOccupants: 4,
		maxOccupants: 8,
		ownerPhotos: [
			'https://roadesque.com/assets/a-peaceful-cabin-in-the-canadian-woods-at-logden-lodge/logdenLodge-2.jpg',
			'https://i.pinimg.com/originals/51/5e/8e/515e8e2f8de4ce6b42f6aaebbf923543.jpg',
			'https://www.impressiveinteriordesign.com/wp-content/uploads/2012/10/Cabin-Design-Ideas-For-Inspiration-7.jpg',
			'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
		],
		price: 20000
	},
	{
		name: 'Cozy Ski Lodge',
		description:
			'Come enjoy the tranquil beauty of this Montpelier vacation rental in the mountains! Not far from the Ski Resort, this lodge is ideally located for skiers.',
		address: '586 Ski Lodge Lane',
		city: 'Montpelier',
		country: 'United States of America',
		zipCode: '05651',
		minOccupants: 6,
		maxOccupants: 10,
		ownerPhotos: [
			'https://images.unsplash.com/photo-1487975460695-a2e5c4ea12c9',
			'https://images.unsplash.com/photo-1560890264-4b92305ee66e',
			'https://images.unsplash.com/photo-1576536423721-d68a48c8ffd8',
			'https://images.unsplash.com/photo-1563070779-147fe2aa51d3'
		],
		price: 15000
	},
	{
		name: "Howl's Moving Castle",
		description: 'Charming castle on the move with charming prince!',
		address: '112 Log Rd',
		city: 'Montpelier',
		country: 'United States of America',
		zipCode: '05660',
		minOccupants: 3,
		maxOccupants: 6,
		ownerPhotos: [
			'https://i.imgur.com/bMpCKQ3.jpeg',
			'https://i.imgur.com/d8zr5a9.jpeg',
			'https://img.buzzfeed.com/buzzfeed-static/static/2015-07/15/17/enhanced/webdr05/original-9377-1436995231-3.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto',
			'https://images4.alphacoders.com/123/123064.jpg'
		],
		price: 2000
	},
	{
		name: "Bag End",
		description: 'Welcome to chez Bilbo Baggins!',
		address: '1 Diwedd Bag',
		city: 'Chicago',
		country: 'United States of America',
		zipCode: '60659',
		minOccupants: 2,
		maxOccupants: 6,
		ownerPhotos: [
			'https://i.pinimg.com/564x/e7/3d/0c/e73d0c66d291f3c2686064bbcf1a7de3.jpg',
			'https://images.unsplash.com/photo-1575735409309-e0ecb6088fcd',
			'https://www.hobbitontours.com/media/1174/hobbiton-movie-set-30.jpg',
			'https://i.pinimg.com/originals/12/71/a8/1271a8929f4025e39f3dda1240a9e8d6.png'
		],
		price: 2000
	},
	{
		name: 'Bungalow over water',
		description: 'Beautiful bungalow for your next getaway!',
		address: 'SE 5th St',
		city: 'Miami',
		country: 'United States of America',
		zipCode: '33131',
		minOccupants: 3,
		maxOccupants: 6,
		ownerPhotos: [
			'https://www.jetsetter.com/uploads/sites/7/2018/09/tgBIPKMb-1380x690.jpeg',
			'https://i.pinimg.com/originals/eb/db/dd/ebdbdd76d7ed4b55cd4dae8702b8bded.jpg',
			'https://www.jetsetter.com/uploads/sites/7/2018/04/bath-hotels-island-luxury-960x960.jpeg',
			'https://www.fourseasons.com/alt/img-opt/~70.1530/publish/content/dam/fourseasons/images/web/BOR/BOR_130_aspect16x9.jpg'
		],
		price: 20000
	},
	{
		name: 'Eternal Summer Cottage in the Grove',
		description: 'This cozy private cottage was featured in The Tropical Cottage: At Home in Coconut Grove (2013). Only 10-15 min. from South Beach, South Miami, and Coral Gables, and close to Cocowalk.',
		address: '50 W 2nd Ave',
		city: 'Miami',
		country: 'United States of America',
		zipCode: '33130',
		minOccupants: 4,
		maxOccupants: 8,
		ownerPhotos: [
			'https://i.pinimg.com/originals/55/d6/7c/55d67c27b58c8ad2842ae9ca31f00ddc.jpg',
			'https://images.unsplash.com/photo-1565538810643-b5bdb714032a',
			'https://images.unsplash.com/photo-1529262365544-55d1707e64e6',
			'https://images.unsplash.com/photo-1553444836-bc6c8d340ba7'
		],
		price: 18000
	},
	{
		name: 'Luxury Condo',
		description:
			'Unique and deluxe 5-star Condo, with a Spa and Swimming Pool on premises',
		address: '1155 Brickell Bay',
		city: 'Miami',
		country: 'United States of America',
		zipCode: '33131',
		minOccupants: 3,
		maxOccupants: 6,
		ownerPhotos: [
			'https://1000museum.com/wp-content/uploads/2017/10/otm07-800x600.jpg',
			'https://thumbnails.trvl-media.com/h7QPK0x06_qxb-XdhoCKMXwq57k=/582x388/smart/filters:quality(60)/images.trvl-media.com/hotels/22000000/21620000/21611900/21611811/1a8adb5b_z.jpg',
			'https://q-cf.bstatic.com/images/hotel/max1024x768/195/195381409.jpg'
		],
		price: 20000
	},
	{
		name: 'ur Comfort Duplex',
		description:
			"Bright duplex with your own entrance, right in the middle of Chicago's vribrant Northside.",
		address: '550 W Oakdale Ave.',
		city: 'Chicago',
		country: 'United States of America',
		zipCode: '60657',
		minOccupants: 2,
		maxOccupants: 4,
		ownerPhotos: [
			'https://i.redd.it/004pbtnqsru11.jpg',
			'https://images.atproperties.com/MRED/07/474/962/1.jpg',
			'https://i.pinimg.com/originals/16/1e/0e/161e0e00811664a6a11bc8c18c7219a7.jpg'
		],
		price: 20000
	},
	{
		name: 'Hip Chicago Apartment',
		description:
			"Newly renovated 3 bedroom apartment located in Chicago's iconic Logan Square.",
		address: '2752 W Fullerton Ave',
		city: 'Chicago',
		country: 'United States of America',
		zipCode: '60647',
		minOccupants: 2,
		maxOccupants: 3,
		ownerPhotos: [
			'https://mobileindia.info/image/hipster-apartment-decor/hipster-apartment-decor-budget-5-friend-new-city-one-amazing-broke-and-phoenix-in-lo-angele-toronto-chicago-for-rent-atlantum-building.jpg',
			'https://storage.googleapis.com/gen-atmedia/2/2018/06/4d3c86d09195291b1ddc63885caf6457723154d0.jpeg',
			'https://ssl.cdn-redfin.com/photo/68/mbphoto/675/genMid.09586675_1.jpg'
		],
		price: 20000
	},
	{
		name: 'Heart of Lakeview',
		description:
			"Our home is on a quiet tree-lined street in Chicago's Lakeview neighborhood where you will find dozens of restaurants within a short walk, offering food from many lands.",
		address: '3640 N Halsted St',
		city: 'Chicago',
		country: 'United States of America',
		zipCode: '60613',
		minOccupants: 2,
		maxOccupants: 3,
		ownerPhotos: [
			'https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-40221518-unapproved/original/9cb8dad5-3870-43c6-b9ea-57085b6b8887.JPEG?aki_policy=x_large',
			'https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-40221518-unapproved/original/2bcafd86-8a67-4506-b407-4d7120efb4dd.JPEG?aki_policy=large',
			'https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-40221518-unapproved/original/9dcad402-270a-487a-9a67-26c140d0ca08.JPEG?aki_policy=large',
			'https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-40221518-unapproved/original/4dc52681-19c8-47ad-8912-dbe828fe641a.JPEG?aki_policy=xx_large'
		],
		price: 6400
	},
	{
		name: 'Urban Comfort in the Heart of Chicago',
		description:
			"We are in the middle of Chicago's vibrant Northside while still having the benefit of coming home to a tree lined one lane residential street.",
		address: '1632 W Wrightwood Ave',
		city: 'Chicago',
		country: 'United States of America',
		zipCode: '60614',
		minOccupants: 6,
		maxOccupants: 8,
		ownerPhotos: [
			'https://a0.muscache.com/im/pictures/6b1cd161-de4e-461b-a510-def789438b8e.jpg?aki_policy=x_large',
			'https://a0.muscache.com/im/pictures/df75be99-acf2-43be-acc4-9474b36d8190.jpg?aki_policy=large',
			'https://a0.muscache.com/im/pictures/03fe7483-9f1b-4b17-9f44-2aa2609a2605.jpg?aki_policy=xx_large',
			'https://a0.muscache.com/im/pictures/317dd70a-cb0e-4379-8125-6e84941018f5.jpg?aki_policy=xx_large'
		],
		price: 6500
	},
	{
		name: 'Cozy Lakeview Loft',
		description:
			"The Lakeview Loft is a freshly remodeled loft space with a vintage Chicago theme and modern amenities. ",
		address: '1632 W Wrightwood Ave',
		city: 'Chicago',
		country: 'United States of America',
		zipCode: '60618',
		minOccupants: 3,
		maxOccupants: 6,
		ownerPhotos: [
			'https://a0.muscache.com/im/pictures/63ac9caa-c2ba-47ba-9b2e-ac14ad409697.jpg?aki_policy=large',
			'https://a0.muscache.com/im/pictures/1f88d847-9109-44a7-b7d1-6bb46364ff98.jpg?aki_policy=large',
			'https://a0.muscache.com/im/pictures/b80546b5-5e79-4e98-b207-0029c38cfc19.jpg?aki_policy=xx_large',
			'https://a0.muscache.com/im/pictures/be5bd8d0-b801-45ca-99f1-d54567806d21.jpg?aki_policy=poster'
		],
		price: 5900
	},

];

  module.exports = listingSeed
