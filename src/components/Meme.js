import React from "react"
//import memesData from "../memesData"

export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {

        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        
        getMemes();

        /* 
        optional clean function
         useEffect takes a function as its parameter. If that function
        returns something, it needs to be a cleanup function. Otherwise,
        it should return nothing. If we make it an async function, it
        automatically retuns a promise instead of a function or nothing.
        Therefore, if you want to use async operations inside of useEffect,
        you need to define the function separately inside of the callback
        function, as seen below:
        
        return () => {

        } 
        */

    }, [])

    

    // Generates a new image based on a ranom number
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length) // Generartes a random numer between 0 and the length of the array
        const url = allMemes[randomNumber].url // Sets the image ur
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]:value
        }))

    }

    return (
        <main className="main-content">
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    onChange={handleChange}
                    name="topText"
                    value={meme.topText}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={handleChange}
                    name="bottomText"
                    value={meme.bottomText}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" alt="Funny meme" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}