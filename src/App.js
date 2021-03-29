import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import AdminPortal from './components/AdminPortal'
import AdminAllUsers from './components/AdminAllUsers'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/admin" component={AdminPortal} />
        <Route exact path="/admin/users" component={AdminAllUsers} />
      </div>
    </Router>
  );
}

export default App;
