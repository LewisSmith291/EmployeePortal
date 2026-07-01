import React from 'react'
import './newsItem.css'
import { Router,useNavigate } from 'react-router-dom'
import {useState} from 'react'

export default function NewsItem({articleID, articleName, articleDate}) {
  const navigate = useNavigate();

  const [name, setName] = useState()

  function handleNewsLink(){
    navigate("/portal/news/"+articleName, { replace: true });
  }

  return (
    <div id="news-item">
      <h1 id="news-header" onClick={handleNewsLink}>{articleName} by {articleDate}</h1>
    </div>
  )
}
