const Card = ({id, name, types, image, weight, height, abilities}) => {
    return (
        <div key={id} className={`pokemon-card ${types}`} >
                <h2 className='pokemon-title' key={id}> {name} - {id}  </h2>
                <img src={image} alt="pokemon-img" />  
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