export interface Transit {
  line: string
  type: 'subway' | 'bus' | 'ferry' | 'lirr' | 'path'
  distance: string
  time: string
}

export interface Media {
  photos: string[]
  matterport: string
  floorplan: string
  povVideo: string
}

export interface Listing {
  id: string
  title: string
  priceGross: number
  priceNet: number
  neighborhood: string
  sqft: number
  beds: number
  baths: number
  latitude: number
  longitude: number
  isNoFee: boolean
  petsAllowed: boolean
  availableDate: string
  amenities: string[]
  media: Media
  transit: Transit[]
  description: string
}

export const baseListings: Listing[] = [
  {
    id: "1",
    title: "Luminous Corner Unit — Brooklyn Heights",
    priceGross: 4200,
    priceNet: 3800,
    neighborhood: "Brooklyn Heights",
    sqft: 1050,
    beds: 2,
    baths: 1,
    latitude: 40.6958,
    longitude: -73.9936,
    isNoFee: true,
    petsAllowed: true,
    availableDate: "2026-06-01",
    description: "A sun-drenched corner unit on the 9th floor with sweeping views of Lower Manhattan and the Brooklyn Bridge. Prewar details meet fully renovated interiors — exposed brick, hardwood throughout, chef's kitchen with quartz counters.",
    amenities: ["Doorman", "Gym", "Rooftop Deck", "Laundry In-Unit", "Central AC", "Dishwasher", "Package Room", "Virtual Doorman"],
    media: {
      photos: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"
      ],
      matterport: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
      floorplan: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
      povVideo: "https://www.youtube.com/embed/ScMzIvxBSi4"
    },
    transit: [
      { line: "2/3", type: "subway", distance: "0.2 mi", time: "3 min" },
      { line: "A/C", type: "subway", distance: "0.3 mi", time: "5 min" },
      { line: "F", type: "subway", distance: "0.5 mi", time: "9 min" }
    ]
  },
  {
    id: "2",
    title: "Industrial Loft — Williamsburg Waterfront",
    priceGross: 3450,
    priceNet: 3100,
    neighborhood: "Williamsburg",
    sqft: 920,
    beds: 1,
    baths: 1,
    latitude: 40.7181,
    longitude: -73.9571,
    isNoFee: false,
    petsAllowed: true,
    availableDate: "2026-07-01",
    description: "Former factory space converted with exceptional care. 14-ft ceilings, steel-framed windows flooding every inch with natural light. The kind of loft that rarely comes to market twice.",
    amenities: ["Bike Storage", "Gym", "Roof Access", "Laundry In-Building", "Central AC", "Exposed Brick", "Concierge"],
    media: {
      photos: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80"
      ],
      matterport: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
      floorplan: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
      povVideo: "https://www.youtube.com/embed/ScMzIvxBSi4"
    },
    transit: [
      { line: "L", type: "subway", distance: "0.3 mi", time: "5 min" },
      { line: "G", type: "subway", distance: "0.6 mi", time: "10 min" }
    ]
  },
  {
    id: "3",
    title: "Prewar Gem — East Village, 1BR",
    priceGross: 3200,
    priceNet: 2950,
    neighborhood: "East Village",
    sqft: 680,
    beds: 1,
    baths: 1,
    latitude: 40.7265,
    longitude: -73.9815,
    isNoFee: true,
    petsAllowed: false,
    availableDate: "2026-05-15",
    description: "High ceilings and original hardwood floors in a classic East Village walkup. Gut-renovated kitchen and bath while preserving period character. On a tree-lined block steps from Tompkins Square Park.",
    amenities: ["Laundry In-Building", "Dishwasher", "Central AC", "Hardwood Floors", "High Ceilings"],
    media: {
      photos: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
      ],
      matterport: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
      floorplan: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
      povVideo: "https://www.youtube.com/embed/ScMzIvxBSi4"
    },
    transit: [
      { line: "L", type: "subway", distance: "0.2 mi", time: "3 min" },
      { line: "6", type: "subway", distance: "0.3 mi", time: "5 min" },
      { line: "F/M", type: "subway", distance: "0.4 mi", time: "7 min" }
    ]
  },
  {
    id: "4",
    title: "Grand 3BR — Upper West Side Classic",
    priceGross: 6800,
    priceNet: 6200,
    neighborhood: "Upper West Side",
    sqft: 1600,
    beds: 3,
    baths: 2,
    latitude: 40.7870,
    longitude: -73.9754,
    isNoFee: true,
    petsAllowed: true,
    availableDate: "2026-06-15",
    description: "Sprawling prewar cooperative on one of the Upper West Side's most coveted blocks. Three proper bedrooms, formal dining room, and a working fireplace. White-glove full-service building with landscaped courtyard.",
    amenities: ["Doorman", "Concierge", "Gym", "Pool", "Central AC", "Laundry In-Unit", "Storage", "Fireplace", "Dishwasher", "Private Courtyard"],
    media: {
      photos: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"
      ],
      matterport: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
      floorplan: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
      povVideo: "https://www.youtube.com/embed/ScMzIvxBSi4"
    },
    transit: [
      { line: "1/2/3", type: "subway", distance: "0.1 mi", time: "2 min" },
      { line: "B/C", type: "subway", distance: "0.2 mi", time: "3 min" }
    ]
  },
  {
    id: "5",
    title: "Renovated 2BR — Astoria, Quiet Street",
    priceGross: 2950,
    priceNet: 2700,
    neighborhood: "Astoria",
    sqft: 880,
    beds: 2,
    baths: 1,
    latitude: 40.7721,
    longitude: -73.9302,
    isNoFee: false,
    petsAllowed: true,
    availableDate: "2026-06-01",
    description: "Sun-filled two-bedroom in a boutique prewar building steps from Astoria Park and the East River waterfront. Exposed brick, refinished hardwood, and a modern kitchen that punches above the price.",
    amenities: ["Laundry In-Building", "Dishwasher", "Hardwood Floors", "Exposed Brick", "Outdoor Space"],
    media: {
      photos: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
      ],
      matterport: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
      floorplan: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
      povVideo: "https://www.youtube.com/embed/ScMzIvxBSi4"
    },
    transit: [
      { line: "N/W", type: "subway", distance: "0.3 mi", time: "5 min" },
      { line: "M60", type: "bus", distance: "0.1 mi", time: "2 min" }
    ]
  },
  {
    id: "6",
    title: "High-Floor 1BR — Murray Hill, City Views",
    priceGross: 3650,
    priceNet: 3300,
    neighborhood: "Murray Hill",
    sqft: 740,
    beds: 1,
    baths: 1,
    latitude: 40.7477,
    longitude: -73.9753,
    isNoFee: true,
    petsAllowed: false,
    availableDate: "2026-07-15",
    description: "Bright corner unit on the 22nd floor with sweeping midtown skyline views. Floor-to-ceiling windows, custom closets, and a spa-caliber bathroom. Full-amenity tower with rooftop lounge.",
    amenities: ["Doorman", "Gym", "Rooftop Lounge", "Laundry In-Unit", "Central AC", "Concierge", "Package Room", "Bike Storage", "Dishwasher"],
    media: {
      photos: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80"
      ],
      matterport: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
      floorplan: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
      povVideo: "https://www.youtube.com/embed/ScMzIvxBSi4"
    },
    transit: [
      { line: "6", type: "subway", distance: "0.2 mi", time: "3 min" },
      { line: "4/5", type: "subway", distance: "0.3 mi", time: "5 min" },
      { line: "7", type: "subway", distance: "0.5 mi", time: "8 min" }
    ]
  },
  {
    id: "7",
    title: "Duplex Garden — Park Slope Brownstone",
    priceGross: 4850,
    priceNet: 4400,
    neighborhood: "Park Slope",
    sqft: 1350,
    beds: 2,
    baths: 2,
    latitude: 40.6681,
    longitude: -73.9800,
    isNoFee: true,
    petsAllowed: true,
    availableDate: "2026-05-20",
    description: "Garden duplex occupying the parlor and garden floors of a landmarked brownstone on a premier Park Slope block. Private garden patio, two full baths, and prewar details throughout.",
    amenities: ["Private Garden", "Laundry In-Unit", "Central AC", "Dishwasher", "Hardwood Floors", "Fireplace", "Storage Unit", "Bike Storage"],
    media: {
      photos: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80"
      ],
      matterport: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
      floorplan: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
      povVideo: "https://www.youtube.com/embed/ScMzIvxBSi4"
    },
    transit: [
      { line: "B/Q", type: "subway", distance: "0.2 mi", time: "4 min" },
      { line: "2/3", type: "subway", distance: "0.4 mi", time: "7 min" }
    ]
  },
  {
    id: "8",
    title: "Sleek Studio — Long Island City, LIC",
    priceGross: 2550,
    priceNet: 2300,
    neighborhood: "Long Island City",
    sqft: 490,
    beds: 0,
    baths: 1,
    latitude: 40.7447,
    longitude: -73.9485,
    isNoFee: false,
    petsAllowed: true,
    availableDate: "2026-06-01",
    description: "Architect-designed studio in a newly constructed building with Manhattan skyline views. Alcove layout sleeps a queen bed plus a work nook. Pool and rooftop lounge included.",
    amenities: ["Doorman", "Gym", "Pool", "Rooftop Deck", "Laundry In-Unit", "Central AC", "Concierge", "Bike Storage"],
    media: {
      photos: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80"
      ],
      matterport: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
      floorplan: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
      povVideo: "https://www.youtube.com/embed/ScMzIvxBSi4"
    },
    transit: [
      { line: "7", type: "subway", distance: "0.1 mi", time: "2 min" },
      { line: "E/M/R", type: "subway", distance: "0.3 mi", time: "5 min" }
    ]
  },
  {
    id: "9",
    title: "Spacious 2BR — Central Harlem Brownstone",
    priceGross: 2750,
    priceNet: 2550,
    neighborhood: "Harlem",
    sqft: 1020,
    beds: 2,
    baths: 1,
    latitude: 40.8116,
    longitude: -73.9465,
    isNoFee: true,
    petsAllowed: true,
    availableDate: "2026-06-15",
    description: "Renovated two-bedroom in a classic Harlem brownstone. Original tin ceilings restored, new hardwood throughout, split-unit AC. One block from Marcus Garvey Park and steps from celebrated dining.",
    amenities: ["Laundry In-Building", "Central AC", "Dishwasher", "Hardwood Floors", "Exposed Brick", "High Ceilings", "Package Room"],
    media: {
      photos: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80"
      ],
      matterport: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
      floorplan: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
      povVideo: "https://www.youtube.com/embed/ScMzIvxBSi4"
    },
    transit: [
      { line: "2/3", type: "subway", distance: "0.2 mi", time: "3 min" },
      { line: "4/5/6", type: "subway", distance: "0.4 mi", time: "7 min" }
    ]
  },
  {
    id: "10",
    title: "Penthouse Loft — DUMBO Cobblestone Block",
    priceGross: 5600,
    priceNet: 5100,
    neighborhood: "DUMBO",
    sqft: 1300,
    beds: 1,
    baths: 2,
    latitude: 40.7033,
    longitude: -73.9890,
    isNoFee: true,
    petsAllowed: true,
    availableDate: "2026-07-01",
    description: "Top-floor penthouse loft in a converted 1890s warehouse on DUMBO's most storied cobblestone block. Unobstructed Manhattan Bridge and East River views from every room. 12-ft exposed timber ceilings.",
    amenities: ["Doorman", "Gym", "Roof Terrace", "Laundry In-Unit", "Central AC", "Concierge", "Storage", "Exposed Timber Beams", "Private Terrace", "Dishwasher"],
    media: {
      photos: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"
      ],
      matterport: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
      floorplan: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
      povVideo: "https://www.youtube.com/embed/ScMzIvxBSi4"
    },
    transit: [
      { line: "A/C/F", type: "subway", distance: "0.2 mi", time: "4 min" },
      { line: "2/3", type: "subway", distance: "0.5 mi", time: "8 min" }
    ]
  }
]
