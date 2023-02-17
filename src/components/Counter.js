import { useEffect, useState } from 'react';
import useContract from '../hooks/useContract';
import CounterContract from '../contracts/counter'
import useConnection from '../hooks/useConnection';

function Counter() {
    const [counter, setCounter] = useState(0);
    const [error, setError] = useState("");

    const contract = useContract(CounterContract.address, CounterContract.abi)
    const connection = useConnection();

    useEffect(() => {
        connection.connect();

        if (connection.address) {
            viewValue();
        }
    }, [connection.address])


    const viewValue = async () => {
        try {
            const tx = await contract.viewValue();
            setCounter(tx.data)
        } catch (error) {
            // setError("viewValue hata veriyor: " + error.message)
        }
    }

    const increase = async () => {
        try {
            const tx = await contract.increase();
            const result = await tx.wait();
            setCounter(counter + 1)
        } catch (err) {
            setError("increase hata veriyor: ", error.message)
        }
    }

    const decrease = async () => {
        try {
            const tx = await contract.decrease();
            const result = await tx.wait();
            setCounter(counter - 1)
        } catch (err) {
            setError("decrease hata veriyor: ", error.message)
        }
    }

    if (connection.isConnecting) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (<>
        <div>address: {connection.address}</div>
        <div>counter: {counter}</div>
        <button onClick={increase}>increase</button>
        <button onClick={decrease}>decrease</button>
    </>
    );
}

export default Counter;
