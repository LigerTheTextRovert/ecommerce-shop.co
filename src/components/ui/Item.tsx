const watch = {
   brand: "Casio",
   model: "Pro Trek PRW-3500T-7",
   price: 399.99,
   original_price: 449.99,
   discount_percentage: 11,
   strap_material: "titanium",
   display_type: "digital",
   movement_type: "solar",
   specs: {
      water_resistance: "100m",
      case_thickness: 13.5,
      case_diameter: 47,
      case_material: "titanium",
      movement: "tough solar quartz",
      crystal: "sapphire",
   },
   tags: ["outdoor", "abc-sensors", "solar-powered", "titanium", "tough-solar"],
   images: ["casio-protrek-1.jpg", "casio-protrek-2.jpg"],
   quantity: 8,
};

interface ItemProps {
   brand: string;
   model: string;
   price: number;
   original_price?: number;
   discount_percentage?: number;
}
export default function Item({
   brand,
   model,
   price,
   original_price,
   discount_percentage,
}: ItemProps) {
   return (
      <div>
         <h1>{brand}</h1>
         <h1>{model}</h1>
         <h1>{price}</h1>
         <h1>{original_price}</h1>
         <h1>{discount_percentage}</h1>
      </div>
   );
}
