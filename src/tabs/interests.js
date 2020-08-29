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
    id: i.id,
  }));

export default function InterestFinder() {
  const [fetchedData, setFetchedData] = useState("");
  const mappedFetched = useMemo(() => mapData(fetchedData), [fetchedData]);
  const [inputLabel, setInputLabel] = useState("Images");

  const columns = [
      {
        text: "ID/Name",
        dataField: "interests",
        sort: true,
      },
      {
        text: "Name",
        dataField: "name",
        sort: true,
      },
      {
        text: "Audience",
        dataField: "audience",
        sort: true,
      },
    ]

  const defaultSorted = [
    {
      dataField: "audience",
      order: "desc",
    },
  ];

  return (
    <>
      <InputForm
        dataType="interests"
        dataSetter={setFetchedData}
        labelSetter={setInputLabel}
      />
      <Row>
        <Col>
          {fetchedData && (
            <DataTable
              columns={columns}
              data={mappedFetched}
              sort={defaultSorted}
              caption={`Displaying results of: ${inputLabel}`}
            />
          )}
        </Col>
      </Row>
    </>
  );
}
