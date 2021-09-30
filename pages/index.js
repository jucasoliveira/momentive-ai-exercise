import React, { useState } from "react";
import { filter } from "lodash";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Copyright from "../src/Copyright";
import {
  Avatar,
  Button,
  CardContent,
  Checkbox,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { BookMoreMenu } from "../components/_dashboard/book";
import { Card } from "@material-ui/core";
import BookListHead from "../components/_dashboard/book/BookListHead";
import Paper from "../theme/overrides/Paper";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_book) => _book.genre.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Index({ dataSet }) {
  const { data } = dataSet;

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [queryGenre, setQueryGenre] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const columns = [
    { field: "title", label: "Book", alignRight: false },
    { field: "description", label: "Description", alignRight: false },
    { field: "author", label: "Author", alignRight: false },
    { field: "genre", label: "genre", alignRight: false },
    { field: "published", label: "Release Date", alignRight: false },
    { field: "publisher", label: "Publisher", alignRight: false },
    { field: "more", label: "More", alignRight: false },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectGenre = (value) => {
    console.log("evern", value);
    const selectedGenre = value;
    setQueryGenre(selectedGenre);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredTitles = applySortFilter(
    data,
    getComparator(order, orderBy),
    queryGenre
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Takeaway Coding Exercise - Momentive A.I
          </Typography>
        </Stack>
        <Card>
          {queryGenre && (
            <CardContent elevation={3}>
              <Typography
                sx={{ fontSize: 18, fontWeight: "bold", mb: 2 }}
                color="text.primary"
                gutterBottom
              >
                {queryGenre}
                <Button
                  onClick={() => handleSelectGenre("")}
                  variant="contained"
                  style={{ marginLeft: "1rem" }}
                >
                  RESET
                </Button>
              </Typography>
            </CardContent>
          )}
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <BookListHead
                order={order}
                orderBy={orderBy}
                headLabel={columns}
                rowCount={data.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredTitles
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      title,
                      description,
                      author,
                      genre,
                      isbn,
                      image,
                      published,
                      publisher,
                    } = row;
                    const isItemSelected = selected.indexOf(title) !== -1;

                    return (
                      <TableRow
                        hover
                        key={isbn}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, title)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar alt={title} src={image} />
                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{description}</TableCell>
                        <TableCell align="left">{author}</TableCell>
                        <TableCell align="left">
                          <Button onClick={() => handleSelectGenre(genre)}>
                            <Link>{genre}</Link>
                          </Button>
                        </TableCell>
                        <TableCell align="left">{published}</TableCell>
                        <TableCell align="left">{publisher}</TableCell>
                        <TableCell align="right">
                          <BookMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <Copyright />
      </Box>
    </Container>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`https://fakerapi.it/api/v1/books?_quantity=200`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { dataSet: data }, // will be passed to the page component as props
  };
}
