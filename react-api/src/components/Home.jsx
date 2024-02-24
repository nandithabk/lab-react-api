import React, { useState, useEffect } from "react";
import '../App.css';
import axios from 'axios';

function RenderBooks(props) {
  return (
    <div className="container">
      {props.data.map((e) => (
        <div key={e.id} className="book-card">
          <div className="card-img" style={{ backgroundImage: `url(${e.imageLinks.thumbnail})` }}></div>
          <div className="card-content">
            <h2 className="card-title">{e.title}</h2>
            <h4 className="card-author">
              {e.authors.map((author, i) => (e.authors.length !== i + 1 ? author + ", " : author))}
            </h4>
            <p className="description">{e.description}</p>
          </div>
          <a href={e.previewLink}>
            {" "}
            <button className="card-btn">See More</button>{" "}
          </a>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://reactnd-books-api.udacity.com/books";
      const config = { headers: { Authorization: "whatever-you-want" } };

      try {
        const res = await axios.get(url, config);
        setBooks(res.data.books);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="container">
        <RenderBooks data={books} />
      </div>
    </main>
  );
}