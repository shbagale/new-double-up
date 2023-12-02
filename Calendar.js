import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import dayjs from 'dayjs';
import { Dialog, DialogTitle, DialogActions, TextField, Button } from "@mui/material";
import {TimePicker} from "@mui/x-date-pickers";
import './Calendar.css'
import { useEffect, useState } from "react";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [events, setEvents] = useState([]);
    const [curID, setCurID] = useState(1);
    const [eventSelected, setEventSelected] = useState(false);
    const [slotSelected, setSlotSelected] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [start, setStart] = useState(null);  // must be Dates
    const [end, setEnd] = useState(null);
    const [clickedEvent, setClickedEvent] = useState({});

    

    const closeDialog = () => {
      setSlotSelected(false);
      setEventSelected(false);
    }

    const addEvent = (event) => {  // should send event to backend in the future
      const newEvents = [...events, event];
      setEvents(newEvents);
    }

    const removeEvent = (id) => {
      let newEvents = events.filter(e => e.id != id);
      setEvents(newEvents);
    }

    const handleEventSelected = (event) => {
      setClickedEvent(event);
      setStart(event.start);
      setEnd(event.end); 
      setTitle(event.title);
      setDesc(event.desc);
      setEventSelected(true);
    }

    const handleSlotSelected = (slotInfo) => {
      setStart(slotInfo.start);
      if(slotInfo.start.getDay() == slotInfo.end.getDay()) {
        setEnd(slotInfo.end);
      } else {
        setEnd(new Date(slotInfo.start.getTime() + 30 * 60000))
      }
      setSlotSelected(true);
    }

    const addCurrentAppointment = () => {
      addEvent({title, desc, start, end, id: curID});
      setCurID(curID + 1);
      closeDialog();
    }

    const changeCurrentAppointment = () => {
      const index = events.findIndex(event => event.id == clickedEvent.id);
      const updatedEvent = events.slice();
      updatedEvent[index].title = title;
      updatedEvent[index].desc = desc;
      updatedEvent[index].start = start;
      updatedEvent[index].end = end;
      setEvents(updatedEvent);
      closeDialog();
    }

    const deleteCurrentAppointment = () => {
      removeEvent(clickedEvent.id);
      closeDialog();
    }

    return(
      <div>
        <Calendar 
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={events}  // should fetch from backend in the future
          selectable
          onSelectEvent={handleEventSelected}
          onSelectSlot={handleSlotSelected}
          style={{ 
            height: "100vh",
            width: "140vh",
            padding: "10vh"
          }}
        />
        <Dialog open={slotSelected} onClose={closeDialog}>
          <DialogTitle>Schedule an appointment</DialogTitle>
          <TextField 
            label="Title" 
            onChange={(event) => setTitle(event.target.value)} />
          <TextField 
            label="Description" 
            onChange={(event) => setDesc(event.target.value)} />
          <TimePicker 
            label="Start Time" 
            value={dayjs(start)} 
            onChange={(value) => setStart(value.toDate())} />
          <TimePicker 
            label="End Time" 
            value={dayjs(end)} 
            onChange={(value) => setEnd(value.toDate())}
             />
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button variant="contained" onClick={addCurrentAppointment}>Submit</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={eventSelected} onClose={closeDialog}>
          <DialogTitle>Join an appointment</DialogTitle>
          <TextField 
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)} />
          <TextField 
            label="Description" 
            value={desc}
            onChange={(event) => setDesc(event.target.value)} />
          <TimePicker 
            label="Start Time" 
            value={dayjs(start)} 
            onChange={(value) => setStart(value.toDate())} />
          <TimePicker 
            label="End Time" 
            value={dayjs(end)} 
            onChange={(value) => setEnd(value.toDate())} />
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button color="error" onClick={deleteCurrentAppointment}>Delete</Button>
            <Button variant="contained" onClick={changeCurrentAppointment}>Join</Button>
          </DialogActions>
        </Dialog>
      </div>
      
    );
}

export default MyCalendar;