import React, { useState, useEffect } from 'react';
import './App.css';

const useImageURL = () => {
  const [imageURL1, setImageURL1] = useState(null);
  const [imageURL2, setImageURL2] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage1 = fetch("https://jsonplaceholder.typicode.com/photos/1", { mode: "cors" })
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Server error!!");
        }
        return response.json();
      });

    const fetchImage2 = fetch("https://jsonplaceholder.typicode.com/photos/2", { mode: "cors" })
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Server error!!");
        }
        return response.json();
      });

    Promise.all([fetchImage1, fetchImage2])
      .then(responses => {
        // Responses es un array donde responses[0] es la respuesta de la primera solicitud y responses[1] la de la segunda
        setImageURL1(responses[0].url);
        setImageURL2(responses[1].url);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));

  }, []);

  return { imageURL1, imageURL2, error, loading };
};

function App() {
  const { imageURL1, imageURL2, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered!</p>;

  return (
    <div>
      <h1>Images</h1>
      {imageURL1 && imageURL2 && (
        <>
          <div>
            <h2>Image 1</h2>
            <img src={imageURL1} alt={"placeholder text"} />
          </div>
          <div>
            <h2>Image 2</h2>
            <img src={imageURL2} alt={"placeholder text"} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
