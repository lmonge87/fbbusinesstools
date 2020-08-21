import React, { useState, useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/table.js";
import InputForm from "../components/form.js";

export default function AssociatedImages(props) {
  const [fetchedData, setFetchedData] = useState("");
  const [inputLabel, setInputLabel] = useState("Images");

  const columns = useMemo(
    () => [
      {
        Header: inputLabel,
        columns: [
          {
            Header: "ID (Account + Hash)",
            accessor: "id",
            disableFilters: true,
          },
          {
            Header: "URL",
            accessor: (d) => <a href={d.url}>Download</a>,
            disableFilters: true,
          },
          {
            Header: "Currently in use?",
            accessor: (d) => d.is_associated_creatives_in_adgroups.toString(),
          },
          {
            Header: "Created Time",
            accessor: "created_time",
          },
        ],
      },
    ],
    [inputLabel]
  );

  return (
    <>
      <InputForm
        searchFields={
          "id,name,url,is_associated_creatives_in_adgroups,created_time,updated_time"
        }
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
