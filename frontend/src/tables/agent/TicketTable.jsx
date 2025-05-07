// styles
import table from './ticket-table.module.css'
import general from '../styles/general-table-styles.module.css'

// api
const ticketURL = import.meta.env.VITE_TICKET_API;

// react 
import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';

// comp
import { Dropdown, SearchBar } from '../components/General';

export function TicketHeader() {
  return(
    <tr className={table.header}>
      <th className={table.th}>Ticket No.</th>
      <th className={table.th}>Subject</th>
      <th className={table.th}>Customer</th>
      <th className={table.th}>Priority</th>
      <th className={table.th}>Opened On</th>
      <th className={table.th}>SLA</th>
      <th className={table.th}>Status</th>
      <th className={table.th}>Action</th>
    </tr>
  );
}

export function TicketItem({ ticket }) {
  return(
    <tr className={table.item}>
      <td className={table.ticketID}>{ticket.ticket_id}</td>
      <td className={table.ticketSubject}>{ticket.subject}</td> 
      <td className={table.tickeCustomer}>{ticket.customer}</td>
      <td>
        <div className={general[`priority-${ticket.priority.toLowerCase()}`]}>{ticket.priority}</div>
      </td>
      <td className={table.ticketOpenedOn}>{ticket.opened_on}</td>
      <td className={table.ticketSLA}>{ticket.sla}</td>
      <td>
        <div className={general[`status-${ticket.status.replace(/\s+/g, '-').toLowerCase()}`]}>{ticket.status}</div>
      </td>
      <td className={table.ticketButton}>
        <button className={general.viewButton}>View</button>  {/* onClick={() => handleView(ticket.ticket_id)} */}
      </td> 
    </tr>
  );
}

export default function TicketTable() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState('');  

  // Priority
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState('');

  // Status
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('')

  // Searcbar
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get(ticketURL)
      .then((response) => {
        // fetch tickets
        const allTickets = response.data;
        setTickets(allTickets);

        // fetch priority
        const priorities = [...new Set(allTickets.map(ticket => ticket.priority))];
        setPriorityOptions(priorities);

        // fetct status
        const status = [...new Set(allTickets.map(ticket => ticket.status))];
        setStatusOptions(status);

        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, [])

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (error) {
    return <div>{error}</div>;  
  }

  return(
    <div className={table.ticketTable}>

      <div className={table.ticketTableLeft}>
        <div className={table.headerSection}>
          <div className={table.title}>Filter</div>
          <div>
            <button 
            className={table.resetButton}
            onClick={() => {
            setSelectedPriority('');
            setSelectedStatus('');
            // alert('Filter Reset!'); 
            }}>
            Reset
          </button> 
          </div>
        </div>
        <div className={table.filterSection}>
          <div className={table.title}>Priority</div>
          {/* Priority */}
          <Dropdown
            name="priority"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            options={priorityOptions}
            placeholder="Filter by Priority"
          />
        </div>
        <div className={table.filterSection}>
          <div className={table.title}>Status</div>
            {/* Status */}
            <Dropdown 
            name="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            options={statusOptions}
            placeholder="Filter by Status"
          />
        </div>
      </div>

      <div className={table.ticketTableRight}>
        <div className={table.searchBar}>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>
        <div className={table.ticketTableWrapper}>
          <table className={table.ticketPageTable}>
            <thead>
              <TicketHeader />
            </thead>
            <tbody>
              {tickets
                .filter(ticket => {
                  const priorityMatch = !selectedPriority || ticket.priority === selectedPriority;
                  const statusMatch = !selectedStatus || ticket.status === selectedStatus;
                  const searchMatch = !searchTerm || (
                    ticket.ticket_id.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                    ticket.subject.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                    ticket.customer.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) 
                  )
                  // const dateMatch = !selectedDate || ticket.opened_on === selectedDate;
                  return priorityMatch && statusMatch && searchMatch;;
                })
                .map(ticket => (
                  <TicketItem key={ticket.ticket_id} ticket={ticket} />
                ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}