<<<<<<< HEAD

import { useState } from "react"; import UserNavbar from "../components/UserNavbar";
const times=["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM"]; const bookings={"9:00 AM":2,"10:00 AM":2,"11:00 AM":5,"12:00 PM":9,"1:00 PM":8,"2:00 PM":5,"3:00 PM":2,"4:00 PM":5,"5:00 PM":9,"6:00 PM":8,"7:00 PM":5,"8:00 PM":2}; const getStatus=(c)=>c<=3?"Quiet":c<=6?"Moderate":"Busy"; const getLevel=(c)=>c<=3?"low":c<=6?"medium":"high";
export default function Booking(){ const [available,setAvailable]=useState(12); const [selectedDuration,setSelectedDuration]=useState(1); const [selectedTime,setSelectedTime]=useState(""); const [selectedDate,setSelectedDate]=useState(""); const [people,setPeople]=useState(1); const [warning,setWarning]=useState(""); const [showBookingMessage,setShowBookingMessage]=useState(false); const total=30; const percentage=(available/total)*100; const handleConfirmBooking=()=>{ setWarning(""); setShowBookingMessage(false); if(!selectedDate) return setWarning("Please select a date."); if(!selectedTime) return setWarning("Please choose a time."); if(people>available) return setWarning("Not enough seats available."); setAvailable((p)=>p-people); setShowBookingMessage(true); }; return <div className="booking-page"><UserNavbar absolute={false}/><div className="booking-container"><aside className="booking-sidebar"><div className="booking-card"><h3>Live Status</h3><div className="status-row"><span>Status</span><span className="open">Open</span></div><div className="status-row"><span>Available Seats</span><strong>{available}</strong></div><div className="status-row"><span>Total Seats</span><strong>30</strong></div><div className="progress"><div className="progress-bar" style={{width:`${percentage}%`}}/></div><p className="progress-text">{Math.round(percentage)}% Available</p></div><div className="booking-card"><h3>Busy Hours Today</h3>{times.map((time)=>{ const count=bookings[time]; const level=getLevel(count); const percent=(count/10)*100; return <div className="hour" key={time}><span>{time}</span><div className="bar"><div className={`fill ${level}`} style={{width:`${percent}%`}}/></div><span className="level">{level.charAt(0).toUpperCase()+level.slice(1)}</span></div>})}</div></aside><main className="booking-main"><h1>Book Your Study Seat</h1><div className="booking-card"><h3>Reserve Your Seat</h3>{warning&&<div className="warning-message">{warning}</div>}{showBookingMessage&&<div className="booking-message">Booking confirmed! See you soon.</div>}<label><span className="material-symbols-outlined">calendar_today</span>Select Date</label><input type="date" value={selectedDate} onChange={(e)=>setSelectedDate(e.target.value)}/><label><span className="material-symbols-outlined">schedule</span>Select Time</label><select value={selectedTime} onChange={(e)=>setSelectedTime(e.target.value)}><option value="">Choose your time</option>{times.map((time)=><option key={time} value={time}>{time} ({getStatus(bookings[time])})</option>)}</select><label><span className="material-symbols-outlined">group</span>Number of People</label><select value={people} onChange={(e)=>setPeople(parseInt(e.target.value,10))}>{[1,2,3,4,5].map((n)=><option key={n} value={n}>{n} {n===1?"Person":"People"}</option>)}</select><label><span className="material-symbols-outlined">timer</span>Select Duration</label><div className="duration">{[1,2].map((d)=><div key={d} className={`duration-card ${selectedDuration===d?'active':''}`} onClick={()=>setSelectedDuration(d)}><h3>{d} {d===1?'Hour':'Hours'}</h3><p>{d===1?'Perfect for quick study':'Deep focus session'}</p></div>)}</div><button className="confirm" onClick={handleConfirmBooking}><span className="material-symbols-outlined">check_circle</span>Confirm Booking</button><div className="booking-info"><h4>Booking Information</h4><ul><li>You can modify or cancel your booking up to 30 minutes before</li><li>Free WiFi and power outlets available at all seats</li></ul></div></div></main></div></div>; }
=======
import { useState, useEffect, useRef } from "react";
import UserNavbar from "../components/UserNavbar";
import "../styles/booking.css";

