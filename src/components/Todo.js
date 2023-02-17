import { useEffect, useState } from 'react';
import useContract from '../hooks/useContract';
import TodoContract from '../contracts/todo'
import useConnection from '../hooks/useConnection';

function Counter() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const contract = useContract(TodoContract.address, TodoContract.abi)
    const connection = useConnection();

    useEffect(() => {
        connection.connect();

        if (connection.address) {
            listTodos();
        }
    }, [connection.address])

    const listTodos = async () => {
        try {
            const tasks = await contract.list();
            setTodos(tasks.map(task => ({ isCompleted: task.isCompleted, content: task.content })));
        } catch (err) {
            setError("listTodos başarısız: " + err.message)
        }
    }

    const addTodo = async (value) => {
        try {
            setSearch("");

            const tx = await contract.addTask(value);
            await tx.wait();

            // listTodos();
            setTodos([...todos, { isCompleted: false, content: value }])
        } catch (err) {
            setError("addTodo başarısız: " + err.message)
        }
    }

    if (connection.isConnecting) return <div>loading...</div>
    if (error) return <div>{error}</div>

    const onSearch = (event) => {
        setSearch(event.target.value)
    }

    const onPress = (event) => {
        const value = event.target.value;
        if (event.keyCode === 13 && value.trim() !== "") {
            addTodo(value)
        }
    }

    const onClickTodo = async (event, index) => {
        try {
            const tx = await contract.updateTaskStatus(index);
            await tx.wait();

            const _todos = [...todos];
            _todos[index].isCompleted = !_todos[index].isCompleted;
            setTodos(_todos)
        } catch (err) {
            setError("updateTaskStatus başarısız: " + err.message)
        }
    }

    const onClickDelete = async (event, index) => {
        event.stopPropagation();
        try {
            const tx = await contract.removeTask(index);
            await tx.wait();

            setTodos(todos.filter((_, _index) => index !== _index))
        } catch (err) {
            setError("updateTaskStatus başarısız: " + err.message)
        }
    }

    return (<>
        <div>address: {connection.address}</div>
        <input type="text" value={search} onChange={onSearch} onKeyDown={onPress} />
        <ul style={{ width: "max-content" }}>
            {todos
                .filter(todo => todo.content.includes(search))
                .map((todo, index) => (
                    <li key={index} style={{ textDecoration: todo.isCompleted ? "line-through" : "inherit", cursor: "pointer" }}
                        onClick={event => onClickTodo(event, index)}>
                        <span>{todo.content}</span>
                        <span onClick={(event) => onClickDelete(event, index)}> ― &times;</span>
                    </li>
                ))}
        </ul>

        {/* todolist */}
    </>
    );
}

export default Counter;
