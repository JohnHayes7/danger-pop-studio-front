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
import Home from './components/Home/Home'
import TattooRequestForm from './components/TattooRequests/TattooRequestForm'
import TattooRequestSuccess from './components/TattooRequests/TattooRequestSuccessful';
import Project from './components/Projects/Project';
// require('dotenv').config()

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home}/>
        <Route exact path="/admin" component={AdminPortal} />
        <Route exact path="/admin/users" component={AdminUsers} />
        <Route exact path="/admin/appts" component={AdminAppointments} />
        <Route exact path="/admin/projects" component={AdminProjects} />
        <Route path="/projects/:id" component={Project} />
        <Route exact path="/admin/tattoo-requests" component={AdminTattooRequests} />
        <Route exact path="/tattoo-requests" component={TattooRequestForm} />
        <Route exact path="/tattoo-requests/success" component={TattooRequestSuccess}/>
        
      </div>
    </Router>
  );
}

export default App;
