import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";

function App() {
    const [scraperResults, setScraperResults] = useState([]);

    function addResult(result) {
        console.log("asdasdasd")
        setScraperResults((prevResults) => {
            let newResults = prevResults.map((prevResult) => ({
                    ...prevResult
                }
            ))
            newResults.push(result)
            return newResults
        })
    }

    useEffect(() =>
            addResult({'url': 'https://github.com', 'content': '<h1>WOW</h1>'}),
        [])

    useEffect(() => console.log("WTF"), [])

    return (
        <div className="App">
            {scraperResults.map((result) => (
                <div>
                    <p>{result.url}</p>
                    <div>
                        <pre>{result.content}</pre>
                    </div>
                </div>)
            )}
        </div>
    );
}

export default App;
