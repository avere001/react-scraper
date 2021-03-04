import React, {useState} from "react"

export default function UrlEntry(props) {
    const [currentInput, setCurrentInput] = useState('')

    let {addResult} = props;

    function handleChange(event) {
        setCurrentInput(event.target.value);
    }
    function handleSubmit(event) {
        addResult({'url': currentInput, 'content': "<p>Such content</p>"})
        setCurrentInput('');
        event.preventDefault();
    }

    return <form onSubmit={handleSubmit}>
        <input value={currentInput} onChange={handleChange}/>
    </form>
}