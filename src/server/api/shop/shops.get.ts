import { Shop } from "../../../models/shop";
import { ShopRepository } from "../../repository/ShopRepository";

export default async function handler(): Promise<Shop[]> {
  try {
    const shops = await ShopRepository.getShops() as Shop[];
    return shops;
  } catch (error) {
    throw error;
  }
}