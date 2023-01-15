
const Search = ({onChange}) => {
    return (
        <div className="searchbar"> 
                <input
                    placeholder="search pokemon..."
                    type="text"
                    onChange= {onChange}
                /> 
        </div>
    )
}

export default Search