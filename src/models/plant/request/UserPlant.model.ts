//? Type for new UserPlants, plants that come from the universal repository (MyPlants Nursery) and allow for user's customized name

export interface UserPlant {
  _id: string;
  userId: string;
  plantId: string;
  nameByUser: string;
  scientific_name: string;
  imgPath: string;
  imgPublicUrl: string;
}
