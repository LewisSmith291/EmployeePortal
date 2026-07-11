import './newsItem.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Cross from "/images/cross.svg"
import Tick from "/images/tick.svg"

export default function NewsItem({ articleName, description, articleDate, pending}) {
  const navigate = useNavigate();

  function handleNewsLink(){
    navigate("/portal/news/"+articleName, { replace: true });
  }

  return (
    <div id="news-item" onClick={handleNewsLink}>
      <h1 className="pending-grid-cell">{pending ? "pending" : "completed"}</h1>
      <div className="icon-grid-cell"><img id="pending-icon" className={pending ? "pending" : "completed"} src={pending ? Cross : Tick}/></div>
      <h1 className="title-grid-cell">{articleName}</h1>
      <h1 className="description-grid-cell">{description}</h1>
      <h1 className="date-grid-cell">{articleDate}</h1>
    </div>
  )
}
