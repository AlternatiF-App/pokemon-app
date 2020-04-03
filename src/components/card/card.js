import React from 'react';
import './card.css';

function Card({pokemon}) {
    return(
        <div className="card">
            <div className="card-img">
                <img src={pokemon.sprites.front_default} alt=''/>
            </div>
            <div className="card-name">{pokemon.name}</div>
            {/* <div className="card-types">
                {pokemon.types.map(type => {
                    return <div className="card-types">{type.type.name}</div>
                })}
            </div> */}
        </div>
    )
}

export default Card;