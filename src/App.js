import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import AdminPortal from './components/AdminPortal'
import AdminAllUsers from './components/AdminAllUsers'
import AdminAllAppointments from './components/AdminAllAppointments'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/admin" component={AdminPortal} />
        <Route exact path="/admin/users" component={AdminAllUsers} />
        <Route exact path="/admin/appts" component={AdminAllAppointments} />
      </div>
    </Router>
  );
}

export default App;
