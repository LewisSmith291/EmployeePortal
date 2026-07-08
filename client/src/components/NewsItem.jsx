import './newsItem.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Cross from "../assets/cross.svg"
import Tick from "../assets/tick.svg"

export default function NewsItem({ articleName, articleDate, pending}) {
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(pending);

  function handleNewsLink(){
    navigate("/portal/news/"+articleName, { replace: true });
  }

  return (
    <div id="news-item" onClick={handleNewsLink}>
      <h1>{isPending ? "pending" : "completed"}</h1>
      <img id="pending-icon" className={isPending ? "pending" : "completed"} src={Cross}/>
      <h1 id="news-header" >{articleName} by {articleDate}</h1>
    </div>
  )
}
