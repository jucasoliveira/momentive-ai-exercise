import PropTypes from "prop-types";
// material
import { visuallyHidden } from "@material-ui/utils";
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from "@material-ui/core";

// ----------------------------------------------------------------------

UserListHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function UserListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.isbn}
            align={headCell.alignRight ? "right" : "left"}
            sortDirection={orderBy === headCell.isbn ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.isbn}
              direction={orderBy === headCell.isbn ? order : "asc"}
              onClick={createSortHandler(headCell.isbn)}
            >
              {headCell.label}
              {orderBy === headCell.isbn ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === "desc" ? " desc" : " asc"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
