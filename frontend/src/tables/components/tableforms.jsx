import styles from './tableforms.module.css'
import form from './general-form.module.css'

export function Pagination({ currentPage, totalPages, setCurrentPage }) {
    return (
      <div  className={styles.paginationControls}>
        <button
        className={`${form.circlebutton} ${form.btn}`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
            {'<'}
        </button>
  
        <span className={styles.text}>
            Page {currentPage} of {totalPages}
        </span>
  
        <button
        className={`${form.circlebutton} ${form.btn}`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
            {'>'}
        </button>
      </div>
    );
}

export function RecentTask (props) {
    return (
        <>
        <div className={styles.RecentTaskItem}>
            <div className={styles.wrapper3}>
                <div className={styles.RecentTaskAccent}></div>
            </div>
            <div className={styles.wrapper4}>
                <span className={styles.text}>dd/mm/yy</span>
                <span className={styles.text}>{props.text}</span>
            </div>

        </div>
        </>
    )
}

// Non-functional Props
export function SearchBar(props) {
    return (
        <div className={form.FormContainer}>
            <div className={form.SearchBarContainer}>
                    <i class="fas fa-search"
                    style={{paddingRight:'10px'}}></i>       
                <input 
                    className={form.SearchBar}
                    type="text" 
                    placeholder="Search by ticket ID or keywords..." />
            </div>
            <button
            className={form.btn}>Filter</button>
        </div>
    )
}

export function Dropdown(props) {
    return(
        <>
        <div className={styles.filters}>
            <p>{props.title}</p>
            <select 
            className={form.dropdown}
            id="time-period">
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="all-time">All Time</option>
            </select>
        </div>
    </>
    )
}

export function AgentStatus({ status }) {
    // Define colors for different statuses
    const statusColors = {
        'Active': 'green',
        'Pending': 'gray',
        'Suspended': 'red',
        'Inactive': 'gray',
        'Disabled': 'red',
        'resolved':'green',
        'cancelled':'red',
    };

    return (
        <div
        style={{
            height: '30%',
            display: 'flex',
            backgroundColor: statusColors[status] || 'blue', // Default color if status is unknown
            borderRadius: '4px',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white', // Ensures text is visible on dark backgrounds
            padding: '12px',
            width: 'auto', // Corrected syntax
        }}
        >
            {status}
        </div>
    );
}

