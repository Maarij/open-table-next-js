import Header from "@/app/components/Header";
import RestaurantCard from "@/app/components/RestaurantCard";
import {Cuisine, Location, PRICE, PrismaClient, Review} from "@prisma/client";

export interface RestaurantCardType {
  id: number,
  name: string,
  main_image: string,
  cuisine: Cuisine,
  location: Location,
  price: PRICE,
  slug: string,
  reviews: Review[]
}

const prisma = new PrismaClient();

const fetchRestaurants = (): Promise<RestaurantCardType> => {
  return prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true
    }
  });
}

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} />
        ))}
      </div>
    </main>
  )
}
