import { Shop } from "../../../models/shop";
import { ShopRepository } from "../../repository/ShopRepository";

export class ShopUpdate {
  async update(updateShops : Shop[]): Promise<Shop[]> {
    try {
      const shops: Shop[] = await ShopRepository.updateShop(updateShops) as Shop[];
      return shops;
    } catch (error) {
      console.error("Error in shopsHandler:", error);
      throw error;
    }
  }
}