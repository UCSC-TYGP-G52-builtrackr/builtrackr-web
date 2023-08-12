const dummyLeaveData = [
    {
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
      available: true,
      leaves: [
        { date: "2023-07-25", status: "previous" },
        { date: "2023-07-28", status: "upcoming" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "UI/UX Designer",
      available: false,
      leaves: [
        { date: "2023-07-20", status: "previous" },
        { date: "2023-08-02", status: "upcoming" },
      ],
    },
    // Add more employee data here...
  ];
  
  export default dummyLeaveData;
  