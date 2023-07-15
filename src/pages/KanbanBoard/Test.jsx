import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Test = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('/api/card');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  return (
    <div>
      {cards.map((card) => (
        <div key={card.f_name}>
          <h3>{card.f_name}</h3>
         <h2>hi</h2>
        </div>
      ))}
    </div>
  );
};
