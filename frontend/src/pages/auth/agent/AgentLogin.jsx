import styles from "./agent-login.module.css";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginMainSection}>
        <div className={styles.loginLeftSection}>
        </div>
        
        <div className={styles.loginRightSection}>
          <div className={styles.loginTopHeader}>
            <div className={styles.loginLogo}>
              <img src="/logotixx.png" alt="logo" />
            </div>
            <div className={styles.loginTitle}>
              <h3>Ticket<span>Flow</span></h3>
              <p>Flow-based Assignment & Ticket Tracking System</p>
            </div>
          </div>
          <div className={styles.loginBotInputs}>
            <form className={styles.loginForm} onSubmit={(e) => {e.preventDefault(); navigate('/agent');}}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email address"/>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password"/>
              </div>
              <div className={styles.forgotPassword}>
                <a href="#">Forgot password?</a>
              </div>
              <button className={styles.loginBtn}>Log In</button>
              <a href="/admin">Login as admin</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
