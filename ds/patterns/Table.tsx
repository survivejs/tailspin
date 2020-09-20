import { elements } from "../../deps.ts";
import Box from "../primitives/Box.tsx";

// https://tailwindcss.com/docs/display/#table
const Table = ({}, children: string[]) => (
  <Box as="table" w="full" sx="table">
    {children.join("")}
  </Box>
);

const TableRow = ({}, children: string[]) => (
  <Box as="tr" sx="table-row">
    {children.join("")}
  </Box>
);

const TableHeader = ({}, children: string[]) => (
  <Box as="thead">{children.join("")}</Box>
);

const TableHeaderCell = ({}, children: string[]) => (
  <Box as="th" sx="table-cell text-left">
    {children}
  </Box>
);

const TableBody = ({}, children: string[]) => (
  <Box as="tbody">{children.join("")}</Box>
);

const TableBodyCell = ({}, children: string[]) => (
  <Box as="td" sx="table-cell">
    {children.join("")}
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
export const showCodeEditor = true;

export {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableBodyCell,
  TableRow,
};
