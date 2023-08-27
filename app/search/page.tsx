import Header from "@/app/search/components/Header";
import SearchSideBar from "@/app/search/components/SearchSideBar";
import RestaurantCard from "@/app/search/components/RestaurantCard";
import {PRICE, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

interface SearchParams {city: string, cuisine: string, price: PRICE}

const fetchRestaurantsByCity = (searchParams: SearchParams) => {
  const where: any = {};

  if (searchParams.city) {
    where.location = {
      name: {
        equals: searchParams.city.toLowerCase()
      }
    };
  }
  if (searchParams.cuisine) {
    where.cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase()
      }
    };
  }
  if (searchParams.price) {
    where.price = {
      equals: searchParams.price
    };
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true
  };

  return prisma.restaurant.findMany({
    where,
    select
  });
}

const fetchLocations = async () => {
  return prisma.location.findMany();
}

const fetchCuisines =async () => {
  return prisma.cuisine.findMany()
}

export default async function Search({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const restaurants = await fetchRestaurantsByCity(searchParams);

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar locations={await fetchLocations()} cuisines={await fetchCuisines()} searchParams={searchParams}/>
        <div className="w-5/6">
          {restaurants.length
            ? restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
            ))
            : <p>Sorry, we found no restaurants in this area.</p>}
        </div>
      </div>
    </>
  )
}