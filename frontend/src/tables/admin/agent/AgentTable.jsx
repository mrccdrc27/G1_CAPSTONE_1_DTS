// dependencies import
import axios from "axios";
import { useEffect, useState } from "react";

// styles import
import table from "../../styles/general-table.module.css";
import layout from "./AgentTable.module.css";

// Api Import
const ticketURL = import.meta.env.VITE_AGENTS_API;

// component import
import { Pagination } from "../../components/tableforms";
import { SearchBar, Dropdown, AgentStatus } from "../../components/tableforms";


function TableHeader() {
  // Inline styles for the width of each rows
  return(
      <tr className={table.tr}>
        <th className={table.th} style={{
          width: '10%',
          display: 'table-cell', 
          textAlign: 'center', 
          verticalAlign: 'middle' 
          }}>Photo</th>
        <th className={table.th} style={{ width: '20%' }}>Name</th>
        <th className={table.th} style={{ width: '20%' }}>Email</th>
        <th className={table.th} style={{ width: '20%' }}>Department</th>
        <th className={table.th} style={{ width: '10%' }}>Role</th>
        <th className={table.th} style={{ width: '10%' }}>Status</th>
        <th className={table.th} style={{ width: '20%' }}>Last Login</th>
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
      <td className={table.td} 
        style={{ 
          display: 'table-cell', 
          textAlign: 'center', 
          verticalAlign: 'middle' 
        }}>
          <img src="https://wonderfulengineering.com/wp-content/uploads/2014/10/image-wallpaper-15.jpg"  
              style={{ 
                display: 'block', 
                margin: 'auto',
                height: '30px',
                width: '30px',
                borderRadius: '50px' }} />
      </td>
      <td className={table.td}>{props.Name}</td>
      <td className={table.td}>{props.Email}</td>
      <td className={table.td}>Department</td>
      <td className={table.td}>{props.Role}</td>
      <td className={table.td}>
        <AgentStatus status={props.Status}/>
      </td>
      <td className={table.td}>{props.LastLogin || '—'}</td>

      <td className={table.td}
      style={{
        display: 'table-cell',
        textAlign: 'center'
      }}>
        <i class="fa-solid fa-user-pen"></i>
      </td>

    </tr>
  )
}

function Filters() {
  return(
    <>
    <div className={layout.filters}>
      <Dropdown/>
      <Dropdown/>
      <p>reset filters</p>
    </div>
    </>
  )
}

function AgentTable() {
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
    <div className={table.whole}>
      <SearchBar/>
      <Filters/>
      <div className={table.tableborder}>
        <div className={table.tablewrapper}>
            <table className={table.tablecontainer}>
              <thead>
                <TableHeader />
              </thead>
              <tbody>
                {pagedAgents.map((agent) => (
                  <TableRow
                    key={agent.ID}
                    ID={agent.ID}
                    Name={agent.Name}
                    Email={agent.Email}
                    Role={agent.Role}
                    Status={agent.Status}
                    LastLogin={agent.LastLogin}
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
  );
}

export default AgentTable;