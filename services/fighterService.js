import { FighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  search(search) {
    const item = FighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAllFighters() {
    try {
      const fighters = FighterRepository.getAll();
      if (fighters) return fighters;
    } catch (error) {
      throw Error("Fighters not found");
    }
  }

  getFighter(data) {
    try {
      const fighter = FighterRepository.getOne(data);
      if (fighter) return fighter;
    } catch (error) {
      throw Error("Fighters not found");
    }
  }

  createFighter(fighterData) {
    try {
      const fighter = FighterRepository.create(fighterData);
      if (fighter) return fighter;
    } catch (error) {
      throw Error("Fighters don't saved");
    }
  }

  updateFighter(id, data) {
    try {
      const fighter = FighterRepository.update(id, data);
      if (fighter) return fighter;
    } catch (error) {
      throw Error("Something went wrog... Fighter don't update");
    }
  }

  deleteFighter(id) {
    try {
      const fighter = FighterRepository.delete(id);
      return fighter;
    } catch (error) {
      throw Error("Something went wrong... Fighter don't deleted");
    }
  }
}

const fighterService = new FighterService();

export { fighterService };
