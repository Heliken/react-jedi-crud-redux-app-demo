import {nanoid} from "nanoid";

export const starshipsColumns = [
    'name',
    'length',
    'crew',
    'passengers',
]

export const getStarships = async () => {
    const starshipsResponse = await (await fetch('https://swapi.dev/api/starships')).json();

    return starshipsResponse.results.map(({name, length, crew, passengers}) => ({
        name,
        length,
        crew,
        passengers,
        beloved: false,
        id: nanoid()
    }))
}
