import React, { useState, useMemo } from "react";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/table.js";
import InputForm from "../components/form.js";

const mapData = (data) => 
    data && data.map((i) => i.id)

export default function CampaignFinder(props) {
  const [fetchedData, setFetchedData] = useState("");
  const [inputLabel, setInputLabel] = useState("Campaigns");
  const [editedRow, setEditedRow] = useState([]);
  const mappedEdited = useMemo(() => mapData(editedRow), [editedRow]);
  const [savedStatus, setSavedStatus] = useState(false)

  const columns = [
    {
      text: "Campaign Name",
      dataField: "name",
      sort: true,
    },
    {
      text: "Campaign ID",
      dataField: "id",
      sort: true,
    },
    {
      text: "Status",
      dataField: "status",
      sort: true,
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "ACTIVE",
            label: "ACTIVE",
          },
          {
            value: "PAUSED",
            label: "PAUSED",
          },
        ],
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];


  const rowClasses = (row) => {
    let classes = null;
    if (mappedEdited.indexOf(row.id) !== -1) {
      classes = 'editedCell';
      if (savedStatus) {
        classes = 'savedCell'
      } 
    }
    
    return classes;
  };

  const cellEdit = cellEditFactory({
    mode: "dbclick",
    blurToSave: true,
    afterSaveCell: (oldValue, newValue, row, column) => {
       if (oldValue !== newValue) {
      setEditedRow([...editedRow, { id: row.id, status: newValue }])
       }
    },
    
  });

  return (
    <>
      <InputForm
        searchFields={"status,name"}
        dataType="campaigns"
        variant="select"
        dataSetter={setFetchedData}
        labelSetter={setInputLabel}
        selectOptions={props.selectOptions}
        savingRoutes={editedRow}
        setSavedStatus={setSavedStatus}
        savedStatus={savedStatus}
        setEditedRow={setEditedRow}
      />
      <Row>
        <Col>
          {fetchedData && (
            <DataTable
              columns={columns}
              data={fetchedData}
              sort={defaultSorted}
              caption={`Displaying results for: ${inputLabel}`}
              cellEdit={cellEdit}
              rowClasses={rowClasses}
            />
          )}
        </Col>
      </Row>
    </>
  );
}
