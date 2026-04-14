export type ProductCategory =
  | "Aluminum Products"
  | "Shop Fitting"
  | "Office Supplies"
  | "PPE and Hygiene"
  | "Cold Rooms"
  | "Ice";

export type Retailer = "Takealot" | "Makro";

export type CatalogueProduct = {
  id: string;
  title: string;
  category: ProductCategory;
  retailer: Retailer;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  image: string;
  href: string;
};

export const catalogueProducts: CatalogueProduct[] = [
  {
    id: "1",
    title: "Morphy Richards Brushed Stainless Steel 4 Slice Bread Toaster Stylish",
    category: "Kitchen Appliance",
    retailer: "Takealot",
    price: 984,
    originalPrice: 1600,
    rating: 4.7,
    reviews: 9,
    image: "/stuff/t-5.jpg",
    href: "https://www.takealot.com/morphy-richards-brushed-stainless-steel-4-slice-bread-toaster-st/PLID101253896",
  },
  {
    id: "2",
    title: "Whirlpool FFB8248SBVSA Washing Machine Front Loader 8kg - Silver",
    category: "Kitchen Appliance",
    retailer: "Takealot",
    price: 229,
    rating: 4.3,
    reviews: 39,
    image: "/stuff/t-1.jpg",
    href: "https://www.takealot.com/whirlpool-ffb8248sbvsa-washing-machine-front-loader-8kg-silver/PLID96019600",
  },
  {
    id: "3",
    title: "Samsung 40L Solo Microwave Oven Black MS40DG5504AGFA",
    category: "Kitchen Appliance",
    retailer: "Takealot",
    price: 1299,
    originalPrice: 1499,
    rating: 4.1,
    reviews: 2,
    image: "/stuff/t-6.jpg",
    href: "https://www.takealot.com/samsung-40l-solo-microwave-oven-black-ms40dg5504agfa/PLID96200838",
  },
  {
    id: "4",
    title: "Hisense 8L Air Fryer with Digital Touch Control & Visible Cooking Window",
    category: "Kitchen Appliance",
    retailer: "Takealot",
    price: 249,
    originalPrice: 599,
    rating: 3.9,
    reviews: 23,
    image: "/stuff/t-2.jpg",
    href: "https://www.takealot.com/hisense-8l-air-fryer-with-digital-touch-control-visible-cooking/PLID93907356",
  },
  {
    id: "5",
    title: "Nespresso Gran Lattissima Coffee Machine",
    category: "Kitchen Appliance",
    retailer: "Takealot",
    price: 4999,
    originalPrice: 5799,
    rating: 4.5,
    reviews: 11,
    image: "/stuff/t-7.jpg",
    href: "https://www.takealot.com/nespresso-gran-lattissima-coffee-machine/PLID69482609",
  },
  
  {
    id: "7",
    title: "Hisense 13 Place Dishwasher with LED Display - Silver",
    category: "Kitchen Appliance",
    retailer: "Takealot",
    price: 299,
    rating: 4.2,
    reviews: 8,
    image: "/stuff/t-4.jpg",
    href: "https://www.takealot.com/hisense-13-place-dishwasher-with-led-display-silver/PLID91633473",
  },
  
];