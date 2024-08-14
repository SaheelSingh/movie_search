import { useState } from 'react';
import './App.css';

function App() {

  const [endpoint, setEndPoint] = useState('')
  const [container, setContainer] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchME() {
    setLoading(true)
    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${endpoint}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd3c03b116fmshf511e570a68ddbep1153d3jsnc50d7676ac00',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setLoading(false)
      setContainer(data.d)
      console.log(data.d)
    } catch (error) {
      console.log(error)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    fetchME()
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input value={endpoint} onChange={(e) => setEndPoint(e.target.value)} type='text' />
        <button>Submit</button>
      </form>

      {
        loading === true && (
          <span>Loading...</span>
        )
      }

      {
        !loading && container.map(movie => {
          return (
            <div key={movie ? movie.id : ""}>
              <img src={movie ? movie.i.imageUrl : ""} alt='movie_image' />
              <p>{movie ? movie.l : ""}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
