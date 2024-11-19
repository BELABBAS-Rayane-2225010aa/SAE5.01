import { Shop } from "../../../models/shop";
import { ShopRepository } from "../../repository/ShopRepository";

export class ShopGet {
  async get(): Promise<Shop[]> {
    try {
      const shops: Shop[] = await ShopRepository.getShops() as Shop[];
      return shops;
    } catch (error) {
      console.error("Error in shopsHandler:", error);
      throw error;
    }
  }
}