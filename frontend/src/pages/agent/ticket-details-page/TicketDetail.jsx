// import { useParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import styles from "./styles/agent-styles/ticket-detail.module.css";

// import TicketAction from '../../components/TicketAction';

// function TicketDetail() {
//   const [openTicketAction, setOpenTicketAction] = useState(false);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [ticket, setTicket] = useState(null);

//   useEffect(() => {
//     const fetchticket = async () => {
//       const response = await fetch(`http://localhost:5000/tickets?ticket_id=${id}`);
//       const data = await response.json();
//       setTicket(data[0]);
//     };

//     fetchticket();
//   }, [id]);

//   if (!ticket) return <p>Loading...</p>;

//   return (
//     <div className={styles.ticketDetailPage}>
//       {openTicketAction && (
//         <div className={styles.ticketActionSection}>
//           <TicketAction closeTicketAction={setOpenTicketAction} />
//         </div>
//       )}

//       <div className={styles.topTicketDetail}>
//         <button className={styles.backButton} onClick={() => navigate(-1)}>Back</button>
//       </div>

//       <div className={styles.botTicketDetail}>
//         <div className={styles.leftTicketDetails}>
//           <div className={styles.tdTitleCont}>
//             <h3 className={styles.tdTitle}>Ticket No.{ticket.ticket_id}</h3>
//             <p className={styles.tdSubject}><strong>Subject:</strong> {ticket.subject}</p>
//             <div className={styles.tdMeta}>
//               <p>Started: {ticket.opened_on}</p>
//               <p>Expected Resolution:</p>
//             </div>
//           </div>

//           <div className={styles.tdDescription}>
//             <h3>Description</h3>
//             <p>{ticket.description}</p>
//           </div>

//           <div className={styles.tdAttachment}>
//             <h3>Attachment</h3>
//             <p>pdf</p>
//           </div>

//           <div className={styles.tdComment}>
//             <div className={styles.tdCommenterAvatar}></div>
//             <input type="text" className={styles.commentInput} placeholder="Add a comment..." />
//           </div>

//           <div className={styles.tdCommentSection}>
//             <div className={styles.commenterAvatar}></div>
//             <div className={styles.commentContent}>
//               <div className={styles.commentHeader}>
//                 <div className={styles.commenterName}>John Smith</div>
//                 <div className={styles.commentDate}>mm-dd-yy</div>
//               </div>
//               <div className={styles.commentText}>
//                 Lorem ipsum dolor sit amet...
//               </div>
//               <div className={styles.commentActions}>
//                 <span className={styles.commentAction}>Reply</span>
//                 <span className={styles.commentAction}>Edit</span>
//                 <span className={styles.commentAction}>Delete</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={styles.rightTicketDetails}>
//           <button
//             className={styles.actionButton}
//             onClick={() => { setOpenTicketAction(true); handleView(ticket.ticket_id); }}
//           >
//             Make an Action
//           </button>
//           <div className={styles.tdStatusCard}>
//             <div className={styles.tdStatusLabel}>Status:</div>
//             <div className={styles.tdStatusBadge}>{ticket.status}</div>
//           </div>
//           <div className={styles.tdInfoItem}>
//             {["Priority", "Ticket Owner", "Department", "Position", "SLA"].map((label, i) => (
//               <div className={styles.tdInfoLabelValue} key={i}>
//                 <div className={styles.tdInfoLabel}>{label}</div>
//                 <div className={styles.tdInfoValue}>{ticket[label.toLowerCase().replace(" ", "_")]}</div>
//               </div>
//             ))}
//           </div>

//           <div className={styles.tdActivityLog}>
//             <div className={styles.tdActivityLogTitle}>Activity Log</div>
//             <div className={styles.tdActivityLogContent}>
//               <div className={styles.activityTitle}>April 1, 9:31 AM</div>
//               <div className={styles.activityText}>Status to open</div>
//               <div className={styles.activityText}>
//                 Lorem ipsum dolor sit amet...
//               </div>
//               <div className={styles.activityFooter}>By Sarah Johnson | admin</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TicketDetail;
