import React, {useState} from "react"

export default function UrlEntry(props) {
    const [currentInput, setCurrentInput] = useState('')

    let {addResult} = props;

    function handleChange(event) {
        setCurrentInput(event.target.value);
    }

    function handleSubmit(event) {
        let url = new URL('http://localhost:5000/website')
        url.search = new URLSearchParams({url: currentInput}).toString()

        fetch(url).then((response) => {
            if (!response.ok) {
                response.json().then((data) => {
                    console.log(data)
                })
            } else {
                response.json().then((data) => addResult(data))
            }}
        )
        // addResult({'url': currentInput, 'content': "<p>Such content</p>"})
        setCurrentInput('');
        event.preventDefault();
    }

    return <form onSubmit={handleSubmit}>
        <input value={currentInput} onChange={handleChange}/>
    </form>
}