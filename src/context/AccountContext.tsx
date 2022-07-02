import * as React from 'react';


import { IAccountOwner, accountOwner } from '../@types/accountOwner';

export const AccountContext = React.createContext<accountOwner | null> (null);

const AccountProvider: React.FC<React.ReactNode> = ({children}) => {

    const fetchedOwner: IAccountOwner = {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        primaryAddress: {
            street: "",
            zipcode:"",
            city: "",
            country: "",
        },
        password: "",
        accounts: [],
        createdAt: "",
        updatedAt: "",
        __v: 0,
    }
    const [ fetchedAccountOwner, setFetchedAccountOwner] = React.useState<IAccountOwner>(
        fetchedOwner
    );
}


/*
const TodoProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [todos, setTodos] = React.useState<ITodo[]>([
    {
      id: 1,
      title: 'post 1',
      description: 'this is a description',
      status: false,
    },
    {
      id: 2,
      title: 'post 2',
      description: 'this is a description',
      status: true,
    },
  ]);

  const saveTodo = (todo: ITodo) => {
    const newTodo: ITodo = {
      id: Math.random(), // not really unique - but fine for this example
      title: todo.title,
      description: todo.description,
      status: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: number) => {
    todos.filter((todo: ITodo) => {
      if (todo.id === id) {
        todo.status = true;
        setTodos([...todos]);
      }
    });
  };

  return <TodoContext.Provider value={{ todos, saveTodo, updateTodo }}>{children}</TodoContext.Provider>;
};

export default TodoProvider; */
