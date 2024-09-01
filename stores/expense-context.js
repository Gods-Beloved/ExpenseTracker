import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  removeExpense: (expenseId) => {},
  updateExpense: (expenseId, { description, amount, date }) => {},
});

const DUMMY_EXPENSE = [
  {
    id: "e1",
    description: "Rent",
    amount: 56.0,
    date: new Date("2022-07-05"),
  },

  {
    id: "e6",
    description: "Rent Room 2",
    amount: 450.7,
    date: new Date("2022-07-15"),
  },

  {
    id: "e7",
    description: "Rent Room 3",
    amount: 34.4,
    date: new Date("2022-04-15"),
  },

  {
    id: "e2",
    description: "Rent Room 4",
    amount: 45.78,
    date: new Date("2022-07-18"),
  },

  {
    id: "e3",
    description: "Rent Room 5",
    amount: 223.67,
    date: new Date("2022-07-19"),
  },

  {
    id: "e4",
    description: "Rent Room 6",
    amount: 5000,
    date: new Date("2022-07-15"),
  },
];

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [
        ...state,
        {
          ...action.payload,
          id: id,
        },
      ];
    case "UPDATE":
      const updateExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      console.log(updateExpenseIndex);
      const updatableExpense = state[updateExpenseIndex];

      const updatedItem = {
        ...updatableExpense,
        ...action.payload.data,
      };
      const updateExpense = [...state];
      updateExpense[updateExpenseIndex] = updatedItem;
      return updateExpense;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpenseContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSE);

  function addExpense(expenseData) {
    console.log(expenseData);
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
