export const data = {
  success: true,
  message: "Manage Score Retrieved Successfully",
  data: {
    rawsCount: 8,
    raws: [
      {
        manageScoreId: 8,
        parameterName: "Demand Driven",
        parameterTypeId: 1,
        parameterType: { parameterTypeName: "Programme Performance Parameters"},
        weightage: [
          {
            weightageId: 15,
            weightage: "20%",
            measurementCriteria: [
              {
                measurementCriteriaId: 29,
                region: "East Region for Q1",
                operator: "<=",
                measurementCriteria: "AAAAA AAAAAAAA AAAAAAAAA",
                highestScoreCanBeObtained: 10,
                score: 10
              },
              {
                measurementCriteriaId: 30,
                region: "East Region for Q1",
                operator: "<=",
                measurementCriteria: "BBBB BBBB BBBB",
                highestScoreCanBeObtained: 10,
                score: 10
              }
            ]
          },


          {
            weightageId: 16,
            weightage: "15%",
            measurementCriteria: [
              {
                measurementCriteriaId: 31,
                region: "South Region",
                operator: "<=",
                measurementCriteria: "CCCCC CCCCCCCCCCCC",
                highestScoreCanBeObtained: 10,
                score: 10
              },
              {
                measurementCriteriaId: 32,
                region: "South Region",
                operator: "<=",
                measurementCriteria: "DDDDD DDDDDDDD",
                highestScoreCanBeObtained: 10,
                score: 10
              }
            ]
          }
        ],
        programMasterId: 1,
        ProgramYearId: 1,
        quarterMasterId: 1,
        isActive: true,
        createdAt: "2024-09-24T09:46:10.340Z",
        updatedAt: "2024-09-24T09:46:10.340Z",
        publishedAt: "2024-09-24T09:46:10.000Z"
      }
    ]
  }
};
