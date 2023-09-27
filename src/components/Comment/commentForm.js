import React ,{useState} from 'react';
import "./comment.css"

export const CommentForm = ({handleSubmit,submitLabel}) => {

const [text, setText] = useState('');
const isTextareaDisabled = text.length === 0;
const onSubmit  = event => {
    event.preventDefault();
    handleSubmit(text);
    setText('');
}
//after submit send data o datbase with cardid

  return (
    <div>
        <form onSubmit={onSubmit}>
            <textarea  className ="comment-form-textarea" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="comment-form-button" type="submit" disabled = {isTextareaDisabled}>Submit</button>
        </form>
    </div>
  )
}
