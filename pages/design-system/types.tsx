import { elements } from "../../deps.ts";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableBodyCell,
  TableRow,
} from "../../ds/patterns/table.tsx";
import Box from "../../ds/primitives/box.tsx";

const Types = ({
  props = [],
}: {
  props: {
    name: string;
    isOptional: boolean;
    type: "string";
  }[];
}) =>
  props.length > 0
    ? (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Is optional</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props
            .map(({ name, isOptional, type }) => (
              <TableRow>
                <TableBodyCell>
                  <Box as="code">{name}</Box>
                </TableBodyCell>
                <TableBodyCell>{type}</TableBodyCell>
                <TableBodyCell>{isOptional ? "✓" : ""}</TableBodyCell>
              </TableRow>
            ))
            .join("")}
        </TableBody>
      </Table>
    )
    : (
      ""
    );

export default Types;
