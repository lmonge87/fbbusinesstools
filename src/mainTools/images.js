import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/table.js";
import InputForm from "../components/form.js";

export default function ImageFinder(props) {
  const [fetchedData, setFetchedData] = useState("");
  const [inputLabel, setInputLabel] = useState("Images");

  const columns = [
    {
      text: "Image Name",
      dataField: "name",
      sort: true,
    },
    {
      text: "Hash",
      dataField: "hash",
      sort: true,
    },
    {
      text: "ID (Account + Hash)",
      dataField: "id",
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  return (
    <>
      <InputForm
        searchFields={"name,id,hash"}
        dataType="images"
        variant="select"
        dataSetter={setFetchedData}
        labelSetter={setInputLabel}
        selectOptions={props.selectOptions}
      />
      <Row>
        <Col>
          {fetchedData && (
            <DataTable
              columns={columns}
              data={fetchedData}
              sort={defaultSorted}
              caption={`Displaying results for: ${inputLabel}`}
            />
          )}
        </Col>
      </Row>
    </>
  );
}
