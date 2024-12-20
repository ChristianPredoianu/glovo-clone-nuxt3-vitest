import type { IProductCategories, IFakeStoreCategories } from '@/types/products';
import type { ICuisineType } from '@/types/meals';

export const productCategories: IProductCategories[] = [
  { category: 'Breakfast', text: 'Breakfast', img: 'generic-food.jpg' },
  {
    category: 'Lunch',
    text: 'Lunch',
    img: 'packaged-food.jpg',
  },
  { category: 'Dinner', text: 'Dinner', img: 'generic-meals.jpg' },
  { category: 'Snack', text: 'Snacks', img: 'fast-food.jpg' },
  { category: 'electronics', text: 'Electronics', img: 'electronics.jpg' },
  { category: 'jewelery', text: 'Jewelery', img: 'jewelery.jpg' },
  {
    category: "men's clothing",
    text: "Men's clothing",
    img: 'mens-clothing.jpg',
  },
  {
    category: "women's clothing",
    text: "Women's clothing",
    img: 'womens-clothing.jpg',
  },
];

export const dishTypes = [
  { id: 1, dishType: 'pasta' },
  { id: 2, dishType: 'pizza' },
  { id: 3, dishType: 'salad' },
  { id: 4, dishType: 'sandwiches' },
  { id: 5, dishType: 'seafood' },
];

export const cuisineTypes: ICuisineType[] = [
  { id: 1, cuisineType: 'American', icon: 'fa-burger' },
  { id: 2, cuisineType: 'Asian', icon: 'fa-bowl-food' },
  { id: 3, cuisineType: 'British', icon: 'fa-bowl-rice' },
  { id: 4, cuisineType: 'Caribbean', icon: 'fa-fish' },
  { id: 5, cuisineType: 'Central Europe', icon: 'fa-carrot' },
  { id: 6, cuisineType: 'Chinese', icon: 'fa-egg' },
  { id: 7, cuisineType: 'Eastern Europe', icon: 'fa-drumstick-bite' },
  { id: 8, cuisineType: 'French', icon: 'fa-cheese' },
  { id: 9, cuisineType: 'Indian', icon: 'fa-bone' },
  { id: 10, cuisineType: 'Italian', icon: 'fa-pizza-slice' },
  { id: 11, cuisineType: 'Japanese', icon: 'fa-cookie-bite' },
  { id: 12, cuisineType: 'Kosher', icon: 'fa-plate-wheat' },
  { id: 13, cuisineType: 'Mediterranean', icon: 'fa-pepper-hot' },
  { id: 14, cuisineType: 'Mexican', icon: 'fa-cookie' },
  { id: 15, cuisineType: 'Middle Eastern', icon: 'fa-shrimp' },
  { id: 16, cuisineType: 'South American', icon: 'fa-lemon' },
  { id: 17, cuisineType: 'South East Asian', icon: 'fa-utensils' },
];

export const fakeStoreCategories: IFakeStoreCategories[] = [
  { id: 1, category: 'electronics', icon: 'fa-laptop-medical' },
  { id: 2, category: 'jewelery', icon: 'fa-gem' },
  { id: 3, category: "men's clothing", icon: 'fa-person' },
  { id: 4, category: "women's clothing", icon: 'fa-person-dress' },
];
