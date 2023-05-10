import { useContext, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, TablePagination } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/HighlightOff';
import GetData from '../custom-hooks/GetData';


interface ItemType {
  name: string,
  region: string,
  population: number,
  area: number,
  flag: string,
}

export default function DisplayCompound() {
  const [page, setPage] = useState(0);
  const useStyles = makeStyles({
    header: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      fontSize: 11,
      width: 'max-content',
      minWidth: 40,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.5)',
    },
    cancelButton: {
      float: 'right',
    },
    flag: {
      height: 26,
      width: 40,
    },
    itemName: {
      fontWeight: 'bold',
    },
  });
  const classes = useStyles();
  const { data, setData } = GetData();
  const {
    searchTerm,
    region,
    sortValue,
  } = useContext(MainContext);
  const countriesPerPage = 30;

  const filteredCountries = data
    .filter(country =>
      (searchTerm === '' || country.name.toLowerCase().includes(searchTerm?.toLowerCase())) &&
      (region === 'All Regions' || country.region === region)
    )
    .sort((a, b) => {
      if (sortValue === 'Sort by Population') {
        return a.population - b.population;
      } else if (sortValue === 'Sort by Area') {
        return a.area - b.area;
      } else {
        return 0;
      }
    });

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleRemoveCountry = (countryName: string) => {
    const newFilteredCountries = data.filter((c) => c.name !== countryName);
    setData(newFilteredCountries);
    return newFilteredCountries;
  };


  const formatArea = (area: number): string => {
    let formattedArea = '';
    if (area >= 1000000) {
      const areaInMillionKm = (area / 1000000).toFixed(2);
      formattedArea = `${areaInMillionKm} million km²`;
    } else if (area >= 1000) {
      const areaInKm = (area / 1000000).toFixed(2);
      formattedArea = `${areaInKm} km²`;
    } else {
      formattedArea = `${area} m²`;
    }
    return formattedArea;
  };

  return (
    <Box p={4}>
      <TableContainer>
        <Table size='small' aria-label='Countries Table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>COUNTRY</TableCell>
              <TableCell className={classes.header}>REGION</TableCell>
              <TableCell className={classes.header}>POPULATION(2023)</TableCell>
              <TableCell className={classes.header}>AREA</TableCell>
              <TableCell className={classes.header}>FLAG</TableCell>
              <TableCell className={classes.header}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              filteredCountries ?
                filteredCountries.slice(page * countriesPerPage, (page + 1) * countriesPerPage).map((item: ItemType, index: number) => (
                  <TableRow key={index}>
                    <TableCell className={classes.itemName}>{item.name}</TableCell>
                    <TableCell>{item.region}</TableCell>
                    <TableCell>{item.population.toLocaleString()}</TableCell>
                    <TableCell>{formatArea(item.area)}</TableCell>
                    <TableCell> <img className={classes.flag} src={item.flag} alt={item.name} /> </TableCell>
                    <TableCell>
                      <IconButton className={classes.cancelButton} aria-label="delete" onClick={() => handleRemoveCountry(item.name)}>
                        <CancelIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                : null
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={filteredCountries.length}
        rowsPerPage={countriesPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  )
}