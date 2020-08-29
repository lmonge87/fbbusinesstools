import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

export default function DataTable(props) {
  const { columns, data, sort, caption, filter, cellEdit, rowClasses } = props;


  return data.length ? (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={data}
      columns={columns}
      caption={caption}
      defaultSorted={sort}
      id='tableDark'
      filter={filter}
      cellEdit={cellEdit}
      rowClasses={rowClasses}
    />
  ) : null;
}
