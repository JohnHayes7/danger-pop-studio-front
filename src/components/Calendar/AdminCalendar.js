import {React, useEffect, useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import './admincalendarcss.css'
import Nav from '../Nav/Navbar'
import FullScreen from '../Fullscreen/Fullscreen'
import '../Fullscreen/fullscreencss.css'
import RedirectToLogin from '../Utilites/RedirectToLogin'
import { Link, useHistory } from 'react-router-dom'
import '../Toggle/togglecss.css'
import URL from '../Utilites/Url'

const localizer = momentLocalizer(moment)

const AdminCalendar = props => {
  
  let apptsList = []

  // const URL =  "https://danger-pop-api.herokuapp.com"

  const history = useHistory()

  const [projects, setProjects] = useState([])
  const [showFullProject, setShowFullProject] = useState(false)
  const [showFullRequest, setShowFullRequest] = useState(false)
  const [selectedProject, setSelectedProject] = useState({})
  const [selectedRequest, setSelectedRequest] = useState({})
  const [appointments, setAppointments] = useState([])
  const [backupRequests, setBackupRequests] = useState([])
  const [showBackups, setShowBackups] = useState(false)
  // const [clickedId, setClickedId] = useState("")

  useEffect(() =>{
    // NEEDS A REFACTOR TO UTILITES
    axios.get(URL +'/logged_in', {withCredentials: true})
    .then(response => {
      if(response.data.user.data.attributes.administrator){
        getProjects()
        getAppointments()
        getTattooRequests()
      }else{
        alert('You are not authorized to view this page')
        history.push('/')
      }  
    })
    .catch(error => RedirectToLogin())
  }, [])

  const getProjects = () => {
    axios.get(URL + '/projects', {withCredentials: true})
    .then(response =>{
        setProjects(response.data.data)
        // getAppointmentsFromProjects()
    })
  }

  const getAppointments = () => {
    axios.get(URL + '/appointments', {withCredentials: true})
    .then (response => setAppointments(response.data.data))
  }

  const getTattooRequests = () => {
    axios.get(URL + '/tattoo_requests', {withCredentials: true})
    .then(response =>{
      let backups = response.data.data.filter(tr => tr.attributes.backup_project === true)
      setBackupRequests(backups)
    })
  }

  const parseAppointments = () =>{
    appointments.map(appt => {
      // debugger
      const apptInfo = {
        projectId: appt.attributes.project.id,
        title: appt.attributes.project.title,
        start: apptStart(appt.attributes.date, appt.attributes.time, appt.attributes.daypart),
        end: apptEnd(appt.attributes.date, appt.attributes.time, appt.attributes.length_time, appt.attributes.daypart)
      }
      apptsList = [...apptsList, apptInfo]
    })
  }

  const apptStart = (date, time, daypart) => {
    const dateAry = date.split("/")
    let monthIndex = parseInt(dateAry[0]) - 1
    let day = parseInt(dateAry[1])
    let year = parseInt(dateAry[2])
    let hour = parseInt(time.split(":")[0])
    let min = parseInt(time.split(":")[1])
    if(daypart === "PM"){
        hour +=12
    }
   
    return new Date(year, monthIndex, day, hour, min)
    // return null
  }

  const apptEnd = (date, time, length, daypart) => {
    const dateAry = date.split("/")
    let monthIndex = parseInt(dateAry[0]) - 1
    let day = parseInt(dateAry[1])
    let year = parseInt(dateAry[2])
    let lengthInt = parseInt(length.split(" "))
    let hour = parseInt(time.split(":")[0]) + lengthInt
    let min = parseInt(time.split(":")[1])
    if(daypart === "PM"){
        hour +=12
    }
    
    return new Date(year, monthIndex, day, hour, min)
  }


  const parseIncompleteProjects = () =>{
    let incompleteProjects = projects.filter(p => p.attributes.project_complete_status === null)
    return(
      <div className="flex">{incompleteProjects.map(p => <div key={p.id} id={p.id} dataid={p.id} onClick={e=>clickHandler(e)} className='project'>Project ID:<div className="id-icon">{p.id}<Link to={`/projects/${p.id}`}><img className="forward-icon" src="/forward-icon.png" /></Link></div><div>Client Name: {p.attributes.user.name}</div><div>Description:{p.attributes.tattoo_request.description}</div></div>)}</div>
    )
  }

  const parseBackups = () =>{
    debugger
    return <div className="flex">{backupRequests.map(bu  => <div key={bu.id} id={bu.id} dataid={bu.id} className='project'><div>TR ID: {bu.id}</div><div>Client Name: {bu.attributes.guest_full_name}</div><div>Description: {bu.attributes.description}</div><div class="a-and-s-button" onClick={e  => findSelectedRequest(e)}>More Info and Scheduling Options</div></div> )}</div>
  }

  const findSelectedProject = (id) =>{
    let proj = projects.find(p => p.id === id)
    setSelectedProject(proj)
  }

  const findSelectedRequest = (e) =>{
    let selectedId = e.target.parentElement.id
    let req = backupRequests.find(bu => bu.id === selectedId)
    setSelectedRequest(req)
    setShowFullRequest(true)
  }


  const clickHandler = (e) =>{
    if(!!e.projectId){
      
      findSelectedProject(e.projectId.toString())
    }else{
      
      findSelectedProject(e.currentTarget.id)
    }
    setShowFullProject(true)
  }

  

  const toggleFullProject = () => setShowFullProject(!showFullProject)
  const toggleFullRequest = () => setShowFullRequest(!showFullRequest)
  

  const nextProject = () => {
    let nextId = parseInt(selectedProject.id) + 1
    findSelectedProject(nextId.toString())
  }

  const previousProject = () =>{
    let prevId = parseInt(selectedProject.id ) - 1
    findSelectedProject(prevId.toString())
  }

  const ToggleButton = () => {
    return(
        <div id="toggle-button" className={`wrg-toggle ${showBackups ? 'wrg-toggle--checked' : ''}`}onClick={triggerToggle}>
            <div className="wrg-toggle-container">
                <div className="wrg-toggle-check">
                    <span>Yes</span>
                </div>
                <div className="wrg-toggle-uncheck">
                    <span>No</span>
                </div>
            </div>
            <div className="wrg-toggle-circle"></div>
            <input className="wrg-toggle-input" type="checkbox" aria-label="Toggle Button" />
        </div>
    )
}

  

  const triggerToggle = () =>{
      setShowBackups(!showBackups)
  }

  parseAppointments()
  return(
    <div>
        <Nav />
        <div className='title-description'>Projects to Be Scheduled:</div>
        Show Backup Projects? {ToggleButton()}
        <div className="to-be-scheduled">
          {showBackups ? parseBackups() : parseIncompleteProjects()}
        </div><br></br>
        {showFullProject ? <FullScreen type="project" project={selectedProject} toggle={toggleFullProject}  next={nextProject} previous={previousProject}/> : null}
        {showFullRequest ? <FullScreen type="request" project={selectedRequest} toggle={toggleFullRequest} /> : null}
        <Calendar
          localizer={localizer}
          events={apptsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          onSelectEvent={e => clickHandler(e)}
        />
      </div>
    )
}

export default AdminCalendar