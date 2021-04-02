import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import AdminPortal from './components/Admin/AdminPortal'
import AdminUsers from './components/Admin/AdminUsers'
import AdminAppointments from './components/Admin/AdminAppointments'
import AdminProjects from './components/Admin/AdminProjects'
import AdminTattooRequests from './components/Admin/AdminTattooRequests'


function App() {
  return (
    <Router>
      <div className="App">
        {/* <Route exact path="/" component={Home}/> */}
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
