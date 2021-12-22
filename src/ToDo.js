import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import db from "./firebaseConfig";
import Update from "./Update";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { doc, deleteDoc } from "@firebase/firestore";


  //Styled components for ToDo table.
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));



function ToDo(props) {
  //  props = todo which carries a list of task objects as { work and id}
      
    return (
        <>
        <div style={{ margin: "15%", marginTop: "50px" }}>

        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableBody>

              {/* iterating over all the tasks  */}
              {props.todo.map((task) => (
                <StyledTableRow key={task.work}>

                      {/* 1st column -->task name */} 
                      <StyledTableCell component="th" scope="row">
                        <h3>{task.work}</h3>
                      </StyledTableCell>

                      {/* 2nd column --> update icon */}
                      <StyledTableCell align="right">
                        <Update
                          work={task.work}
                          key={task.id}
                          id={task.id}
                        ></Update>{" "}
                      </StyledTableCell>

                      {/* 3rd column --> delete icon */}
                      <StyledTableCell align="right" style={{ width: "15%" }}>
                        <DeleteForeverIcon
                          onClick={() => {
                            deleteDoc(doc(db, "todos", task.id));
                          }}
                        ></DeleteForeverIcon>
                      </StyledTableCell>


                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
        </>
    )
}

export default ToDo