const TOTAL_SEATS = 30;
const times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];

export default function Booking() {
    const [bookings, setBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [people, setPeople] = useState("");
    const [duration, setDuration] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [msg, setMsg] = useState({ type: "", text: "" });
    const [showNav, setShowNav] = useState(true);
    const lastScroll = useRef(0);

    const getToday = () => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };
    const today = getToday();

    useEffect(() => {
        const saved = localStorage.getItem("bookings");
        if (saved) setBookings(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("bookings", JSON.stringify(bookings));
    }, [bookings]);

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            setShowNav(current < lastScroll.current || current < 10);
            lastScroll.current = current;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const notify = (text, type = "success") => {
        setMsg({ text, type });
        setTimeout(() => setMsg({ text: "", type: "" }), 3500);
    };

    const getSlotCount = (time, date) => {
        return bookings
            .filter(b => b.date === date)
            .reduce((total, b) => {
                const bookingStart = times.indexOf(b.time);
                const clickedSlot = times.indexOf(time);
                if (clickedSlot >= bookingStart && clickedSlot < bookingStart + b.duration) {
                    return total + Number(b.people);
                }
                return total;
            }, 0);
    };

    const handleSave = () => {
        if (!selectedDate || !selectedTime || !people || !duration) {
            notify("Please fill all fields before booking.", "error");
            return;
        }
        if (selectedDate < today) {
            notify("You cannot book a past date.", "error");
            return;
        }
        for (let i = 0; i < duration; i++) {
            const slotIndex = times.indexOf(selectedTime) + i;
            if (slotIndex >= times.length) break;
            const count = getSlotCount(times[slotIndex], selectedDate);
            if (count + Number(people) > TOTAL_SEATS) {
                notify(`No seats available at ${times[slotIndex]}.`, "error");
                return;
            }
        }

        const newEntry = { date: selectedDate, time: selectedTime, people: Number(people), duration };

        if (editingIndex !== null) {
            const up = [...bookings];
            up[editingIndex] = newEntry;
            setBookings(up);
            setEditingIndex(null);
            notify("Updated!");
        } else {
            setBookings([...bookings, newEntry]);
            notify("Booking added successfully!");
        }
        setSelectedDate(""); setSelectedTime(""); setPeople(""); setDuration(null);
    };

    const confirmAll = () => {
        if (selectedRows.length === 0) {
            notify("Select at least one booking to confirm.", "error");
            return;
        }
        notify("Your reservation has been sent to your email!");
        setBookings(bookings.filter((_, i) => !selectedRows.includes(i)));
        setSelectedRows([]);
    };

    return (
        <div className="booking-page">

            {/* NAVBAR — hides on scroll down, shows on scroll up */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transition: 'transform 0.3s ease',
                transform: showNav ? 'translateY(0)' : 'translateY(-100%)'
            }}>
                <UserNavbar absolute={false} />
            </div>

            <div className="booking-container">
                <aside style={{flex: '1'}}>

                    {/* LIVE STATUS */}
                    <div className="booking-card">
                        <h3>Live Status</h3>
                        <p>Status: <span style={{color: '#16a34a', fontWeight: 'bold'}}>Open</span></p>
                        <p style={{fontSize: '13px', margin: '8px 0 4px'}}>
                            Available Seats <strong>{TOTAL_SEATS}/{TOTAL_SEATS}</strong>
                        </p>
                        <div className="bar-bg" style={{height: '10px', marginBottom: '8px'}}>
                            {selectedTime && (() => {
                                const taken = getSlotCount(selectedTime, selectedDate || today);
                                const perc = (taken / TOTAL_SEATS) * 100;
                                const color = perc >= 100 ? '#ef4444' : perc > 60 ? '#f59e0b' : '#22c55e';
                                return <div className="bar-fill" style={{width: `${perc}%`, background: color}} />;
                            })()}
                        </div>
                        <p style={{fontSize: '12px', color: '#94a3b8'}}>
                            {selectedTime ? `Slot: ${selectedTime}` : "Select a time to see availability"}
                        </p>
                    </div>

                    {/* BUSY HOURS */}
                    <div className="booking-card">
                        <h3>Busy Hours Today</h3>
                        {times.map(t => {
                            const count = getSlotCount(t, today);
                            const perc = (count / TOTAL_SEATS) * 100;
                            const isFull = count >= TOTAL_SEATS;
                            const color = isFull ? '#ef4444' : perc > 60 ? '#f59e0b' : '#22c55e';
                            return (
                                <div className="hour" key={t}>
                                    <span style={{minWidth: '70px'}}>{t}</span>
                                    <div className="bar-bg" style={{flex: 1}}>
                                        <div className="bar-fill" style={{width: `${perc}%`, background: color}} />
                                    </div>
                                    {isFull
                                        ? <span style={{fontSize: '11px', color: '#ef4444', fontWeight: 'bold', minWidth: '35px'}}>Full</span>
                                        : <span style={{fontSize: '11px', minWidth: '35px'}}>{count}/{TOTAL_SEATS}</span>
                                    }
                                </div>
                            );
                        })}
                    </div>

                </aside>

                <main style={{flex: '2.5'}}>
                    <h1>Book Your Study Seat</h1>

                    {msg.text && <div className={`status-msg ${msg.type === "success" ? "msg-success" : "msg-error"}`}>{msg.text}</div>}

                    <div className="table-section-white">
                        <h2>Your Bookings</h2>
                        <div className="table-scroll">
                            <table className="booking-table">
                                <thead>
                                    <tr>
                                        <th></th><th>Date</th><th>Time</th><th>People</th><th>Duration</th><th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((b, i) => (
                                        <tr key={i}>
                                            <td><input type="checkbox" checked={selectedRows.includes(i)} onChange={() => setSelectedRows(selectedRows.includes(i) ? selectedRows.filter(x => x !== i) : [...selectedRows, i])} /></td>
                                            <td>{b.date}</td><td>{b.time}</td><td>{b.people}</td><td>{b.duration}h</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="small-btn" onClick={() => { setEditingIndex(i); setSelectedDate(b.date); setSelectedTime(b.time); setPeople(b.people); setDuration(b.duration); }}>✏️</button>
                                                    <button className="small-btn" onClick={() => setBookings(bookings.filter((_, idx) => idx !== i))}>🗑</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="confirm-footer">
                            <button className="btn-confirm-final" onClick={confirmAll} disabled={bookings.length === 0}>Confirm</button>
                        </div>
                    </div>

                    <div className="booking-card">
                        <h3>Reserve Your Seat</h3>
                        <div className="reserve-inputs">
                            <div className="input-group">
                                <label>Date</label>
                                <input type="date" className="input-field" min={today} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label>Time</label>
                                <select className="input-field" value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
                                    <option value="">Select time</option>
                                    {times.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>People</label>
                                <select className="input-field" value={people} onChange={e => setPeople(e.target.value)}>
                                    <option value="">Select</option>
                                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                        </div>

                        <label style={{fontWeight: '600', fontSize: '14px'}}>Duration</label>
                        <div className="duration-flex">
                            {[1, 2].map(d => (
                                <div key={d} className={`dur-option ${duration === d ? "active" : ""}`} onClick={() => setDuration(d)}>
                                    {d} Hour{d > 1 ? 's' : ''}
                                </div>
                            ))}
                        </div>

                        <button className="btn-navy" onClick={handleSave}>
                            {editingIndex !== null ? "Update Booking" : "Book"}
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
>>>>>>> 7dae78a8f65253d517de2ce34e63c6d04facd36f
