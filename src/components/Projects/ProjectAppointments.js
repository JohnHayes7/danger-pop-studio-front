import {React, useState, useEffect} from 'react'
import axios from 'axios'
import Field from '../InputFields/Field'
import Refresh from '../Utilites/Refresh'
import URL from '../Utilites/Url'


const ProjectAppointments = (props) =>{

    let gapi = window.gapi
    let CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    let API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
    let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    let SCOPES = "https://www.googleapis.com/auth/calendar.events";
    
    const [admin, setAdmin] = useState(false)
    const [showApptForm, setShowApptForm] = useState(false)
    const [showButton, setShowButton] = useState(true)
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [year, setYear] = useState('')
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('')
    const [daypart, setDaypart] = useState("PM")
    // const URL = 'https://danger-pop-api.herokuapp.com'

    useEffect(() =>{
        // NEEDS A REFACTOR TO UTILITES
        axios.get(URL + '/logged_in', {withCredentials: true})
        .then(response => {
            // debugger
            setAdmin(response.data.user.data.attributes.administrator)
        })
        .catch(error => redirectToLogin())
    }, [])

    const redirectToLogin = () =>{
        alert('You Must be logged in to see this page')
        // history.push('/sign-in')
    }
    
    const parseAppointments = () => {
        if(props.project.attributes.appointments.length > 0){
            debugger
            return props.project.attributes.appointments.map(appt => <div>{appt.date} - {appt.time}{appt.daypart} - {appt.length_time}</div>)
        }else{
            return "There are currently no upcoming appointments for this project" 
        }
    }

    const monthInput = (e) =>{
        e.preventDefault()
        return e.target.value.length <= 2 ? setMonth(e.target.value) : null
    }
    
    const dayInput = (e) =>{
        e.preventDefault()
        return e.target.value.length <3 ? setDay(e.target.value) : null
    }

    const yearInput = (e) =>{
        e.preventDefault()
        return e.target.value.length <=4 ? setYear(e.target.value) : null
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


    const newApptForm = () => {
        if(showApptForm){
            return(
                <div>
                    <form className='date-form'>
                        <div className="date-time">
                            <Field id="month" placeholder="MM" month={month} changeHandler={e => monthInput(e)}/>
                            <Field id="day" placeholder="DD" day={day} changeHandler={e => dayInput(e)}/>
                            <Field id="year" placeholder="YYYY" year={year} changeHandler={e => yearInput(e)}/>
                            <Field id="time" placeholder="hh:mm" time={time} changeHandler={e => timeInput(e)}/>
                            <select className="daypart-duration" onChange={e=> daypartSelector(e)}>
                                {parseDayParts()}
                            </select>
                            <select className="daypart-duration" onChange={e => durationSelector(e)}>
                                <option value="30">30 Mins</option>
                                <option value="1 Hour">1 Hour</option>
                                <option value="2 Hours">2 Hours</option>
                                <option value="3 Hours">3 Hours</option>
                                <option value="4 Hours">4 Hours</option>
                                <option value="5 Hours">5 Hours</option>
                                <option value="6 Hours">6 Hours</option>
                                <option value="7 Hours">7 Hours</option>
                                <option value="8 Hours">8 Hours</option>
                            </select>
                            <submit id='save-button' onClick={e => submitForm(e)}>Save</submit>
                        </div>
                    </form>
                </div>
            )
        }
        
    }

    const startTime = () => {
        let hour = parseInt(time.split(":")[0])
        if(daypart === "PM"){
            hour +=12
        }

        return `${year}-${month}-${day}T${hour.toString()}:${time.split(':')[1]}:00`
    }

    const endTime = (t, d) =>{
        let hour = parseInt(t.split(':')[0])
        if(daypart === "PM"){
           hour += 12
        }
        let apptLengthInt = parseInt(d.split(" ")[0])
        let end = hour + apptLengthInt
        // let ending = `${year}-${month}-${day}T${end.toString()}:${t.split(':')[1]}:00`
        return `${year}-${month}-${day}T${end.toString()}:${t.split(':')[1]}:00`
        
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
                      {'email': 'lpage@example.com'},
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
        // debugger

        const data = {
            'day': day,
            'month': month,
            'year': year,
            'time': time,
            'daypart': daypart,
            'duration': duration,
            'project_id': parseInt(props.project.id),
            'user_id': props.project.attributes.user.id
        }

        axios({method: 'post', url: URL + '/appointments', data: data,   headers: {'Content-Type': 'application/json'}}).then(resp => {
          debugger
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
            return <div><button onClick={toggleForm}>Add New Appointment</button></div>
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