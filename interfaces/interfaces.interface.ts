export interface INavLinks {
  title: string;
  link: string;
  icon: string[];
}

export interface ILocationsData {
  place_id: number;
  display_name: string;
}

export interface ILocationAdress {
  address: {
    road: string;
    postcode: string;
    town: string;
    country: string;
  };
}

export interface ICountriesData {
  name: {
    common: string;
  };
}

export interface IMeal {
  recipe: {
    cuisineType: string[];
    label: string;
    image: string;
    uri: string;
  };
}

export interface IMeals {
  hits: IMeal[];
}

export interface ICuisineType {
  id: number;
  cuisineType: string;
  icon: string;
}

export interface IDropdownOptions {
  id: number;
  text: string;
}

export interface IProductCategories {
  category: string;
  text: string;
  img: string;
}

export interface IProduct {
  id: number;
  category: string;
  description?: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
  title?: string;
}

interface IIngredient {
  foodId: string;
  text: string;
}

export interface ISingleMeal {
  recipe: {
    cuisineType: string[];
    label: string;
    image: string;
    ingredients?: IIngredient[];
    uri: string;
  };
}

export interface IFakeStoreCategories {
  id: number;
  category: string;
  icon: string;
}

export interface ISelectedCategory {
  index: number;
  img: string;
  text: string;
  category: string;
}

export interface IProductModalProps {
  id: string | number;
  label: string;
  img: string;
}

export interface IMealModalProps extends IProductModalProps {
  ingredients: IIngredient[];
}
export type ModalProps = IMealModalProps | IProductModalProps;

export interface ICartProduct {
  id: string | number;
  label: string;
  img: string;
  price: number;
  quantity?: number;
}

export interface IItem {
  category: string;
  label: string;
  img: string;
}
