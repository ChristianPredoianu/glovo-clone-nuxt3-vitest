export interface IMealCardProps {
  recipe: {
    cuisineType: string[];
    label: string;
    image: string;
    category?: string;
  };
  price: number;
}
