import React, { useState } from 'react'
import MagicPageHeader from '../components/common/MagicPageHeader';
import Grid from '../components/mui/Grid';
import Box from '../components/mui/Box';
import Cards from '../components/leaderboard/Cards';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';

const LeaderboardContainer = () => {
  const [showTable, setShowTable] = useState(false);
  const [activeTier, setActiveTier] = useState("");
  const data = {
    compounds: [
      {
        tier: "GOLD",
        data: [
          { rank: 1, location: "Paharganj (Delhi)", description: "Lorem ipsum" },
          { rank: 2, location: "Kirti Nagar (Delhi)", description: "PTI, Lorem ipsum" },
          { rank: 3, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 4, location: "Lucknow (UP)", description: "Zoe, Lorem ipsum" },
          { rank: 5, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 6, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 7, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 8, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 9, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 10, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" }
        ]
      },
      {
        tier: "PLATINUM",
        data: [
          { rank: 1, location: "Paharganj (Delhi)", description: "Lorem ipsum" },
          { rank: 2, location: "Kirti Nagar (Delhi)", description: "PTI, Lorem ipsum" },
          { rank: 3, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 4, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 5, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 6, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 7, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 8, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 9, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 10, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" }
        ]
      },
      {
        tier: "SILVER",
        data: [
          { rank: 1, location: "Paharganj (Delhi)", description: "Lorem ipsum" },
          { rank: 2, location: "Kirti Nagar (Delhi)", description: "PTI, Lorem ipsum" },
          { rank: 3, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 4, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 5, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 6, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 7, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 8, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 9, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" },
          { rank: 10, location: "Porur (Tamilnadu)", description: "JPM, Lorem ipsum" }
        ]
      }
    ]
  };
  //table
  const columns = [
    { field: 'rank', headerName: '', width: 100 },
    { field: 'centre', headerName: '', width: 250 },
    { field: 'region', headerName: '', width: 120 },
    { field: 'funder', headerName: '', width: 180 },
    { field: 'enrolment', headerName: 'Enrolment', width: 120 },
    { field: 'female', headerName: 'Female', width: 100 },
    { field: 'attendance', headerName: 'Attendance', width: 120 },
    { field: 'dropout', headerName: 'Drop out', width: 120 },
    { field: 'sixtyPlusSixty', headerName: '60+60', width: 120 },
    { field: 'demandDriven', headerName: 'Demand driven', width: 150 },
    { field: 'placementDoc', headerName: 'Placement doc', width: 150 },
    { field: 'centerPhysicalQuailty', headerName: 'center Physical Quailty', width: 150 },
    { field: 'FPDsScore', headerName: 'FPDs Score', width: 150 },
    {field:"operationFin" , headerName:"operation Finance" , width:150},
    {field:"operationHr" , headerName:"operation Hr",width:150},
    {field:"session" , headerName:"session Quality", width:150},
    {field:"programmePerfromance" , headerName:"", width:200},
    {field:"QualityandEfficacyScore", headerName:"", width:200},
    {field:"final", headerName:"", width:150}


  ];
  const rows = [
    { id: 1, rank: 1, centre: 'Paharganj (Delhi) - Swatch', region: 'North', funder: 'Swatch India', enrolment: 20, female: 15, attendance: 10, dropout: 15, sixtyPlusSixty: 15, demandDriven: 10, placementDoc: 15, centerPhysicalQuailty: 2000 ,FPDsScore:1, operationFin:20, operationHr:15,session:20,programmePerfromance:100,QualityandEfficacyScore:100,final:100 },
    { id: 2, rank: 2, centre: 'Kirti Nagar (Delhi) - PTI', region: 'East', funder: 'PTI', enrolment: 20, female: 15, attendance: 10, dropout: 15, sixtyPlusSixty: 15, demandDriven: 10, placementDoc: 15, centerPhysicalQuailty: 2000 ,FPDsScore:1, operationFin:20, operationHr:15,session:20,programmePerfromance:100,QualityandEfficacyScore:100,final:100},
    { id: 3, rank: 3, centre: 'Porur (Tamilnadu) - JPM', region: 'West', funder: 'Accenture', enrolment: 20, female: 15, attendance: 10, dropout: 15, sixtyPlusSixty: 15, demandDriven: 10, placementDoc: 15, centerPhysicalQuailty: 2000, FPDsScore:1, operationFin:20, operationHr:15,session:20,programmePerfromance:100,QualityandEfficacyScore:100,final:100},
    { id: 4, rank: 4, centre: 'Lucknow (UP) - Zee', region: 'South', funder: 'DHL Logistic', enrolment: 20, female: 15, attendance: 10, dropout: 15, sixtyPlusSixty: 15, demandDriven: 10, placementDoc: 15, centerPhysicalQuailty: 2000,FPDsScore:1, operationFin:20, operationHr:15,session:20,programmePerfromance:100,QualityandEfficacyScore:100,final:100 },
    { id: 5, rank: 5, centre: 'Porur (Tamilnadu) - JPM', region: 'North', funder: 'JP Morgan', enrolment: 20, female: 15, attendance: 10, dropout: 15, sixtyPlusSixty: 15, demandDriven: 10, placementDoc: 15, centerPhysicalQuailty: 2000,FPDsScore:1 , operationFin:20, operationHr:15,session:20,programmePerfromance:100,QualityandEfficacyScore:100,final:100},
  ];
  const columnGroupingModel = [

    {
      groupId: 'rankGroup',
      headerName: 'Rank',
      children: [{
        field: 'rank'
      }],
    },
    {
      groupId: 'CentreGroup',
      headerName: 'Centre',
      children: [{
        field: 'centre'
      }],
    },
    {
      groupId: 'RegionGroup',
      headerName: 'Region',
      children: [{
        field: 'region'
      }],
    },
    {
      groupId: 'FunderGroup',
      headerName: 'Funder',
      children: [{
        field: 'funder'
      }],
    },
    {
      groupId: 'programmePerformance',
      headerName: 'Programme Performance Parameters',
      children: [
        { field: 'enrolment' },
        { field: 'female' },
        { field: 'attendance' },
        { field: 'dropout' },
        { field: 'sixtyPlusSixty' },
        { field: 'demandDriven' },
        { field: 'placementDoc' },
      ],
    },
    {
      groupId: "Quality and Efficiacy",
      headerName: "Quality and Efficiacy Parameters",
      children: [
        { field: "centerPhysicalQuailty" },
        {field:"FPDsScore"},
        {field:"operationFin"},
        {field:"operationHr"},
        {field:"session"}
      ]
    },
    {
      groupId:"programmePerfromance",
      headerName:"programme Perfromance Score",
     children:[
      {field:"programmePerfromance"}
     ]
    },
    {
      groupId:"QualityandEfficacyScore",
      headerName:"Quality and Efficacy Score",
     children:[
      {field:"QualityandEfficacyScore"}
     ]
    },
    {
      groupId:"final",
      headerName:"Final",
     children:[
      {field:"final"}
     ]
    },
  
  ];
  const handleButtonClick = (tier: string) => {
    setActiveTier(tier);
    setShowTable(true);
  };

  return (
    <>
      {showTable && activeTier === "PLATINUM" ? (
        <Box>
          <MagicPageHeader
            title="PLATINUM"
            subTitle="Here you can view the list of top centres with their performance."
            chipLabel=""
          />
          <LeaderboardTable columns={columns} rows={rows} columnGroupingModel={columnGroupingModel} />
        </Box>
      ) : (
        <Box>
          <MagicPageHeader
            title="Leaderboard"
            subTitle="Here you can view the list of top centres with their performance."
            chipLabel=""
          />

          <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={3}>
              {data.compounds.map((compound) => (
                <Grid item xs={12} md={4} key={compound.tier}>
                  <Cards tier={compound.tier} data={compound.data} getTierColor={''} handleButtonClick={() => { handleButtonClick(compound.tier) }} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )
      }

    </>
  );
};

export default LeaderboardContainer;
