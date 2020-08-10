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
Table.Row = TableRow;

const TableHeader = ({}, rows: string[]) => (
  <Box as="thead">{rows.join("")}</Box>
);
Table.Header = TableHeader;

const TableHeaderCell = ({}, content: string[]) => (
  <Box as="th" sx="table-cell text-left">
    {content}
  </Box>
);
Table.HeaderCell = TableHeaderCell;

const TableBody = ({}, rows) => <Box as="tbody">{rows.join("")}</Box>;
Table.Body = TableBody;

const TableBodyCell = ({}, content: string[]) => (
  <Box as="td" sx="table-cell">
    {content.join("")}
  </Box>
);
Table.BodyCell = TableBodyCell;

export const displayName = "Table";
export const Example = () => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Language</Table.HeaderCell>
        <Table.HeaderCell>Color</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.BodyCell>JavaScript</Table.BodyCell>
        <Table.BodyCell>Yellow</Table.BodyCell>
      </Table.Row>
      <Table.Row>
        <Table.BodyCell>Go</Table.BodyCell>
        <Table.BodyCell>Blue</Table.BodyCell>
      </Table.Row>
      <Table.Row>
        <Table.BodyCell>Python</Table.BodyCell>
        <Table.BodyCell>Green</Table.BodyCell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default Table;
