import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigation = useNavigate();

    const backToHome = () => {
        navigation("/")
    }
  return (
    <div className='main-navbar'>

        <div className='inner'>
            <div className='left-side'>
                <h3 onClick={backToHome}>School Management</h3>
            </div>
            <div className='right-side'>
                <ul>
                    <li><Link to="/students">Students List</Link></li>
                    <li><Link to="/teacher">Teacher Registration</Link></li>
                    <li><Link to="/subject">Subject</Link></li>
                    <li><Link to="/subject-list">Subject List</Link></li>
                </ul>
            </div>

            {/* <div className='logout-sec'>
                <Link></Link>
            </div> */}
        </div>
    </div>
  )
}

export default Navbar