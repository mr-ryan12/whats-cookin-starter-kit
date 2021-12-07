const recipesData = [{
  "id": 10,
      "image": "https://grillchesse.jpg",
      "ingredients": [
        {
          "id": 1,
          "quantity": {
            "amount": 2,
            "unit": "sl"
          }
        },
        {
          "id": 2,
          "quantity": {
            "amount": 2,
            "unit": "sl"
          }
        },
        {
          "id": 3,
          "quantity": {
            "amount": 1,
            "unit": "tsp"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Butter two pieces of bread.",
          "number": 1
        },
        {
          "instruction": "Grill our bread with cheese in between.",
          "number": 2
        }
      ],
      "name": "Grill Cheese",
      "tags": [
        "snack",
        "lunch",
        "sandwich"
      ]
  }];

export default recipesData;