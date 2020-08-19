import * as elements from "typed-html";
import Box from "../primitives/box";

// https://tailwindcss.com/docs/display/#table
const Table = ({}, containers: string[]) => (
  <Box as="table" sx="table w-full">
    {containers.join("")}
  </Box>
);

const TableRow = ({}, rows: string[]) => (
  <Box as="tr" sx="table-row">
    {rows.join("")}
  </Box>
);

const TableHeader = ({}, rows: string[]) => (
  <Box as="thead">{rows.join("")}</Box>
);

const TableHeaderCell = ({}, content: string[]) => (
  <Box as="th" sx="table-cell text-left">
    {content}
  </Box>
);

const TableBody = ({}, rows) => <Box as="tbody">{rows.join("")}</Box>;

const TableBodyCell = ({}, content: string[]) => (
  <Box as="td" sx="table-cell">
    {content.join("")}
  </Box>
);

export const displayName = "Table";
export const Example = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Language</TableHeaderCell>
        <TableHeaderCell>Color</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableBodyCell>JavaScript</TableBodyCell>
        <TableBodyCell>Yellow</TableBodyCell>
      </TableRow>
      <TableRow>
        <TableBodyCell>Go</TableBodyCell>
        <TableBodyCell>Blue</TableBodyCell>
      </TableRow>
      <TableRow>
        <TableBodyCell>Python</TableBodyCell>
        <TableBodyCell>Green</TableBodyCell>
      </TableRow>
    </TableBody>
  </Table>
);

export {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableBodyCell,
  TableRow,
};
