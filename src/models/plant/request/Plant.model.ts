//? Mapping of the Plant mongoose document

export interface Plant {
  _id: string;
  scientific_name: string;
  common_name: string;
  imgPath: string;
  imgPublicUrl: string;
  types: "desert" | "tropical" | "temperate" | "alpine" | "aquatic";
}
