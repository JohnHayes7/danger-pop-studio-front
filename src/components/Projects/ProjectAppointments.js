import {React, useState, useEffect} from 'react'
import axios from 'axios'
import Field from '../InputFields/Field'
import Refresh from '../Utilites/Refresh'
import URL from '../Utilites/Url'
import {lengthOptions, hours, months, twentyEightDays, thirtyDays, thirtyOneDays, years, currentMonthDay, currentYear} from '../Utilites/DateTime'


const ProjectAppointments = (props) =>{

    let gapi = window.gapi
    let CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    let API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
    let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    let SCOPES = "https://www.googleapis.com/auth/calendar.events";

    let  defaultMonthIndex = months.indexOf(currentMonthDay.month)
    let  numbericMonth = defaultMonthIndex + 1
    let  stringNumericMonth = numbericMonth.toString()
    
    const [admin, setAdmin] = useState(false)
    const [showApptForm, setShowApptForm] = useState(false)
    const [showButton, setShowButton] = useState(true)
    const [month, setMonth] = useState(currentMonthDay().month)
    const [day, setDay] = useState(currentMonthDay().date)
    const [year, setYear] = useState(currentYear)
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('')
    const [daypart, setDaypart] = useState("PM")
    // const URL = 'https://danger-pop-api.herokuapp.com'

    useEffect(() =>{
        // NEEDS A REFACTOR TO UTILITES
        const token = localStorage.getItem("token")
        if(token){
            fetch(URL + '/auto_login', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                let rxdUser = data.data
                setAdmin(rxdUser.attributes.administrator)
            })
        }
        // axios.get(URL + '/logged_in', {withCredentials: true})
        // .then(response => {
        //     // 
        //     setAdmin(response.data.user.data.attributes.administrator)
        // })
        // .catch(error => redirectToLogin())
    }, [])

    const redirectToLogin = () =>{
        alert('You Must be logged in to see this page')
        // history.push('/sign-in')
    }
    
    const parseAppointments = () => {
        if(props.project.attributes.appointments.length > 0){
            
            return props.project.attributes.appointments.map(appt => <div>{appt.date} - {appt.time}{appt.daypart} - {appt.length_time}</div>)
        }else{
            return "There are currently no upcoming appointments for this project" 
        }
    }

    const monthInput = (e) =>{
        
        e.preventDefault()
        setMonth(e.target.value)
    }
    
    const dayInput = (e) =>{
        e.preventDefault()
        setDay(e.target.value)
    }

    const yearInput = (e) =>{
        e.preventDefault()
        setYear(e.target.value)
    }

    const timeInput = (e) =>{
        e.preventDefault()
        setTime(e.target.value)
    }

    const durationSelector = (e) =>{
        setDuration(e.target.value)
    }

    const daypartSelector = (e) =>{
        setDaypart(e.target.value)
    }
    
    const parseDayParts = () => {
        const dayparts = ["AM", "PM"]
        return dayparts.map(dp => <option value={dp}>{dp}</option>)
    }

    const days = () =>{
        if(month === "February"){
            return twentyEightDays.map(d => <option  value={d}>{d}</option>)
        }else if(month === "September" || month === "April" || month === "June" || month === "November"){
            return thirtyDays.map(d => <option  value={d}>{d}</option>)
        }else{
            return thirtyOneDays.map(d => <option value={d}>{d}</option>)
        }
    }

    const newApptForm = () => {
        if(showApptForm){
            return(
                <div>
                    <form className='date-form'>
                        <div className="date">
                            <select id="month" onChange={e=>monthInput(e)}>
                                {months.map(m => <option selected={currentMonthDay().month} value={m}>{m}</option>)}
                            </select>
                            
                            <select id="day" onChange={e=>dayInput(e)}>
                                {days()}
                            </select>
                            
                            <select id="year" onChange={e=>yearInput(e)}>
                                {years().map(y => <option value={y}>{y}</option>)}
                            </select>
                        </div>
                        <div className='time'>
                            <select id="time" onChange={e=>timeInput(e)}>
                                {hours.map(h => <option value={h}>{h}</option>) }
                            </select>

                            <select className="daypart-duration" onChange={e=> daypartSelector(e)}>
                                {parseDayParts()}
                            </select>

                            <select className="daypart-duration" onChange={e => durationSelector(e)}>
                                {lengthOptions.map(opt => <option value={opt}>{opt}</option>)}
                            </select>
                            <submit id='save-button' onClick={e => submitForm(e)}>Save</submit>
                        </div>
                        
                    </form>
                </div>
            )
        }
        
    }

    const convertMonthToNumeric = () => {
        let  defaultMonthIndex = months.indexOf(month)
        let  numbericMonth = defaultMonthIndex + 1
        let  stringNumericMonth = numbericMonth.toString()
        return stringNumericMonth
    }

    const startTime = () => {
        let hour = parseInt(time.split(":")[0])
        if(daypart === "PM"){
            hour +=12
        }

        return `${year}-${convertMonthToNumeric()}-${day}T${hour.toString()}:${time.split(':')[1]}:00`
    }

    const endTime = (t, d) =>{
        let hour = parseInt(t.split(':')[0])
        if(daypart === "PM"){
           hour += 12
        }
        let apptLengthInt = parseInt(d.split(" ")[0])
        let end = hour + apptLengthInt
        // let ending = `${year}-${month}-${day}T${end.toString()}:${t.split(':')[1]}:00`
        return `${year}-${convertMonthToNumeric()}-${day}T${end.toString()}:${t.split(':')[1]}:00`
        
    }

    const submitForm = (e) =>{
        gapi.load('client:auth2', () =>{
            console.log('loaded client')
            
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {
                let event = {
                    'summary': `${props.project.attributes.title}`,
                    'location': 'The Shop, Yardley, PA 55555',
                    'description': `${props.project.attributes.tattoo_request.description}`,
                    'start': {
                      'dateTime': `${startTime()}`,
                      'timeZone': 'America/New_York'
                    },
                    'end': {
                      'dateTime': `${endTime(time, duration)}`,
                      'timeZone': 'America/New_York'
                    },
                    // 'recurrence': [
                    //   'RRULE:FREQ=DAILY;COUNT=2'
                    // ],
                    'attendees': [
                      {'email': `${props.project.attributes.user.email}`}
                    ],
                    'reminders': {
                      'useDefault': false,
                      'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                      ]
                    }
                  };

                let request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event
                })
                
                request.execute(event => {
                   addApptToDb()
                    // window.open(event.htmlLink)
                })
            })
        })
    }

    const addApptToDb = () => {
        // 

        const data = {
            'day': day,
            'month': convertMonthToNumeric(),
            'year': year,
            'time': time,
            'daypart': daypart,
            'duration': duration,
            'project_id': parseInt(props.project.id),
            'user_id': props.project.attributes.user.id
        }

        axios({method: 'post', url: URL + '/appointments', data: data,   headers: {'Content-Type': 'application/json'}}).then(resp => {
          
            if(resp.status === 200){
                Refresh()
            }
        }).catch( err => {  
          //catch the error
          console.log(err)
        })
    }

    const toggleForm = () =>{
        setShowApptForm(!showApptForm)
        setShowButton(!showButton)
    }

    const displayUpload = () =>{
        if(admin && showButton){
            return <div><button className="add-new-btn" onClick={toggleForm}>Add New Appointment</button></div>
        }       
    }

    return(
        <div>
            {parseAppointments()}
            {displayUpload()}
            {newApptForm()}
        </div>
    )
}

export default ProjectAppointments