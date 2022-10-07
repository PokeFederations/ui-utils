export const parsePokemonToPartial = (pokemon: any) => ({
    id: pokemon.id,
    name: pokemon.name,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    types: [...pokemon.types.map((type: any) => type.type.name)],
    sprites: [pokemon.sprites.front_default, pokemon.sprites.back_default],
  });

export default parsePokemonToPartial;
 