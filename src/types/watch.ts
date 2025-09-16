export interface Watch {
  id: number;
  brand: string;
  model: string;
  price: number;
  strap_material:
    | "steel"
    | "leather"
    | "rubber"
    | "fabric"
    | "synthetic"
    | "resin";
  display_type: "analog" | "digital" | "analog-digital";
  tags: string[];
  images: string[];
  quantity: number;
}
