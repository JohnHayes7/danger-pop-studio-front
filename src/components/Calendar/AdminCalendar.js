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
const localizer = momentLocalizer(moment)

const AdminCalendar = props => {
  
  let myEventsList = []

  const [projects, setProjects] = useState([])
  const [showFullScreen, setShowFullScreen] = useState(false)
  const [selectedProject, setSelectedProject] = useState({})
  const [appointments, setAppointments] = useState([])
  // const [clickedId, setClickedId] = useState("")

  useEffect(() =>{
    // NEEDS A REFACTOR TO UTILITES
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
      if(response.data.user.data.attributes.administrator){
        getProjects()
        getAppointments()
      }else{
        alert('You are not authorized to view this page')
        RedirectToLogin()
      }  
    })
    .catch(error => RedirectToLogin())
  }, [])

  const getProjects = () => {
    axios.get('http://localhost:3001/projects', {withCredentials: true})
    .then(response =>{
        setProjects(response.data.data)
        // getAppointmentsFromProjects()
    })
  }

  const getAppointments = () => {
    axios.get('http://localhost:3001/appointments', {withCredentials: true})
    .then (response => setAppointments(response.data.data))
  }

  const parseAppointments = () =>{
    appointments.map(appt => {
      // debugger
      const apptInfo = {
        id: appt.id,
        title: appt.attributes.project.title,
        start: apptStart(appt.attributes.date, appt.attributes.time, appt.attributes.daypart),
        end: apptEnd(appt.attributes.date, appt.attributes.time, appt.attributes.length_time, appt.attributes.daypart)
      }

      myEventsList = [...myEventsList, apptInfo]
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
    debugger
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
    debugger
    return new Date(year, monthIndex, day, hour, min)
  }


  const parseIncompleteProjects = () =>{
    let incompleteProjects = projects.filter(p => p.attributes.project_complete_status === null)
    return(
      <div className="flex">{incompleteProjects.map(p => <div key={p.id} id={p.id} dataid={p.id} onClick={e=>clickHandler(e)} className='project'>Project ID:{p.id}<div>Client Name: {p.attributes.user.name}</div><div>Description:{p.attributes.tattoo_request.description}</div></div>)}</div>
    )
  }

  const findSelectedProject = (id) =>{
    let proj = projects.find(p => p.id === id)
    if(proj === undefined){
      nextProject()
    }
    setSelectedProject(proj)
  }

  const clickHandler = (e) =>{
    findSelectedProject(e.currentTarget.id)
    setShowFullScreen(true)
  }

  const toggleFullScreen = () => setShowFullScreen(!showFullScreen)
  

  const nextProject = () => {
    let nextId = parseInt(selectedProject.id) + 1
    findSelectedProject(nextId.toString())
  }

  const previousProject = () =>{
    let prevId = parseInt(selectedProject.id ) - 1
    findSelectedProject(prevId.toString())
  }

  

  


  // let myEventsList = [
  //   {
  //     id: 0,
  //     title: 'Board meeting',
  //     start: new Date(2018, 0, 29, 9, 0, 0),
  //     end: new Date(2018, 0, 29, 13, 0, 0),
  //     resourceId: 1,
  //   },
  //   {
  //     id: 1,
  //     title: 'MS training',
  //     start: new Date(2018, 0, 29, 14, 0, 0),
  //     end: new Date(2018, 0, 29, 16, 30, 0),
  //     resourceId: 2,
  //   },
  //   {
  //     id: 2,
  //     title: 'Team lead meeting',
  //     start: new Date(2018, 0, 29, 8, 30, 0),
  //     end: new Date(2018, 0, 29, 12, 30, 0),
  //     resourceId: 3,
  //   },
  //   {
  //     id: 10,
  //     title: 'Board meeting',
  //     start: new Date(2018, 0, 30, 23, 0, 0),
  //     end: new Date(2018, 0, 30, 23, 59, 0),
  //     resourceId: 1,
  //   },
  //   {
  //     id: 11,
  //     title: 'Birthday Party',
  //     start: new Date(2018, 0, 30, 7, 0, 0),
  //     end: new Date(2018, 0, 30, 10, 30, 0),
  //     resourceId: 4,
  //   },
  //   {
  //     id: 12,
  //     title: 'Board meeting',
  //     start: new Date(2018, 0, 29, 23, 59, 0),
  //     end: new Date(2018, 0, 30, 13, 0, 0),
  //     resourceId: 1,
  //   },
  //   {
  //     id: 13,
  //     title: 'Board meeting',
  //     start: new Date(2018, 0, 29, 23, 50, 0),
  //     end: new Date(2018, 0, 30, 13, 0, 0),
  //     resourceId: 2,
  //   },
  //   {
  //     id: 14,
  //     title: 'Board meeting',
  //     start: new Date(2021, 5, 29, 23, 40, 0),
  //     end: new Date(2021, 5, 30, 13, 0, 0),
  //     resourceId: 4,
  //   },
  // ]
  
  // const resourceMap = [
  //   { resourceId: 1, resourceTitle: 'Board room' },
  //   { resourceId: 2, resourceTitle: 'Training room' },
  //   { resourceId: 3, resourceTitle: 'Meeting room 1' },
  //   { resourceId: 4, resourceTitle: 'Meeting room 2' },
  // ]

  parseAppointments()
  return(
    <div>
        <Nav />
        <div className='title-description'>Projects to Be Scheduled:</div>
        <div className="to-be-scheduled">
          {parseIncompleteProjects()}
        </div><br></br>
        {showFullScreen ? <FullScreen type="project" project={selectedProject} toggle={toggleFullScreen}  next={nextProject} previous={previousProject}/> : null}
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