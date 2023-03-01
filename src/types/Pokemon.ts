import { Resource } from './Resource';

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;

  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: Resource;
  }[];

  forms: Resource[];

  game_indices: {
    game_index: number;
    version: Resource;
  }[];

  held_items: {
    item: Resource;
    version_details: {
      version: Resource;
      rarity: number;
    }[];
  }[];

  location_area_encounters: string;

  moves: {
    move: Resource;
    version_group_details: {
      move_learn_method: Resource;
      version_group: Resource;
      level_learned_at: number;
    }[];
  }[];

  past_types: {
    generation: Resource;
    types: {
      slot: number;
      type: Resource;
    }[];
  }[];

  sprites: {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
  };

  species: Resource;
  stats: {
    stat: Resource;
    effort: number;
    base_stat: number;
  }[];

  types: {
    slot: number;
    type: Resource;
  }[];
}
