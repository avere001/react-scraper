import React from "react"
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import './Results.css'

export default function Results(props) {
    let {scraperResults} = props;
    return <div className="scraper-results">
        <Tabs>
            <TabList>
                {scraperResults.map((result) => <Tab key={result.url}>{result.url}</Tab>)}
            </TabList>
            {scraperResults.map(result => (
                <TabPanel><textarea className="result-content" value={result.content} /></TabPanel>
            ))}
        </Tabs>
    </div>
}

