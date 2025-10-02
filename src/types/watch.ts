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
  | "resin"
  | "gold"
  | "titanium"
  | "alligator";

  display_type: "analog" | "digital" | "analog-digital";
  movement_type: "automatic" | "manual" | "quartz" | "solar" | "kinetic";

  specs: {
    water_resistance: string;
    case_thickness: number;
    case_diameter: number;
    case_material: string;
    movement: string;
    crystal: string;
  };

  tags: string[];
  images: string[];
  quantity: number;
}
