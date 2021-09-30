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

BookListHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function BookListHead({
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
        <TableCell
          padding="checkbox"
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            sx={{
              bgcolor: "background.default",
              color: "text.primary",
            }}
          />
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.field}
            align={headCell.alignRight ? "right" : "left"}
            sortDirection={orderBy === headCell.field ? order : false}
            sx={{
              bgcolor: "background.default",
              color: "text.secondary",
            }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : "asc"}
              onClick={createSortHandler(headCell.field)}
              sx={{
                bgcolor: "background.default",
                color: "text.secondary",
              }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
