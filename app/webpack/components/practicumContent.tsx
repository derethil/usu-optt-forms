import React from "react";
import styled from "styled-components";
import Color from "../styledComponents/colors";

// Presentational component to show practicum content table

const THeader = styled.thead`
  color: ${Color.lights.light};
  background-color: ${Color.blues.blue};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 50px;

  tr:last-child td:first-child {
    border-bottom-left-radius: 5px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 5px;
  }

  tr:first-child th:first-child {
    border-top-left-radius: 5px;
  }

  tr:first-child th:last-child {
    border-top-right-radius: 5px;
  }
`;

const TableRow = styled.tr`
  text-align: center;
  tbody > &:nth-child(1),
  &:nth-child(3) {
    background-color: ${Color.lights.grayLighter};
  }
`;

const TableData = styled.td`
  padding: 0.33em;
`;

const TableHead = styled.th`
  padding: 0.33em;
`;

const TableBody = styled.tbody``;

function PracticumContent() {
  return (
    <Table>
      <THeader>
        <TableRow>
          <TableHead>SPECIALIZATION</TableHead>
          <TableHead>FALL</TableHead>
          <TableHead>SPRING</TableHead>
        </TableRow>
      </THeader>
      <TableBody>
        <TableRow>
          <TableData>Birth to 5</TableData>
          <TableData>Teaching Intensive Instruction / Large group</TableData>
          <TableData>Teaching routines based (embedded) Instruction</TableData>
        </TableRow>
        <TableRow>
          <TableData>Mild / Moderate</TableData>
          <TableData>Teaching Reading / ELA</TableData>
          <TableData>Teaching Math</TableData>
        </TableRow>
        <TableRow>
          <TableData>Severe</TableData>
          <TableData>Teaching Reading / ELA</TableData>
          <TableData>Teaching Life Skills</TableData>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default PracticumContent;
