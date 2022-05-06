import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "All"
  },
  {
    _id: uuid(),
    categoryName: "Valorant"
  },
  {
    _id: uuid(),
    categoryName: "GTA 5"
  },
  {
    _id: uuid(),
    categoryName: "CS GO"
  }, {
    _id: uuid(),
    categoryName: "BGMI"
  },
];
