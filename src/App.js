import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import AdminPortal from './components/AdminPortal'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/admin" component={AdminPortal} />
      </div>
    </Router>
  );
}

export default App;
