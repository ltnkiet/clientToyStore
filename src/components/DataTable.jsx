import React from 'react'
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material'

const DataTable = ({column, data, title, actions}) => {
  const defaultMaterialTheme = createTheme();
  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          columns={column}
          data={data}
          title={title}
          actions={actions}
        />
      </ThemeProvider>
    </div>
  )
}

export default DataTable