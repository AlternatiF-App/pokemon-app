import React, {useState, useEffect} from 'react';
import './App.css';
import {getAllPokemon, getPokemon} from './services/pokemon';
import Card from './components/card/card';
import Navbar from './components/navbar/navbad';

function App() {
    const [pokemonData, setPokemonData] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextUrl, setNextUrl] = useState('')
    const [prevUrl, setPrevUrl] = useState('')
    const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon/')

    useEffect(() => {
        async function fetchData() {
            let res = await getAllPokemon(currentUrl);
            setNextUrl(res.next);
            setPrevUrl(res.previous);
            setLoading(false)
            await loadingPokemon(res.results);
            console.log(res.results)
        }
        fetchData();
    }, [])

    const next = async () => {
        setLoading(true);
        let data = await getAllPokemon(nextUrl)
        await loadingPokemon(data.results)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
        setLoading(false);
    }

    const prev = async () => {
        if(!prevUrl) return;
        setLoading(true);
        let data = await getAllPokemon(prevUrl)
        await loadingPokemon(data.results)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
        setLoading(false);
    }

    const loadingPokemon = async data => {
        let _pokemonData = await Promise.all(
            data.map(async pokemon => {
            let pokemonRecord = await getPokemon(pokemon.url);
            return pokemonRecord
        }))
        console.log(pokemonData);

        setPokemonData(_pokemonData)
    }

    return(
    <div>
        {  
            loading ? <h1>Loading ...</h1> : (
                <>
                    <Navbar/>
                    <div className="btn">
                        <button onClick={prev}>Prev</button>
                        <button onClick={next}>Next</button>
                    </div>
                    <div className="grid-container">
                        {pokemonData.map((pokemon, i) => {
                            return <Card keu={i} pokemon={pokemon}/>
                        })}
                    </div>
                </>
            )
        }
    </div>
    )
}

export default App;