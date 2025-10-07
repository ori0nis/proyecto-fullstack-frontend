//? Type for new Plants created in the universal repository (MyPlants Nursery)

export interface NewPlant {
  scientific_name: string;
  common_name: string;
  imgPath: string;
  imgPublicUrl: string;
  types: "desert" | "tropical" | "temperate" | "alpine" | "aquatic";
}
