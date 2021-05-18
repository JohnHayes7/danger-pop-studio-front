import {React, useState, useEffect} from 'react'
import axios from 'axios'
import Field from '../InputFields/Field'

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

    useEffect(() =>{
        // NEEDS A REFACTOR TO UTILITES
        axios.get('http://localhost:3001/logged_in', {withCredentials: true})
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
            return props.project.attributes.appointments.map(appt => <div>{appt.date}</div>)
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

    const newApptForm = () => {
        if(showApptForm){
            return(
                <div>
                    <form className='date-form'>
                        <Field id="month" placeholder="MM" month={month} changeHandler={e => monthInput(e)}/>
                        <Field id="day" placeholder="DD" day={day} changeHandler={e => dayInput(e)}/>
                        <Field id="year" placeholder="YYYY" year={year} changeHandler={e => yearInput(e)}/>
                        <submit onClick={e => submitForm(e)}>Save</submit>
                    </form>
                </div>
            )
        }
        
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
                    'summary': 'Google I/O 2015',
                    'location': '800 Howard St., San Francisco, CA 94103',
                    'description': 'A chance to hear more about Google\'s developer products.',
                    'start': {
                      'dateTime': '2021-05-19T09:00:00-07:00',
                      'timeZone': 'America/Los_Angeles'
                    },
                    'end': {
                      'dateTime': '2021-05-19T17:00:00-07:00',
                      'timeZone': 'America/Los_Angeles'
                    },
                    'recurrence': [
                      'RRULE:FREQ=DAILY;COUNT=2'
                    ],
                    'attendees': [
                      {'email': 'lpage@example.com'},
                      {'email': 'sbrin@example.com'}
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
                    debugger
                    window.open(event.htmlLink)
                })
            })
        })
    }

    const toggleForm = () =>{
        setShowApptForm(!showApptForm)
        setShowButton(!showButton)
    }



    // const admin = (administrator) => administrator ? true : false

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