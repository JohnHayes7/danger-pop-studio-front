import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import AdminPortal from './components/AdminPortal'
import AdminUsers from './components/AdminUsers'
import AdminAppointments from './components/AdminAppointments'
import AdminProjects from './components/AdminProjects'
import AdminTattooRequests from './components/AdminTattooRequests'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/admin" component={AdminPortal} />
        <Route exact path="/admin/users" component={AdminUsers} />
        <Route exact path="/admin/appts" component={AdminAppointments} />
        <Route exact path="/admin/projects" component={AdminProjects} />
        <Route exact path="/admin/tattoo-requests" component={AdminTattooRequests} />
      </div>
    </Router>
  );
}

export default App;
