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
  return (
    <div>
        <form onSubmit={onSubmit}>
            <textarea  className ="comment-form-textarea" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="comment-form-button" type="submit" disabled = {isTextareaDisabled}>{submitLabel}</button>
        </form>
    </div>
  )
}
