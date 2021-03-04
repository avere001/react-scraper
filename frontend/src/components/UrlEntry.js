import React, {useState} from "react"
import "./UrlEntry.css"

export default function UrlEntry(props) {
    const [currentInput, setCurrentInput] = useState('')

    let {addResult} = props;

    function handleChange(event) {
        setCurrentInput(event.target.value);
    }

    function handleSubmit(event) {
        let url = new URL('http://localhost:5000/website')

        let fixedInput = currentInput;
        if (!fixedInput.startsWith('https://') && !fixedInput.startsWith('http://')) {
            fixedInput = `https://${currentInput}`
        }

        url.search = new URLSearchParams({url: fixedInput}).toString()


        fetch(url).then((response) => {
            if (!response.ok) {
                response.json().then((data) => {
                    alert(`There was an issue requesting the content from ${fixedInput}: ${data.message}. See the console for more details.`)
                    console.log(data)
                })
            } else {
                response.json().then((data) => addResult(data))
            }}
        )
        setCurrentInput('');
        event.preventDefault();
    }

    return <form onSubmit={handleSubmit}>
        <input placeholder="Enter a URL." className="url-input" value={currentInput} onChange={handleChange}/>
        <input type="submit" />
    </form>
}