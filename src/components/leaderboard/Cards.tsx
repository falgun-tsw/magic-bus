import React, { useState } from "react";
//common
import Card from "../../components/mui/Card";
import CardContent from "../../components/mui/CardContent";
import Typography from "../../components/mui/Typography";
import Button from "../../components/mui/Button"
import Box from "../../components/mui/Box"

interface TierProps {
  tier: string;
  data: { rank: number; location: string; description: string }[];
  getTierColor: string;
  handleButtonClick:any
}
const Cards: React.FC<TierProps> = ({ tier, data,handleButtonClick }) => {
 
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "GOLD":
        return "#f9f3d1";
      case "PLATINUM":
        return "#e5e5e5";
      case "SILVER":
        return "#f0ebf4";
      default:
        return "#ffffff";
    }
  };
 


  return (
    <Card sx={{ mb: 2, borderRadius:"15px",
      marginTop: tier === "PLATINUM" ? "-20px" : "0px",
      zIndex: tier === "PLATINUM" ? 1 : 0, 
      position: tier === "PLATINUM" ? "relative" : "static", 
    }}>
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            textTransform: "capitalize",
            mb: 2,
            backgroundColor: getTierColor(tier),
            borderRadius: "12px",
            padding: "8px 18px",
            fontWeight: "600",
            fontSize: "20px",
            color: "#101828",
            lineHeight: "28px",
          }}
        >
          {tier}
        </Typography>
        <ul style={{ paddingLeft: 0, listStyle: "none" }}>
          {data.map((item) => (
            <li key={item.rank}>
              <Typography
                sx={{
                  mb: 2,
                  fontWeight: "400",
                  fontSize: "16px",
                  color: "#262626",
                  lineHeight: "20px",
                }}
              >
                {item.rank}. {item.location} - {item.description}
              </Typography>
              <hr style={{ border: "1px solid #DCDCDC" }}></hr>
            </li>
          ))}
        </ul>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button sx={{ background: "#FEF7DA", color:"#242424",   fontWeight: "600",
            fontSize: "16px", padding:"10px 90px", borderRadius:"10px"}} onClick={handleButtonClick}>View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Cards;
