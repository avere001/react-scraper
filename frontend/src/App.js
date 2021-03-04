import './App.css';
import React, {useState} from "react";
import Results from "./components/Results";
import UrlEntry from "./components/UrlEntry";



function App() {
    const [scraperResults, setScraperResults] = useState([]);

    function addResult(result) {
        setScraperResults((prevResults) => {
            let newResults = prevResults.filter((prevResult) => result.url !== prevResult.url)
            newResults = newResults.map((prevResult) => {
                    return {...prevResult}
                }
            )
            newResults.push(result)
            console.log(newResults)
            return newResults
        })
    }

    return (
        <div className="App">
            <Results scraperResults={scraperResults}/>
            <UrlEntry addResult={addResult}/>
        </div>
    );
}

export default App;
