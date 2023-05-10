import React, { useContext } from 'react';
import { Box, MenuItem, Typography, TextField } from '@material-ui/core';
import { MainContext } from '../context/MainContext';
import Select from '@mui/material/Select';

type Region = 'All Regions' | 'Africa' | 'Europe' | 'Asia' | 'Oceania' | 'Americas';
type Sort = 'Sort by Population' | 'Sort by Area';

export default function ControlsCompound() {
  const {
    searchTerm,
    setSearchTerm,
    region,
    setRegion,
    sortValue,
    setSortValue,
  } = useContext(MainContext)


  const regions: Region[] = ['All Regions', 'Africa', 'Europe', 'Asia', 'Oceania', 'Americas'];
  const sortValues: Sort[] = ['Sort by Population', 'Sort by Area'];


  function doSearchFieldActions(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm!(event.target.value)
  }

  return (
    <Box paddingBottom={0} paddingLeft={4} paddingRight={4} paddingTop={5} display='flex' justifyContent='space-between' alignItems='center'>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box>
          <Typography variant='h6'><strong>Filter</strong></Typography>
          <TextField
            id='search'
            variant='outlined'
            label='Search here ...'
            size='small'
            margin='none'
            type='search'
            color='primary'
            autoComplete='off'
            value={searchTerm!}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              doSearchFieldActions(event)
            }
          />
        </Box>
        <Box marginLeft={2} paddingTop={4}>
          <Select style={{ height: '40px' }} value={region} onChange={(e) => setRegion!(e.target.value as Region)}>
            {regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box display='flex' alignItems='center' paddingTop={4}>
        <Select style={{ height: '40px' }} value={sortValue} onChange={(e) => setSortValue!(e.target.value as Sort)}>
          {sortValues.map((sortValue) => (
            <MenuItem key={sortValue} value={sortValue}>
              {sortValue}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  )
}
