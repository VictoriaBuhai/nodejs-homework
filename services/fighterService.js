import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAllFighters() {
    try {
      const fighters = fighterRepository.getAll();
      if (fighters) return fighters;
    } catch (error) {
      throw Error("Fighters not found");
    }
  }

  getFighter(data) {
    try {
      const fighter = fighterRepository.getOne(data);
      if (fighter) return fighter;
    } catch (error) {
      throw Error("Fighters not found");
    }
  }

  createFighter(fighterData) {
    try {
      const fighter = fighterRepository.create(fighterData);
      if (fighter) return fighter;
    } catch (error) {
      throw Error("Fighters don't saved");
    }
  }

  updateFighter(id, data) {
    try {
      const fighter = fighterRepository.update(id, data);
      if (fighter) return fighter;
    } catch (error) {
      throw Error("Something went wrog... Fighter don't update");
    }
  }

  deleteFighter(id) {
    try {
      const fighter = fighterRepository.delete(id);
      return fighter;
    } catch (error) {
      throw Error("Something went wrong... Fighter don't deleted");
    }
  }
}

const fighterService = new FighterService();

export { fighterService };
