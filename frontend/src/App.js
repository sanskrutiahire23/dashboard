import React, { useState } from "react";
import "./App.css";
import Courses from "./components/Courses";
import Mycourses from "./components/Mycourses";
import Session from "./components/Session";
import Login from "./components/Login";
import { logout } from "./components/Firebaseconfig";

const Sidebar = ({ activeSection, setActiveSection, handleLogout, user }) => {
    return (
        <div className="sidebar">
            <h2>FACULTYPATHS</h2>
            <ul>
                <li className={activeSection === "home" ? "active" : ""} onClick={() => setActiveSection("home")}>🏠 Home</li>
                
                {/* Disable links if not signed in */}
                <li className={user ? (activeSection === "sessionSchedule" ? "active" : "") : "disabled"} 
                    onClick={() => user && setActiveSection("sessionSchedule")}>📅 Session Schedule</li>
                
                <li className={user ? (activeSection === "resources" ? "active" : "") : "disabled"} 
                    onClick={() => user && setActiveSection("resources")}>📖 Course</li>
                
                <li className={user ? (activeSection === "mycourse" ? "active" : "") : "disabled"} 
                    onClick={() => user && setActiveSection("mycourse")}>💳 My Courses</li>

                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li onClick={handleLogout}>🚪 Logout</li>
            </ul>
        </div>
    );
};

const Header = ({ user }) => (
    <header className="header">
        <h1>
            👋 Hello, {user ? user.displayName : "Student"}!
        </h1>
        <p>{user ? `Email: ${user.email}` : ""}</p>  
    </header>
);

const HeroSection = () => (
    <section className="hero">
        <div className="hero-text">
            <h2>Welcome to Your Learning Journey!</h2>
            <p>Find learning paths made just for you and connect with mentors to reach your goals. Get resources, track your progress, and explore career opportunities easily!</p>
            <button className="goal-btn">Set Goals</button>
        </div>
        <img src="https://www.freeiconspng.com/thumbs/education-png/education-png-0.png" alt="Learning Illustration" />
    </section>
);

const Stats = () => (
    <div className="stats">
        <div className="stat">📊 <b>Courses Completed <br /> <span>07</span></b></div>
        <div className="stat">📈 <b>Assignments Completed <br /> <span>07</span></b></div>
        <div className="stat">🏆 <b>Projects Completed <br /> <span>07</span></b></div>
    </div>
);

const Progress = () => (
    <div className="progress">
        <h2>Overall Progress</h2>
        <div className="progress-circle">62%</div>
        <div className="progress-bar">📊 Assessments 81%</div>
        <div className="progress-bar">📚 Courses 81%</div>
    </div>
);

const MainContent = ({ activeSection, user }) => {
    if (!user) {
        return (
          <div className="cont">
          <h2>🔒 Please Sign In to Access Content</h2>
          <p>Sign in to easily manage your courses, set events, and schedule sessions.</p>
          <div className="action-cards">
            <div className="card">
              <h3>📚 Access Courses</h3>
              <p>Explore a wide range of online courses and track your progress.</p>
              <button className="action-btn">Access Courses</button>
            </div>
            <div className="card">
              <h3>⏰ Set Time & Events</h3>
              <p>Schedule your learning sessions and manage your time efficiently.</p>
              <button className="action-btn">Set Time & Events</button>
            </div>
            <div className="card">
              <h3>📅 Manage Sessions</h3>
              <p>Stay on top of your learning with scheduled sessions and notifications.</p>
              <button className="action-btn">Manage Sessions</button>
            </div>
          </div>
           
        </div>
        
        );
    }

    const renderContent = () => {
        switch (activeSection) {
            case "home":
                return (
                    <>
                        <HeroSection />
                        <Stats />
                        <Progress />
                    </>
                );
            case "sessionSchedule":
                return <Session />;
            case "resources":
                return <Courses />;
            case "mycourse":
                return <Mycourses />;
            default:
                return (
                    <>
                        <HeroSection />
                        <Stats />
                        <Progress />
                    </>
                );
        }
    };

    return <div className="main-content">{renderContent()}</div>;
};

const App = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [user, setUser] = useState(null);

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    return (
        <div className="app">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} handleLogout={handleLogout} user={user} />
            <div className="content-area">
                <Header user={user} />
                <Login setUser={setUser} />
                <MainContent activeSection={activeSection} user={user} />
            </div>
        </div>
    );
};

export default App;
