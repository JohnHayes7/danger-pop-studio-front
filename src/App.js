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
import SignIn from './components/User/SignIn';
import CreateUser from './components/User/CreateUser';
import UserProfilePage from './components/User/UserProfilePage';
import AdminCalendar from './components/Calendar/AdminCalendar'
import UserSignout from './components/User/UserSignOut'
import PasswordReset from './components/User/PasswordReset'
// import LoginUser from './components/User/LoginUser';
// require('dotenv').config()

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home}/>
        <Route exact path="/admin" component={AdminPortal} />
        <Route exact path="/admin/users" component={AdminUsers} />
        {/* <Route exact path="/admin/appts" component={AdminAppointments} /> */}
        <Route exact path ="/admin/calendar" component={AdminCalendar} />
        <Route exact path="/admin/projects" component={AdminProjects} />
        <Route path="/projects/:id" component={Project} />
        <Route exact path="/admin/tattoo-requests" component={AdminTattooRequests} />
        <Route exact path="/tattoo-requests" component={TattooRequestForm} />
        <Route exact path="/tattoo-requests/success" component={TattooRequestSuccess}/>
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-out" component={UserSignout} />
        <Route exact path ="/users/:id" component={UserProfilePage} />
        <Route exact path="/create-profile" component={CreateUser} />
        <Route exact path="/password-reset" component={PasswordReset} />
       
        {/* <Route exact path="/login" component={LoginUser} /> */}
        
      </div>
    </Router>
  );
}

export default App;
