import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Copyright from "../src/Copyright";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
import SettingsPanel from "../components/SettingsPanel";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";

export default function Index({ dataSet }) {
  const { data } = dataSet;

  console.log(data);
  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "author", headerName: "Author", width: 200 },
    { field: "genre", headerName: "genre", width: 200 },
    { field: "isbn", headerName: "ISBN", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <img
          src={params.row.image}
          alt="Avatar"
          width="40"
          height="40"
          style={{ borderRadius: 10, alignItems: "center" }}
        />
      ),
    },
    { field: "published", headerName: "Release Date", width: 2000 },
    { field: "publisher", headerName: "Publisher", width: 200 },
  ];

  const dataPro = {
    columns,
    rows: data,
  };
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Takeaway Coding Exercise - Momentive A.I
        </Typography>

        <Box sx={{ my: 5 }}>
          <div style={{ height: 800, width: "100%" }}>
            <DataGridPro
              {...dataPro}
              getRowId={(row) => row.isbn}
              components={{
                Toolbar: GridToolbar,
              }}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        </Box>
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
