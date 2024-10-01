import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './Register.css'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PlayerRegisterList from "../PlayersRegisterList/PlayerRegisterList";
import axios from "axios";
let stopCounter = false;


function Register(props) {
    const [selectedDay, setSelectedDay] = useState(props.selectedDay || undefined);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isClicked, setIsClicked] = useState(true);
    const playerEmail = props.playerData.email;

    // console.log('Register component rendered'); // Add this line to log when the component renders

    function registerHandler() {

        setIsClicked(!isClicked);
        console.log(`it is clicked ${isClicked}`);
        try{


        if(isClicked)   {
            axios.post('http://localhost:8081/register',{playerEmail}).then(res => {
                if(res.status && res.status.toString().startsWith("2")) {
                    console.log(res);
                }

            })
        }else {
            axios.post('http://localhost:8081/undoRegister',{playerEmail}).then(res => {
                if(res.status && res.status.toString().startsWith("2")) {
                    console.log(res);
                }

            })
        } } catch(err) {
            console.log("failed in Register/Undo Register" + err)
        }

    }
    useEffect(() => {// Exit early if stopCounter is true

        console.log('useEffect called');
        // Add this line to log when useEffect runs
        (async() => {
            const registeredPlayers = await axios.get('http://localhost:8081/getRegisteredByMail', {
                params: {
                    email: playerEmail
                }
            });
            setIsClicked(registeredPlayers.data === null);
        })();

        const calculateCountdown = () => {
            const now = new Date();
            const nextDayInWeek = new Date(now);

            if (props.selectedDay === "monday") {
                nextDayInWeek.setDate(nextDayInWeek.getDate() + (1 + (7 - nextDayInWeek.getDay())) % 7);
            } else if (props.selectedDay === "wednesday") {
                nextDayInWeek.setDate(nextDayInWeek.getDate() + (3 + (7 - nextDayInWeek.getDay())) % 7);
            } else if (props.selectedDay === "friday") {
                nextDayInWeek.setDate(nextDayInWeek.getDate() + (5 + (7 - nextDayInWeek.getDay())) % 7);
            }
            // Adjust for Israel time zone (IST)
            nextDayInWeek.setHours(12,0,0,0);

            const difference = nextDayInWeek - now;

            let days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if(now.getDay() === 0) {
                days =0
            }

                setCountdown({days, hours, minutes, seconds})
        };
        if(!stopCounter) {
            calculateCountdown();
            const intervalId = setInterval(calculateCountdown, 1000);
            return () => clearInterval(intervalId);
        }



    }, [props.selectedDay]);


    return (
        <div>
            {renderRegister(selectedDay, countdown, isClicked, registerHandler)}
        </div>
    );



}

function renderRegister( selectedDay,countdown, isClicked, registerHandler) {
    const currentDate = new Date();
    const isMonday = currentDate.getDay() === 1;
    const isSunday = currentDate.getDay() === 0;
    const isTuesday = currentDate.getDay() === 2;
    const isWednesday = currentDate.getDay() === 3;
    const isThursday = currentDate.getDay() === 4;
    const isFriday = currentDate.getDay() === 5;
    const isAfterNoon = isSunday ? currentDate.getHours() >= 12 : true;

    if (true || (selectedDay === "monday" && (isMonday || isSunday) && isAfterNoon) ||
        (selectedDay === "wednesday" && (isTuesday || isWednesday) && isAfterNoon) ||
        (selectedDay === "friday" && (isThursday || isFriday) && isAfterNoon)) {
        stopCounter = true;
        return (
            <div>
                <div className="inOutButtons">
                    <Button variant="outlined" size="small" disabled={!isClicked} onClick={registerHandler}>In</Button>
                    <Button variant="outlined" size="small" disabled={isClicked} onClick={registerHandler}>Out</Button>
                </div>
                 <PlayerRegisterList  isClicked={isClicked}/>
            </div>
        );
    }

    stopCounter = false;
    return (
        <div>
            <h2>Countdown to Next Register</h2>
            <div>
                <span>{countdown.days} days</span>
                <span>{countdown.hours} hours</span>
                <span>{countdown.minutes} minutes</span>
                <span>{countdown.seconds} seconds</span>
            </div>
        </div>
    );


}


export default Register;