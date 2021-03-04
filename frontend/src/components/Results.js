import React, {useState} from "react"
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import './Results.css'

export default function Results(props) {
    const [tabIndex, setTabIndex] = useState(0);
    let {scraperResults} = props;
    return <div className="scraper-results">
        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
            <TabList>
                {scraperResults.map((result) => <Tab key={result.url}>{result.url}</Tab>)}
            </TabList>
            {scraperResults.map(result => (
                <TabPanel key={result.url}><textarea readOnly className="result-content" value={result.content} /></TabPanel>
            ))}
        </Tabs>
    </div>
}

