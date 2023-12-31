import RestaurantNavBar from "@/app/restaurant/[slug]/components/RestaurantNavBar";
import Menu from "@/app/restaurant/[slug]/components/Menu";
import {PrismaClient} from "@prisma/client";

const  prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      Item: true
    }
  })

  return restaurant.Item;
}

export default async function RestaurantMenu({params}: {params: {slug: string}}) {
  const menu = await fetchRestaurantMenu(params.slug);

  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug}/>
        <Menu menu={menu}/>
      </div>
    </>
  )
}