import '../portal.css'
import Header from '../components/Header.jsx'
import NewsItem from '../components/NewsItem.jsx'
import AdminBar from '../components/AdminBar.jsx'
import { useState } from 'react'

function PortalPage({ currentUser, onLogout }) {
  const [newsItems, setNewsItems] = useState([]);

  return (
    <div>
      <Header onLogout={onLogout}/>
      {currentUser.role === "admin" && <AdminBar currentUser={currentUser}/>}
      <h1>Welcome, {currentUser.firstName} {currentUser.lastName}</h1>
      <div id="news-container">
        <h1>News</h1>
        <ul>
          
          {newsItems.map((item) => (
            <li>{item.articleName}</li>
          ))}
          <NewsItem articleName="Example News Item" articleDate="24/10/2026" pending={true} description={"This is a very brief description of the news item"}></NewsItem>
          <NewsItem articleName="You need to sign something" articleDate="19/11/2026" pending={false} description={"This is a suuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuper long description about the news item that should trigger an overflow"}></NewsItem>
        </ul>
      </div>
    </div>
  );
}

export default PortalPage;
