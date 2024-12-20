export interface IMeal {
  price: number;
  recipe: {
    cuisineType: string[];
    label: string;
    image: string;
    uri: string;
  };
}
