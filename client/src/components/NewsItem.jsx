import './newsItem.css'
import { useNavigate } from 'react-router-dom'

export default function NewsItem({ articleName, articleDate }) {
  const navigate = useNavigate();

  function handleNewsLink(){
    navigate("/portal/news/"+articleName, { replace: true });
  }

  return (
    <div id="news-item">
      <h1 id="news-header" onClick={handleNewsLink}>{articleName} by {articleDate}</h1>
    </div>
  )
}
