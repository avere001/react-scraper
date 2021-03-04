import React from "react"

export default function Results(props) {
    let {scraperResults} = props;
    return scraperResults.map((result) => (
        <div key={result.url}>
            <p>{result.url}</p>
            <textarea value={result.content} />
        </div>)
    )

}