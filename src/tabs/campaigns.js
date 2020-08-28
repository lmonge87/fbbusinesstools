import React, { useState, useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/table.js";
import InputForm from "../components/form.js";

export default function ImageFinder(props) {
  const [fetchedData, setFetchedData] = useState("");
  const [inputLabel, setInputLabel] = useState("Campaigns");

  const columns = useMemo(
    () => [
      {
        Header: inputLabel,
        columns: [
          {
            Header: "Campaign Name",
            accessor: "name",
            disableFilters: true,
          },
          {
            Header: "Campaign ID",
            accessor: "id",
            disableFilters: true,
          },
          {
            Header: "Status",
            accessor: "status",
            disableFilters: true,
          },
        ],
      },
    ],
    [inputLabel]
  );

  return (
    <>
      <InputForm
        searchFields={"status,name"}
        dataType="campaigns"
        variant="select"
        dataSetter={setFetchedData}
        labelSetter={setInputLabel}
        selectOptions={props.selectOptions}
      />
      <Row>
        <Col>
          {fetchedData && <DataTable columns={columns} data={fetchedData} />}
        </Col>
      </Row>
    </>
  );
}
