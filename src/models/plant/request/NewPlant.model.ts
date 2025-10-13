//? Type for new Plants created in the universal repository (MyPlants Nursery)

export interface NewPlant {
  scientific_name: string;
  common_name: string;
  type: "desert" | "tropical" | "temperate" | "alpine" | "aquatic";
  plantImg: File;
}
