import React, { useState, useMemo } from "react";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "../components/table.js";
import InputForm from "../components/form.js";

const mapData = (data) =>
  data &&
  data.map((i) => ({
    url: <a href={i.url}>Download</a>,
    name: i.name,
    use: i.is_associated_creatives_in_adgroups.toString(),
    id: i.id,
    created_time: i.created_time,
  }));

export default function AssociatedImages(props) {
  const [fetchedData, setFetchedData] = useState("");
  const mappedFetched = useMemo(() => mapData(fetchedData), [fetchedData]);
  const [inputLabel, setInputLabel] = useState("Images");

  const selectOptions = {
    true: "true",
    false: "false",
  };

  const columns = [
    {
      text: "ID (Account + Hash)",
      dataField: "id",
      sort: true,
    },
    {
      text: "URL",
      dataField: "url",
      sort: true,
    },
    {
      text: "Currently in use?",
      dataField: "use",
      sort: true,
      formatter: (cell) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
      }),
    },
    {
      text: "Created Time",
      dataField: "created_time",
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: "use",
      order: "desc",
    },
  ];

  return (
    <>
      <InputForm
        searchFields={
          "id,name,url,is_associated_creatives_in_adgroups,created_time,updated_time"
        }
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
              data={mappedFetched}
              sort={defaultSorted}
              caption={`Displaying results for: ${inputLabel}`}
              filter={filterFactory()}
            />
          )}
        </Col>
      </Row>
    </>
  );
}
