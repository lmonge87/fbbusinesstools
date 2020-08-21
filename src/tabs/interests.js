import React, { useState, useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/table.js";
import InputForm from "../components/form.js";

const mapData = (data) =>
  data &&
  data.map((i) => ({
    interests: `"interests":[{"id":"${i.id}","name":"${i.name}"}]}`,
    name: i.name,
    audience: i.audience_size,
  }));

export default function InterestFinder() {
  const [fetchedData, setFetchedData] = useState("");
  const mappedFetched = useMemo(() => mapData(fetchedData), [fetchedData]);
  const [inputLabel, setInputLabel] = useState("Images");

  const columns = useMemo(
    () => [
      {
        Header: `Showing results for interest: ${inputLabel}`,
        columns: [
          {
            Header: "ID/Name",
            accessor: "interests",
            disableFilters: true,
          },
          {
            Header: "Name",
            accessor: "name",
            disableFilters: true,
          },
          {
            Header: "Audience",
            accessor: "audience",
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
        dataType="interests"
        formType="text"
        dataSetter={setFetchedData}
        labelSetter={setInputLabel}
      />
      <Row>
        <Col>
          {fetchedData && <DataTable columns={columns} data={mappedFetched} />}
        </Col>
      </Row>
    </>
  );
}
