// dependencies import
import axios from "axios";
import { useEffect, useState } from "react";

// styles import
import table from "../../styles/general-table.module.css";
import layout from "./dashboardTable.module.css";

// Api Import
const ticketURL = import.meta.env.VITE_WORKFLOW_API;

// component import
import { Pagination } from "../../components/tableforms";
import { SearchBar, Dropdown, AgentStatus } from "../../components/tableforms";

function TableRow(props) {
  return(
    <tr className={table.tr}>
      <td className={table.td} 
      style={{ 
        width: '5%',
        backgroundColor:'blue' }}></td>
      <td className={table.td} style={{ width: '60%' }}>{props.Description}</td>
      <td className={table.td}
            style={{
              width: '15%',
              display: 'table-cell',
              textAlign: 'center'
            }}
      >
        <AgentStatus status={props.Status}/>
      </td>
      <td className={table.td} style={{width: '20%'}}>{props.Ticket}</td>
    </tr>
  )
}

function DashboardTable() {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // rows per page

  useEffect(() => {
    axios
      .get(`${ticketURL}`)
      .then((response) => {
        const data = response.data;
        setTableData(Array.isArray(data) ? data : data.tableData || []);
      })
      .catch((error) => {
        console.error("Failed to fetch agents", error);
      });
  }, []);

  // pagination calculations
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pagedAgents = tableData.slice(start, start + itemsPerPage);

  const handleManage = (id) => {
    console.log("Manage agent", id);
  };

  return (
    <div className={table.whole}>
      <div className={table.tableborder}>
        <div className={layout.tablewrapper}>
            <table className={table.tablecontainer}>
              <tbody>
                {pagedAgents.map((tableData) => (
                  <TableRow
                    key={tableData.ID}
                    ID={tableData.ID}
                    Name={tableData.name}
                    Division={tableData.division}
                    Description={tableData.description}
                    Status={tableData.status}
                    Ticket={tableData.ticket}
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

export default DashboardTable;