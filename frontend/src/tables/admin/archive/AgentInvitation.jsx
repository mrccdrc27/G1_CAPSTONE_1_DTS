// dependencies import
import axios from "axios";
import { useEffect, useState } from "react";

// styles import
import table from "../../styles/general-table.module.css";
import layout from "./AgentInvitation.module.css";

// Api Import
const ticketURL = import.meta.env.VITE_ARCHIVE_API;

// component import
import { Pagination } from "../../components/tableforms";
import { SearchBar, Dropdown, AgentStatus } from "../../components/tableforms";


function TableHeader() {
  // Inline styles for the width of each rows
  return(
      <tr className={table.tr}>
        <th className={table.th} style={{ width: '15%' }}>TicketID</th>
        <th className={table.th} style={{ width: '15%' }}>Subject</th>
        <th className={table.th} style={{ width: '15%' }}>Customer</th>
        <th className={table.th} style={{ width: '15%' }}>Status</th>
        <th className={table.th} style={{ width: '15%' }}>Resolved On</th>
        <th className={table.th} style={{ width: '15%' }}>Resolved By</th>
        <th className={table.th} style={{ width: '10%',
           display: 'table-cell', 
           textAlign: 'center', 
           verticalAlign: 'middle'  
           }}>Action</th>
      </tr>
  )
}

function TableRow(props) {
  return(
    <tr className={table.tr}>
      <td className={table.td}>{props.TicketID}</td>
      <td className={table.td}>{props.Subject}</td>
      <td className={table.td}>{props.Customer}</td>
      <td className={table.td}>
      <AgentStatus status={props.Status}/>
      </td>
      <td className={table.td}>{props.ResolvedOn}</td>
      <td className={table.td}>{props.ResolvedBy}</td>

      <td className={table.td}
      style={{
        display: 'table-cell',
        textAlign: 'center'
      }}>
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </td>

    </tr>
  )
}

function Title(props) {
  return(
    <div>
    <div className={layout.header}>
      <b>
          <p>{props.title}</p>
      </b>  
    </div>
  </div>
  )
}

function Filters() {
  return(
    <>
    <div className={layout.filters}>

        <div className={layout.title}>
            <b>
                <p>Filter</p>
            </b>
                <p
                style={{color: 'red'}}
                >Reset</p>
        </div>
        <hr/>
        <Title title='Status'/>
        
        <div className={layout.row}>
          <p>Approved</p>
          <input type="checkbox" id="option1" />
        </div>
        <div className={layout.row}>
          <p>Rejected</p>
          <input type="checkbox" id="option2" />
        </div>
        <hr/>


        <Title title='Date Range'/>
        <Dropdown title='Start Date'/>
        <Dropdown title='End Date'/>
        <Title title='Department'/>
        <Dropdown/>
        <hr/>
    </div>
    </>
  )
}

function AgentInvitation() {
  const [agents, setAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // rows per page

  useEffect(() => {
    axios
      .get(`${ticketURL}`)
      .then((response) => {
        const data = response.data;
        setAgents(Array.isArray(data) ? data : data.agents || []);
      })
      .catch((error) => {
        console.error("Failed to fetch agents", error);
      });
  }, []);

  // pagination calculations
  const totalPages = Math.ceil(agents.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pagedAgents = agents.slice(start, start + itemsPerPage);

  const handleManage = (id) => {
    console.log("Manage agent", id);
  };

  return (
    <div className={layout.whole}>
        <Filters/>
        <div className={layout.right}>
            <SearchBar/>
            <div className={table.tableborder}>
            <div className={table.tablewrapper}>
                <table className={table.tablecontainer}>
                <thead>
                    <TableHeader />
                </thead>
                <tbody>
                    {pagedAgents.map((agent) => (
                    <TableRow
                        Name={agent.ID}
                        ID={agent.ID}
                        TicketID={agent.ticket_id}
                        Customer={agent.customer}
                        Status={agent.status}
                        Subject={agent.subject}
                        ResolvedOn={agent.resolved_on}
                        ResolvedBy={agent.resolved_by}
                        onManage={handleManage}
                    />
                    ))}
                </tbody>
                </table>
            </div>
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    </div>
  );
}

export default AgentInvitation;