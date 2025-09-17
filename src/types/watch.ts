export interface Watch {
  id: number;
  brand: string;
  model: string;
  price: number;

  case_diameter: number;
  case_thickness: number;
  case_material: string;

  strap_material:
  | "steel"
  | "leather"
  | "rubber"
  | "fabric"
  | "synthetic"
  | "resin"
  | "gold"
  | "titanium"
  | "alligator";

  display_type: "analog" | "digital" | "analog-digital";
  movement_type: "automatic" | "manual" | "quartz" | "solar" | "kinetic";

  tags: string[];
  images: string[];
  quantity: number;
}
