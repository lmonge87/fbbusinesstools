import React, { useState, useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/table.js";
import InputForm from "../components/form.js";

export default function ImageFinder(props) {
  const [fetchedData, setFetchedData] = useState("");
  const [inputLabel, setInputLabel] = useState("Images");

  const columns = useMemo(
    () => [
      {
        Header: inputLabel,
        columns: [
          {
            Header: "Image Name",
            accessor: "name",
            disableFilters: true,
          },
          {
            Header: "Hash",
            accessor: "hash",
            disableFilters: true,
          },
          {
            Header: "ID (Account + Hash)",
            accessor: "id",
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
        searchFields={"name,id,hash"}
        dataType="images"
        formType="select"
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
