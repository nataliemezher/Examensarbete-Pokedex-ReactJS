
const Search = ({ handleSubmit, onChange,  handleSearchClick}) => {

    return (

        <div className="searchbar"> 
        <form onSubmit={handleSubmit}>
                <input
                    placeholder="search pokemon..."
                    type="text"
                    onChange= {onChange}
                /> 
                <button type="submit" onClick={handleSearchClick}>Search</button>
            </form>
        </div>
       
    )
}

export default Search