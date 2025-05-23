import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'; 

// style
import styles from "./admin-nav.module.css";

// components
import DateBanner from '../datetime-banner/DateBanner';
import NotifModal from '../../modals/notif-action/NotifModal';
import ProfileModal from '../../modals/profile-action/ProfileModal';

export default function AdminNav() {
  const location = useLocation();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openNotifModal, setOpenNotifModal] = useState(false);

    const handleAvatarClick = () => {
      setOpenProfileModal(prevState => !prevState)
      setOpenNotifModal(false); // close notif modal if open
    }

    const handleNotifClick = () => {
      setOpenNotifModal(prev => !prev);
      setOpenProfileModal(false); // close profile modal if open
    };

    // modal close when the page is resize
    useEffect(() => {
        const handleResize = () => {
          setUserMenuOpen(false);
          setOpenProfileModal(false); 
          setOpenNotifModal(false);
        };
    
        window.addEventListener('resize', handleResize);
    
        // clean event listener
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []); 

    // Burger Menu
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
      setUserMenuOpen(false);
    };

    // Three dots Menu
    const [userMenuOpen, setUserMenuOpen] = useState(false); 
    const toggleUserMenu = () => {
      setUserMenuOpen(prev => !prev);
      setMenuOpen(false);
      setOpenProfileModal(false); 
      setOpenNotifModal(false);
    };  

    // Click outside the modal
    const notifRef = useRef(null);
    const profileRef = useRef(null);
  
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (openNotifModal && notifRef.current && !notifRef.current.contains(event.target)) {
        setOpenNotifModal(false);
      }
      if (openProfileModal && profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfileModal(false);
      }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [openNotifModal, openProfileModal]);

  return(
    <>
    {openNotifModal && (
      <div ref={notifRef}>
        <NotifModal />
      </div>
    )}

    {openProfileModal && (
      <div ref={profileRef}>
        <ProfileModal />
      </div>
    )}
    <nav className={styles.navBar}> 
          <div className={styles.logoSection}> 
            <div className={styles.logoImg}>
              <img src="/logotixx.png" alt="logo" />
            </div>
            <p>TicketFlow</p>
          </div>

      {/* nav-links */}
      <div className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
        <NavLink
          to="/admin"
          end
          className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Dashboard</NavLink>
        <NavLink
          to="/admin/agent"
          className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Agent</NavLink>
        <NavLink
          to="/admin/workflow"
          className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Workflow</NavLink>
        <NavLink
          to="/admin/archive"
          className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Archive</NavLink>
      </div>

      <div className={`${styles.userSection} ${userMenuOpen ? styles.userSectionOpen : ''}`}>
        <div className={styles.notifBell} onClick={handleNotifClick}>
          <i className="fa fa-bell"></i>
        </div>
        <img className={styles.userAvatar} src="https://i.pinimg.com/736x/e6/50/7f/e6507f42d79520263d8d952633cedcf2.jpg" alt="Anime Avatar"onClick={handleAvatarClick}></img>
        <div className={styles.nameSection}>
          <p className={styles.name}>Username</p>
          <p className={styles.role}>Admin Account</p>
        </div>
      </div>

      {/* Mobile view */}
      
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
       </div>

      <div className={styles.mobileDots} onClick={toggleUserMenu}>
        <span>⋯</span>
      </div>

    </nav>
    <DateBanner className="adminNav"/>
    </>
  )
}