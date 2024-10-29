export const shipments = [
  {
    id: 1,
    shipmentNumber: "SHIP-001",
    pickupLocations: {
      multiple_pickup_location: false,
      pickup_location: "Yeka, Gulf, Southern Region, Papua New Guinea",
      pickup_date: "2024-10-30T23:59:59",
      from: "12:49",
      to: "12:52",
      contact_person: {
        full_name: "Kebede Guracha Mega",
        phone_number: "0987654321",
        email: "kebede@gmail.com",
      },
      id: "0fdd934b-0235-4c54-b9a6-5b0bad3054fb",
    },
    items: [
      {
        itemCategory: "Parcels and Small Packages",
        packagingType: "Pallets",
        itemDescription: "Item one",
        quantity: 12,
        dimension: {
          length: 3,
          width: 3,
          height: 3,
        },
        totalWeight: 672,
        dropOffLocations: [
          {
            multiple_dropoff_location: true,
            dropoff_location: "Yeka, Agago, \n Northern Region, Uganda",
            delivery_date: "10/23/2024",
            reciver: {
              full_name: "Nati Tolosa Gadi",
              phone_number: "0987654321",
              email: "nati@gmail.com",
            },
            quantity: 12,
            id: "7093f5bb-557b-49ac-9f80-dcb484c54e67",
          },
        ],
        id: "7ed740ca-9655-4fbc-befc-588384946fc2",
      },
    ],
  },
];
