import React, { useState } from "react";
import { createTheme, FormControl, Input,
     InputLabel, MenuItem, Select, TextField, ThemeProvider } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import styles from "./EventInfo.module.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function EventInfo ({event, HandleEventDataChange})
{
    const [eventData, setEventData] = useState(event);
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    const HandleEventDataChangeInChild = (key, value) =>{
        setEventData((prev) =>({
            ...prev,
            [key]: value
        }))
    }
    return (
        <ThemeProvider theme={darkTheme}>
        <div className={styles["main"]}>
            <div className={styles["input-item"]}>
                <InputLabel className={styles["label"]}>Banner</InputLabel>
                <Input
                    onChange={(e) =>{
                        HandleEventDataChangeInChild("banner",e.target.files[0]);
                        HandleEventDataChange("banner",e.target.files[0])}}
                    fullWidth
                    type="file">
                </Input>
            </div>

            <div className={styles["input-item"]}>
                <InputLabel className={styles["label"]}>Seat map</InputLabel>
                <Input fullWidth
                    onChange={(e) => {
                        HandleEventDataChangeInChild("seatMap",e.target.files[0]);
                        HandleEventDataChange("seatMap",e.target.files[0])}}
                    type="file">
                </Input>
            </div>
            <div className={styles["input-item"]}>
                <InputLabel className={styles["label"]}>Date and time</InputLabel>
                <LocalizationProvider
                    className={styles["date-time-input"]}
                    fullWidth
                    dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={eventData.date ? eventData.date : ""}
                        onChange={(newDate) =>{
                        HandleEventDataChangeInChild("date",newDate);
                        HandleEventDataChange("date",newDate)}}/>
                    <TimePicker 
                        value={eventData.time ? eventData.time : ""}
                        onChange={(newTime) => {
                        HandleEventDataChangeInChild("time",newTime);
                        HandleEventDataChange("time",newTime)}}/>
                </LocalizationProvider>
            </div>
            <div className={styles["input-item"]}>
                <InputLabel className={styles["label"]}>Name</InputLabel>
                <TextField
                    value={eventData.name ? eventData.name : ""}
                    onChange={(e) =>{ 
                        HandleEventDataChangeInChild("name",e.target.value);
                        HandleEventDataChange("name",e.target.value)}}
                    fullWidth
                    label="Name" variant="outlined" />
            </div>
           
            <div className={styles["input-item"]}>
                <InputLabel className={styles["label"]}>Location</InputLabel>
                <TextField
                    value={eventData.location ? eventData.location : ""}
                    onChange={(e) =>{ 
                        HandleEventDataChangeInChild("location",e.target.value); 
                        HandleEventDataChange("location",e.target.value)}}
                    fullWidth
                    label="Location" variant="outlined" />
            </div>
            <div className={styles["input-item"]}>
                <InputLabel className={styles["label"]}>Category</InputLabel>
                <FormControl fullWidth>
                    <InputLabel className={styles["label"]}>Category</InputLabel>
                    <Select
                        value={eventData.category ? eventData.category : ""}
                        onChange={(e) => {
                            HandleEventDataChangeInChild("category",e.target.value);
                            HandleEventDataChange("category",e.target.value)}}
                        label="Category">
                        <MenuItem value={"Sport"}>Sport</MenuItem>
                        <MenuItem value={"Music"}>Music</MenuItem>
                        <MenuItem value={"Comedy"}>Comedy</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={styles["input-item"]}>
                <InputLabel className={styles["label"]}>Description</InputLabel>
                <ReactQuill 
                    value={eventData.description ? eventData.description : ""}
                    onChange={(value) => {
                        HandleEventDataChangeInChild("description",value);
                        HandleEventDataChange("description",value)}}/>
            </div>
        </div>
        </ThemeProvider>
    );
}

export default EventInfo;