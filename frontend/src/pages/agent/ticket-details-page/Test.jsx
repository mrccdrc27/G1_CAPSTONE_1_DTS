// Imports

// components
import AgentNav from "../../../components/navigations/agent-nav/AgentNav"

// style
import styles from './test.module.css'

export default function Test() {
  return(
    <>
    <AgentNav />
    <main className={styles.ticketDetailPage}>
      <section className={styles.tdTopSection}>
        <div className={styles.tdBack}>
          <i className="fa fa-chevron-left"></i>
        </div>
        <div className={styles.tdLabel}>
          <p>Ticket Details</p>
        </div>
      </section>

      <section className={styles.tdBotSection}>
        <div className={styles.tdLeftSection}>
          <div className={styles.tdHeader}>
            <h3 className={styles.tdTitle}>Ticket No.</h3>
            <p className={styles.tdSubject}><strong>Subject:  </strong>Pepe</p>
            <div className={styles.tdMetaData}>
              <p className={styles.tdDateOpened}>Opened On: pepe</p>
              <p className={styles.tdDateResolution}>Expected Resolution: pepe</p>
            </div>
          </div>

          <div className={styles.tdDescription}>
            <h3>Description</h3>
            <p>pepe</p>
          </div>

          <div className={styles.tdAttachment}>
            <h3>Attachment</h3>
            <div className={styles.tdAttached}>
              <i className="fa fa-upload"></i>
              <span className={styles.placeholderText}>No file attached</span>
              <input
                type="file"
                id="file-upload"
                accept=".pdf, .jpg, .jpeg, .docx"
                style={{ display: 'none' }} 
              />
            </div>
          </div>

          <div className={styles.tdComment}>
            <div className={styles.tdUserProfile}><img src="https://i.pinimg.com/736x/e6/50/7f/e6507f42d79520263d8d952633cedcf2.jpg" alt="Profile" /></div>
            <input type="text" className={styles.tdCommentInput} placeholder="Add comment here..." />
          </div>

          <div className={styles.tdCommentSection}>
            <h3>Comment</h3>
            <div className={styles.tdCommentItem}>
              <div className={styles.tdUserProfile}><img src="https://i.pinimg.com/736x/e6/50/7f/e6507f42d79520263d8d952633cedcf2.jpg" alt="Profile" /></div>
              <div className={styles.tdCommentContent}>
                <div className={styles.tdCommentHeader}>
                  <div className={styles.tdUserName}><strong>pepe</strong></div>
                  <div className={styles.tdCommentDate}>mm-dd-yy</div>
                </div>
                <div className={styles.tdCommentContent}>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum iste fugiat excepturi facere. Perspiciatis eveniet at unde quaerat, tempore aliquid sit autem est molestias sapiente labore blanditiis et modi necessitatibus.</p>
                </div>
                <div className={styles.tdCommentActions}>
                  <span className={styles.tdCommentAction}>Reply</span>
                  <span className={styles.tdCommentAction}>Edit</span>
                  <span className={styles.tdCommentAction}>Delete</span>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div className={styles.tdRightSection}>
          hello
        </div>
      </section>
    </main>
    </>
  )
}