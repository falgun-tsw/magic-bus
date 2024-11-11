import React from "react";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton } from "@mui/material";
import styled from "@emotion/styled";

// mui components
import Typography from "../mui/Typography";
import Button from "../mui/Button";
import Stack from "../mui/Stack";
import Card from "../mui/Card";
import Box from "../mui/Box";

interface CardsProps {
  onStatusChange: (newStatus: string) => void;
  cardList: { code: string; displayName: string; count: number, percentage: number | boolean }[];
  selectedStatus: string;
  handleFilter: () => void
}

const Cards: React.FC<CardsProps> = (props) => {
  const { onStatusChange, cardList, selectedStatus, handleFilter } = props;

  return (
    <Stack direction="column">
      <Box sx={{ mb: "10px", display: "flex", justifyContent: "end" }}>
        <StyledButton
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleFilter}
        >
          Add Filters
        </StyledButton>
      </Box>

      <StyledStack direction="row">
        {cardList.map((data) => (
          <StyledCard
            onClick={() => onStatusChange(data.code)}
            sx={{
              border:
                selectedStatus === data.code
                  ? "1px solid rgb(179, 153, 59)"
                  : "1px solid rgb(217, 217, 217)",

              bgcolor:
                selectedStatus === data.code
                  ? "rgb(255, 248, 219)"
                  : "rgb(255, 255, 255)",
            }}
          >
            <Stack gap="4px">
              <CategoryTypo>{data.displayName}</CategoryTypo>
              <Stack direction="row">
              <CountTypo>{data.count}</CountTypo>
              {data.percentage && (
                <Typography style={{fontSize:14,fontWeight:600,color:"#636363",paddingTop:10,paddingLeft:2}}>{`(${data.percentage}%)`}</Typography>
              )}
              </Stack>
            </Stack>

            <Stack>
              <StyledIconButton sx={{ bgcolor: "rgb(255, 255, 255)" }}>
                <NavigateNextIcon />
              </StyledIconButton>
            </Stack>
          </StyledCard>
        ))}
      </StyledStack>
    </Stack>
  );
};

const StyledButton = styled(Button)((theme) => ({
  maxWidth: "140px",
  color: "black",
  textTransform: "capitalize",
  border: "1px solid rgb(204, 204, 204)",
}));

const StyledStack = styled(Stack)((theme) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "24px",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 20px",
  minWidth: "210px",
  cursor: "pointer",
}));

const CategoryTypo = styled(Typography)((theme) => ({
  fontSize: "16px",
  fontWeight: 500,
}));

const CountTypo = styled(Typography)((theme) => ({
  fontSize: "24px",
  fontWeight: 600,
}));

const StyledIconButton = styled(IconButton)((theme) => ({
  border: "1px solid #242424",
  maxHeight: "24px",
  maxWidth: "24px",
}));

export default Cards;
