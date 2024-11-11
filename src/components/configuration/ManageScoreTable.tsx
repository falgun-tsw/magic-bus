import React from "react";
import { data } from "./manageScoreData";
import { makeStyles } from "@mui/styles";

interface Props {
  manageScore: [];
}

const ManageScoreTable: React.FC<Props> = (props) => {
  const { manageScore } = props;
  const classes = useStyles();

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr style={{ backgroundColor: "red" }}>
          <th>Parameter</th>
          <th>Weightage</th>
          <th>Measurement Criteria</th>
          <th>Score</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.data?.raws?.map((rows: any, rowIndex: number) => (
          <React.Fragment key={rowIndex}>
            {rows.measurementCriteria?.map((c: any, criteriaIndex: number) => (
              <React.Fragment key={criteriaIndex}>
                <tr>
                  <td>{rows.parameter}</td>
                  <td>{rows.weightage}</td>
                  <td>{c.region}</td>
                  <td></td>
                  <td>
                    <button>Action</button>
                  </td>
                </tr>
                {c.data?.map((d: any, dataIndex: number) => (
                  <tr key={dataIndex}>
                    <td></td>
                    <td></td>
                    <td>
                      {`${d.operator} ${d.highestScoreCanBeObtained} ${d.measurementCriteria}`}
                    </td>
                    <td>{d.score}</td>
                    <td></td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

const useStyles = makeStyles({
  table: { width: "100%", borderCollapse: "collapse" },
  tHead: { backgroundColor: "#DADADA", borderRadius: "50px" },
  tHeadTh: {
    padding: "7px 20px",
    textAlign: "left",
    border: "1px solid #EAECF0",
    color: "#242424",
    fontWeight: 600,
    maxHeight: "44px",
    fontSize: "12px",
  },
  tBodyTd: {
    border: "1px solid #EAECF0",
    padding: "7px 20px",
    textAlign: "left",
    "&:first-of-type": {
      fontWeight: 600,
      fontSize: "14px",
      color: "#262626",
    },
  },
});

export default ManageScoreTable;
