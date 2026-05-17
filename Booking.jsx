import { useState, useEffect, useRef, useCallback } from "react";
import UserNavbar from "../components/UserNavbar";
import "../styles/booking.css";

const TOTAL_SEATS = 30;
const API = "http://localhost:3000";
const times = [
    "9:00 AM","10:00 AM","11:00 AM","12:00 PM",
    "1:00 PM","2:00 PM","3:00 PM","4:00 PM",
    "5:00 PM","6:00 PM","7:00 PM","8:00 PM"
];

const getTimeIndex = (time) => times.indexOf(time);

export default function Booking() {
    const [bookings, setBookings]         = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [people, setPeople]             = useState("");
    const [duration, setDuration]         = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [bookMsg, setBookMsg]           = useState({ type: "", text: "" });

    const [showConfirmAlert, setShowConfirmAlert] = useState(false);
    const [confirmAlertType, setConfirmAlertType] = useState("success");
    const [confirmAlertText, setConfirmAlertText] = useState("");

    const [showNav, setShowNav]   = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const lastScroll = useRef(0);

    const getToday = () => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    };
    const today = getToday();

    // ─── DATA FETCHING ───────────────────────────────────────────────────────

        const fetchBookings = useCallback(() => {
            fetch(`${API}/bookings`)
                .then(r => r.json())
                .then(data => {
                    console.log("Bookings:", data);
                    setBookings(Array.isArray(data) ? data : []);
                })
                .catch(err => console.error("Bookings error:", err));
        }, []);

        useEffect(() => { fetchBookings(); }, [fetchBookings]);

        useEffect(() => {
            const onScroll = () => {
                const cur = window.scrollY;
                setShowNav(cur < lastScroll.current || cur < 10);
                lastScroll.current = cur;
            };
            window.addEventListener("scroll", onScroll);
            return () => window.removeEventListener("scroll", onScroll);
        }, []);

    // ─── NOTIFICATIONS ───────────────────────────────────────────────────────

    const notifyBook = (text, type = "success") => {
        setBookMsg({ text, type });
        setTimeout(() => setBookMsg({ text: "", type: "" }), 3500);
    };

    const showConfirm = (text, type = "success") => {
        setConfirmAlertText(text);
        setConfirmAlertType(type);
        setShowConfirmAlert(true);
        setTimeout(() => setShowConfirmAlert(false), 3500);
    };

    // ─── SLOT HELPERS ─────────────────────────────────────────────────────────

    // Count booked seats for a time slot from local bookings state (no API needed)
    const getSlotCount = (time, date) => {
        const targetDate = date || selectedDate || today;
        return bookings
            .filter(b => b.date?.split("T")[0] === targetDate)
            .reduce((total, b) => {
                const bookingStart = getTimeIndex(b.TimeSlot?.time || b.time);
                const slotIndex    = getTimeIndex(time);
                if (slotIndex >= bookingStart && slotIndex < bookingStart + b.duration) {
                    return total + Number(b.people);
                }
                return total;
            }, 0);
    };

    // ─── BOOKING ACTIONS ──────────────────────────────────────────────────────

    const handleSave = async () => {
        if (!selectedDate || !selectedTime || !people || !duration) {
            notifyBook("Please fill all fields before booking.", "error");
            return;
        }
        if (selectedDate < today) {
            notifyBook("You cannot book a past date.", "error");
            return;
        }

        const startIdx = getTimeIndex(selectedTime);
        for (let i = 0; i < duration; i++) {
            const slotTime = times[startIdx + i];
            if (!slotTime) {
                notifyBook("Duration extends beyond available time slots.", "error");
                return;
            }
            const count = getSlotCount(slotTime, selectedDate);
            if (count + Number(people) > TOTAL_SEATS) {
                notifyBook(`Only ${TOTAL_SEATS - count} seat(s) left at ${slotTime}.`, "error");
                return;
            }
        }

        try {
            const method = editingIndex !== null ? "PUT" : "POST";
            const url    = editingIndex !== null
                ? `${API}/bookings/${bookings[editingIndex].id}`
                : `${API}/bookings`;

            const body = { userId: 1, date: selectedDate, time: selectedTime, people: Number(people), duration: Number(duration) };
            console.log("POST body:", body); // 👈

            const res  = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            console.log("POST response:", res.status, data); // 👈
            if (!res.ok) { notifyBook(data.message || "Booking failed.", "error"); return; }

            fetchBookings();

            notifyBook(editingIndex !== null ? "Booking updated!" : "Booking added successfully!");
            setEditingIndex(null);
            setSelectedDate(""); setSelectedTime(""); setPeople(""); setDuration(null);
        } catch (err) {
            console.error("Save error:", err); // 👈
            notifyBook("Server error. Please try again.", "error");
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`${API}/bookings/${deleteId}`, { method: "DELETE" });
            fetchBookings();
            setDeleteId(null);
            notifyBook("Booking cancelled.");
        } catch {
            notifyBook("Failed to delete.", "error");
        }
    };

    const confirmAll = () => {
        if (selectedRows.length === 0) {
            showConfirm("Select at least one booking to confirm.", "error");
            return;
        }
        showConfirm(
            `${selectedRows.length} booking${selectedRows.length > 1 ? "s" : ""} confirmed — check your email!`,
            "success"
        );
        setBookings(prev => prev.filter((_, i) => !selectedRows.includes(i)));
        setSelectedRows([]);
    };

    // ─── ALERT COMPONENT ─────────────────────────────────────────────────────

    const AlertPlaceholder = ({ msg, type }) => (
        <div style={{ minHeight: "44px", marginBottom: "8px", display: "flex", alignItems: "center" }}>
            {msg && (
                <div style={{
                    width: "100%", padding: "10px 14px", borderRadius: "10px",
                    fontSize: "14px", fontWeight: "500",
                    display: "flex", alignItems: "center", gap: "8px",
                    background: type === "success" ? "#f0fdf4" : "#fef2f2",
                    color:      type === "success" ? "#16a34a" : "#dc2626",
                    border:    `1px solid ${type === "success" ? "#bbf7d0" : "#fecaca"}`,
                }}>
                    {type === "success" ? "✅" : "⚠️"} {msg}
                </div>
            )}
        </div>
    );

    // ─── RENDER ───────────────────────────────────────────────────────────────

    return (
        <div className="booking-page" style={{ paddingTop: "100px" }}>
            {/* NAVBAR */}
            <div style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                transition: "transform 0.3s ease",
                transform: showNav ? "translateY(0)" : "translateY(-100%)"
            }}>
                <UserNavbar absolute={false} />
            </div>

            {/* DELETE MODAL */}
            {deleteId && (
                <div style={{
                    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                    zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <div style={{
                        background: "white", borderRadius: "16px", padding: "32px",
                        maxWidth: "400px", width: "90%", textAlign: "center",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
                    }}>
                        <h3 style={{ margin: "0 0 10px", color: "#0f172a" }}>Cancel Booking?</h3>
                        <p style={{ color: "#64748b", margin: "0 0 24px" }}>This cannot be undone.</p>
                        <div style={{ display: "flex", gap: "12px" }}>
                            <button onClick={() => setDeleteId(null)} style={{
                                flex: 1, padding: "12px", borderRadius: "8px",
                                border: "1px solid #cbd5e1", background: "white",
                                cursor: "pointer", fontWeight: "600"
                            }}>Keep it</button>
                            <button onClick={handleDelete} style={{
                                flex: 1, padding: "12px", borderRadius: "8px",
                                border: "none", background: "#ef4444",
                                color: "white", cursor: "pointer", fontWeight: "600"
                            }}>Yes, Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="booking-container">

                {/* ── SIDEBAR ── */}
                <aside style={{ flex: "1", minWidth: "220px" }}>

                    {/* LIVE STATUS */}
                    <div className="booking-card">
                        <h3>Live Status</h3>
                        <p>Status: <span style={{ color: '#16a34a', fontWeight: 'bold' }}>Open</span></p>
                        {(() => {
                            const taken = selectedTime ? getSlotCount(selectedTime, selectedDate || today) : 0;
                            const avail = Math.max(TOTAL_SEATS - taken, 0);
                            const p     = Math.min((taken / TOTAL_SEATS) * 100, 100);
                            const color = p >= 100 ? '#ef4444' : p > 60 ? '#f59e0b' : '#22c55e';
                            return (
                                <>
                                    <p style={{ fontSize: '13px', margin: '8px 0 4px' }}>
                                        Available Seats <strong>{avail}/{TOTAL_SEATS}</strong>
                                    </p>
                                    <div className="bar-bg" style={{ height: '10px', marginBottom: '8px' }}>
                                        {selectedTime && (
                                            <div className="bar-fill" style={{ width: `${p}%`, background: color }} />
                                        )}
                                    </div>
                                </>
                            );
                        })()}
                        <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                            {selectedTime ? `Slot: ${selectedTime}` : "Select a time to see availability"}
                        </p>
                    </div>

                    {/* BUSY HOURS */}
                    <div className="booking-card">
                        <h3>Busy Hours Today</h3>
                        {times.map(t => {
                            const count  = getSlotCount(t, today);
                            const p      = Math.min((count / TOTAL_SEATS) * 100, 100);
                            const isFull = count >= TOTAL_SEATS;
                            const color  = isFull ? '#ef4444' : p > 60 ? '#f59e0b' : '#22c55e';
                            return (
                                <div className="hour" key={t}>
                                    <span style={{ minWidth: '70px' }}>{t}</span>
                                    <div className="bar-bg" style={{ flex: 1 }}>
                                        <div className="bar-fill" style={{ width: `${p}%`, background: color }} />
                                    </div>
                                    {isFull
                                        ? <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 'bold', minWidth: '35px' }}>Full</span>
                                        : <span style={{ fontSize: '11px', minWidth: '35px' }}>{count}/{TOTAL_SEATS}</span>
                                    }
                                </div>
                            );
                        })}
                    </div>

                </aside>

                {/* ── MAIN ── */}
                <main style={{ flex: "2.5", minWidth: 0 }}>
                    <h1 style={{ marginTop: 0 }}>Book Your Study Seat</h1>

                    {/* YOUR BOOKINGS */}
                    <div style={{
                        background: "#fff", borderRadius: "16px", padding: "24px",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "24px"
                    }}>
                        <h2 style={{ marginTop: 0 }}>Your Bookings</h2>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                                <thead>
                                    <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                                        {["", "Date", "Time", "People", "Duration", "Actions"].map(h => (
                                            <th key={h} style={{
                                                padding: "10px 12px", textAlign: "left",
                                                fontWeight: "600", color: "#374151",
                                                fontSize: "13px", whiteSpace: "nowrap"
                                            }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} style={{
                                                textAlign: "center", color: "#94a3b8", padding: "32px"
                                            }}>No bookings yet</td>
                                        </tr>
                                    ) : bookings.map((b, i) => (
                                        <tr key={b.id} style={{
                                            borderBottom: "1px solid #f1f5f9",
                                            background: selectedRows.includes(i) ? "#f0f9ff" : "#fff",
                                            transition: "background 0.15s"
                                        }}>
                                            <td style={{ padding: "10px 12px" }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(i)}
                                                    onChange={() => {
                                                        const isChecked = selectedRows.includes(i);
                                                        setSelectedRows(prev =>
                                                            isChecked ? prev.filter(x => x !== i) : [...prev, i]
                                                        );
                                                        if (!isChecked) {
                                                            const bookingDate = b.date ? b.date.split("T")[0] : "";
                                                            const bookingTime = b.TimeSlot?.time || b.time || "";
                                                            if (bookingDate) setSelectedDate(bookingDate);
                                                            if (bookingTime) setSelectedTime(bookingTime);
                                                        }
                                                    }}
                                                    style={{ cursor: "pointer", width: "16px", height: "16px" }}
                                                />
                                            </td>
                                            <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>{b.date?.split("T")[0]}</td>
                                            <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>{b.TimeSlot?.time || b.time}</td>
                                            <td style={{ padding: "10px 12px" }}>{b.people}</td>
                                            <td style={{ padding: "10px 12px" }}>{b.duration}h</td>
                                            <td style={{ padding: "10px 12px" }}>
                                                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                                    <button
                                                        title="Edit"
                                                        onClick={() => {
                                                            setEditingIndex(i);
                                                            setSelectedDate(b.date?.split("T")[0]);
                                                            setSelectedTime(b.TimeSlot?.time || b.time);
                                                            setPeople(b.people);
                                                            setDuration(b.duration);
                                                        }}
                                                        style={{
                                                            display: "inline-flex", alignItems: "center",
                                                            justifyContent: "center", padding: "6px 12px",
                                                            borderRadius: "6px", border: "1px solid #cbd5e1",
                                                            background: "#f8fafc", cursor: "pointer",
                                                            fontSize: "14px", lineHeight: 1
                                                        }}
                                                    >✏️</button>
                                                    <button
                                                        title="Delete"
                                                        onClick={() => setDeleteId(b.id)}
                                                        style={{
                                                            display: "inline-flex", alignItems: "center",
                                                            justifyContent: "center", padding: "6px 12px",
                                                            borderRadius: "6px", border: "1px solid #fecaca",
                                                            background: "#fff5f5", cursor: "pointer",
                                                            fontSize: "14px", lineHeight: 1
                                                        }}
                                                    >🗑️</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <AlertPlaceholder
                            msg={showConfirmAlert ? confirmAlertText : ""}
                            type={confirmAlertType}
                        />

                        <button
                            onClick={confirmAll}
                            disabled={bookings.length === 0}
                            style={{
                                width: "100%", minHeight: "48px", padding: "0 20px",
                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                background: bookings.length === 0 ? "#94a3b8" : "#0f172a",
                                color: "white", border: "none", borderRadius: "10px",
                                fontWeight: "700", fontSize: "15px",
                                cursor: bookings.length === 0 ? "not-allowed" : "pointer",
                                transition: "background 0.2s", whiteSpace: "nowrap",
                            }}
                        >
                            {selectedRows.length > 0
                                ? `Confirm ${selectedRows.length} Booking${selectedRows.length > 1 ? "s" : ""}`
                                : "Confirm"}
                        </button>
                    </div>

                    {/* RESERVE FORM */}
                    <div className="booking-card">
                        <h3 style={{ marginTop: 0 }}>Reserve Your Seat</h3>
                        <div className="reserve-inputs">
                            <div className="input-group">
                                <label>Date</label>
                                <input
                                    type="date" className="input-field"
                                    min={today} value={selectedDate}
                                    onChange={e => setSelectedDate(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Time</label>
                                <select className="input-field" value={selectedTime}
                                    onChange={e => setSelectedTime(e.target.value)}>
                                    <option value="">Select time</option>
                                    {times.map(t => {
                                        const count  = getSlotCount(t, selectedDate || today);
                                        const isFull = count >= TOTAL_SEATS;
                                        return (
                                            <option key={t} value={t} disabled={isFull}>
                                                {t}{isFull ? " — Full" : count > 0 ? ` (${TOTAL_SEATS - count} left)` : ""}
                                            </option>
                                        );
                                    })}
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

                        <label style={{ fontWeight: "700", fontSize: "14px" }}>Duration</label>
                        <div className="duration-flex">
                            {[1, 2].map(d => (
                                <div key={d}
                                    className={`dur-option ${duration === d ? "active" : ""}`}
                                    onClick={() => setDuration(d)}>
                                    {d} Hour{d > 1 ? "s" : ""}
                                </div>
                            ))}
                        </div>

                        <AlertPlaceholder msg={bookMsg.text} type={bookMsg.type} />

                        <button className="btn-navy" onClick={handleSave}
                            style={{ minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                            {editingIndex !== null ? "Update Booking" : "Book"}
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
