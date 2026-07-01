import '../portal.css'
import Header from '../components/Header.jsx'
import NewsItem from '../components/NewsItem.jsx'
import AdminBar from '../components/AdminBar.jsx'

function PortalPage({ currentUser, onLogout }) {
  return (
    <div>
      <Header onLogout={onLogout}/>
      {currentUser.role === "admin" && <AdminBar currentUser={currentUser}/>}
      <h1>Welcome, {currentUser.firstName} {currentUser.lastName}</h1>
      <div id="news-container">
        <h1>News</h1>
        <NewsItem articleName="Example News Item" articleDate="24/10/2026"></NewsItem>
        <NewsItem articleName="You need to sign something" articleDate="19/11/2026"></NewsItem>
      </div>
    </div>
  );
}

export default PortalPage;
