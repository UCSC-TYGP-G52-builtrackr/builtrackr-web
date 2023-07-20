import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "../../CSS/kanbanBoard.css";
import { TodoCard } from '../../components/Card/TodoCard';

export const Todo = (props) =>{
    const [cards, setCards] = useState([]);
    useEffect(() => {
        const fetchCards = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/card/viewcard');
             // Replace with your API endpoint to fetch card data

            if (response.status === 200) {
              setCards(response.data);
            }

          } catch (error) {
            console.error("Error fetching card data:", error);
          }
        };
     fetchCards();
      }, []);

  return (
    <>
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          To do
          <span>{`${cards.length || 0}`}</span>
        </p>
      </div>
      <div className="board_cards custom-scroll">


{cards.map((item) => (
          <TodoCard
            key={item.id}
            card={[item.id ,item.f_name]}
            removeCard={props.removeCard}
            boardId={props.board?.id}
            dragEnded={props.dragEnded}
            dragEntered={props.dragEntered}
            updateCard={props.updateCard}
          />
        ))}
      </div>
    </div>
  </>
  )
}
