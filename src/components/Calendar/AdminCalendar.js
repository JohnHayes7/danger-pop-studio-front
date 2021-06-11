import {React, useEffect, useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import './admincalendarcss.css'
import Nav from '../Nav/Navbar'
import FullScreen from '../Fullscreen/Fullscreen'
import ProjectAppointments from '../Projects/ProjectAppointments'
import '../Fullscreen/fullscreencss.css'

const localizer = momentLocalizer(moment)

const AdminCalendar = props => {

  const [projects, setProjects] = useState([])
  const [showFullScreen, setShowFullScreen] = useState(false)
  const [selectedProject, setSelectedProject] = useState({})
  // const [clickedId, setClickedId] = useState("")

  useEffect(() =>{
    // NEEDS A REFACTOR TO UTILITES
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
      if(response.data.user.data.attributes.administrator){
        getProjects()
      }else{
        alert('You are not authorized to view this page')
      }  
    })
    // .catch(error => redirectToLogin())
  }, [])

  const getProjects = () => {
    axios.get('http://localhost:3001/projects', {withCredentials: true})
    .then(response =>{
        setProjects(response.data.data)
    })
  }

  const parseIncompleteProjects = () =>{
    let incompleteProjects = projects.filter(p => p.attributes.project_complete_status === null)
    return(
      <div className="flex">{incompleteProjects.map(p => <div key={p.id} id={p.id} dataid={p.id} onClick={e=>clickHandler(e)} className='project'>Project ID:{p.id}<div>Client Name: {p.attributes.user.name}</div><div>Description:{p.attributes.tattoo_request.description}</div></div>)}</div>
    )
  }

  const findSelectedProject = (id) =>{
    let proj = projects.find(p => p.id === id)
    setSelectedProject(proj)
  }

  const clickHandler = (e) =>{
    // debugger
    findSelectedProject(e.currentTarget.id)
    setShowFullScreen(true)
  }

  const toggleFullScreen = () =>{
    setShowFullScreen(!showFullScreen)
  }

  

  


  const myEventsList = [
    {
      id: 0,
      title: 'Board meeting',
      start: new Date(2018, 0, 29, 9, 0, 0),
      end: new Date(2018, 0, 29, 13, 0, 0),
      resourceId: 1,
    },
    {
      id: 1,
      title: 'MS training',
      start: new Date(2018, 0, 29, 14, 0, 0),
      end: new Date(2018, 0, 29, 16, 30, 0),
      resourceId: 2,
    },
    {
      id: 2,
      title: 'Team lead meeting',
      start: new Date(2018, 0, 29, 8, 30, 0),
      end: new Date(2018, 0, 29, 12, 30, 0),
      resourceId: 3,
    },
    {
      id: 10,
      title: 'Board meeting',
      start: new Date(2018, 0, 30, 23, 0, 0),
      end: new Date(2018, 0, 30, 23, 59, 0),
      resourceId: 1,
    },
    {
      id: 11,
      title: 'Birthday Party',
      start: new Date(2018, 0, 30, 7, 0, 0),
      end: new Date(2018, 0, 30, 10, 30, 0),
      resourceId: 4,
    },
    {
      id: 12,
      title: 'Board meeting',
      start: new Date(2018, 0, 29, 23, 59, 0),
      end: new Date(2018, 0, 30, 13, 0, 0),
      resourceId: 1,
    },
    {
      id: 13,
      title: 'Board meeting',
      start: new Date(2018, 0, 29, 23, 50, 0),
      end: new Date(2018, 0, 30, 13, 0, 0),
      resourceId: 2,
    },
    {
      id: 14,
      title: 'Board meeting',
      start: new Date(2021, 5, 29, 23, 40, 0),
      end: new Date(2021, 5, 30, 13, 0, 0),
      resourceId: 4,
    },
  ]
  
  const resourceMap = [
    { resourceId: 1, resourceTitle: 'Board room' },
    { resourceId: 2, resourceTitle: 'Training room' },
    { resourceId: 3, resourceTitle: 'Meeting room 1' },
    { resourceId: 4, resourceTitle: 'Meeting room 2' },
  ]

 
  return(
    <div>
        <Nav />
        <div className='title-description'>Projects to Be Scheduled:</div>
        <div className="to-be-scheduled">
          {parseIncompleteProjects()}
        </div><br></br>
        {showFullScreen ? <FullScreen type="project" project={selectedProject} toggle={toggleFullScreen} /> : null}
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
        />
      </div>
    )
}
// const AdminCalendar = () => {
//     return(
//         <div>
//             I AM A CALENDAR
//         </div>
//     )
// }

export default AdminCalendar