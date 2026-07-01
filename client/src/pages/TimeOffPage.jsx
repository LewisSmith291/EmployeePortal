import Header from '../components/Header.jsx'
import AdminBar from '../components/AdminBar.jsx'


export default function TimeOffPage({currentUser, onLogout}) {
  return (
    <div>
      <Header onLogout={onLogout}/>
      <AdminBar currentUser={currentUser}/>
    </div>
  )
}
