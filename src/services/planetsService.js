import {nanoid} from "nanoid";

export const planetsColumns = [
    'name',
    'diameter',
    'gravity',
    'terrain',
]

export const getPlanets = async () => {
    const planetsResponse = await (await fetch('https://swapi.dev/api/planets')).json();

    return planetsResponse.results.map(({name, diameter, gravity, terrain}) => ({
        name,
        diameter,
        gravity,
        terrain,
        beloved: false,
        id: nanoid()
    }))
}
