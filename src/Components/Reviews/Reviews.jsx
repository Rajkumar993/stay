import React from "react";
import { Card, CardContent, Box, Rating, Divider } from "@mui/material";

export default function Review({ name, review, rating }) {
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        padding: 1,
        borderRadius: "16px",
        width: "100%",
        
      }}
    >
      <CardContent
        sx={{
          pr: 2,
          background: "white",
          width: "100%",
        }}
      >
        <Box mb={1}>
          <Box
            component="h3"
            sx={{
              fontSize: 14,
              fontWeight: "bold",
              letterSpacing: "0.5px",
              marginBotto1: 0,
              marginRight: 1,
              display: "inline-block",
              verticalAlign: "text-top",
               // Reduce top margin
            }}
          >
            {name}
          </Box>
          <Rating
            name="rating"
            value={rating}
            readOnly
            size="small"
            sx={{
              verticalAlign: "text-top",
            }}
          />
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: 14,
            color: "grey.500",
            mb: "0rem",
          }}
        >
          {review}
        </Box>
        <Divider
          bolder={true}
          sx={{
            mb: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            marginTop:-5,
            alignItems: "center",
          }}
        ></Box>
      </CardContent>
    </Card>
  );
}
