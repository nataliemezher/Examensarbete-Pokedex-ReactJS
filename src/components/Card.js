const Card = ({id, hp, attack, name, types, image, weight, height, abilities, typefirstForColor}) => {
    return (
        <div key={id} className={`pokemon-card ${typefirstForColor}`} >
                <h2 className='pokemon-title' key={id}> {name} - #{id}  </h2>
                <span className="hp">  ❤️={hp}  </span> <span className="attack"> 🗡️={attack} </span>
                <div className="pokemon-img"><img src={image} alt="pokemon-img"  />  </div>
                {/* {p.sprites.other.dream_world.front_default} */}
                <div className='pokemon-details'>
                    <div className='pokemon-weight' > <div className='weight-title'> Weight:  </div> <div> {weight}</div></div>
                    <div className='pokemon-height'> <div className='height-title'>Height:  </div> <div> {height} </div>   </div>
                    <div className='pokemon-type'> <div className='type-title'> Type:</div> <div className="types-list">{types}</div> </div>
                    <div className='pokemon-abilities'> <div className='abilities-title'>Abilities: </div> <div className="abilities-list">  {abilities} </div> </div>
                </div>
            </div>
    )
}

export default Card;