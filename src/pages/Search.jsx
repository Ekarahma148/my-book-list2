import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

function Search() {
    const [books, setBooks] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // Fetch data dari file JSON
    useEffect(() => {
        fetch("/data/books.json")
            .then((response) => response.json())
            .then((data) => setBooks(data));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredBooks = books.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredBooks);
    };

    return (
        <div>
            <button onClick={() => setShowSearch(!showSearch)}>
                <FiSearch size={24} />
            </button>
            {showSearch && (
                <form onSubmit={handleSearch} style={{ marginTop: "10px" }}>
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            )}
            <div>
                {results.map((book) => (
                    <div key={book.id}>
                        <h3>{book.title}</h3>
                        <img src={book.image} alt={book.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
