const Card = ({p}) => {
    return (
        <div key={p.id} className={`pokemon-card ${p.types[0].type.name}`} >
                <h2 className='pokemon-title' key={p.id}> {p.name} - #{p.id}  </h2>
                <span className="hp">  ❤️={p.stats[0].base_stat} </span> <span className="attack"> 🗡️={p.stats[1].base_stat} </span>
                <div className="pokemon-img"><img src={p.sprites.front_default} alt="pokemon-img"  />  </div>
                {/* {p.sprites.other.dream_world.front_default} */}
                <div className='pokemon-details'>
                    <div className='pokemon-weight' > <div className='weight-title'> Weight:  </div> <div> {p.weight}</div></div>
                    <div className='pokemon-height'> <div className='height-title'>Height:  </div> <div> {p.height} </div>   </div>
                    <div className='pokemon-type'> <div className='type-title'> Type:</div> <div className="types-list">{p.types.map((t) => {
                         return(
                             <li key={t.slot}>{t.type.name}</li>
                         )
                     })} </div> </div>
                    <div className='pokemon-abilities'> <div className='abilities-title'>Abilities:</div> <div className="abilities-list">{p.abilities.map((a) => {
                  return <li key={a.slot}>{a.ability.name} </li>;
                })} </div> </div>
                </div>
            </div>
    )
}

export default Card;