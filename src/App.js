import { useEffect } from "react";
import { getContract } from "./contract";

function App() {

  const onClick = async () => {
    const contract = await getContract("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    const count = await contract.increase();

    console.log(count)
  }

  return (<>
    <div>App</div>
    <button onClick={onClick}>
      test
    </button>
  </>
  );
}

export default App;
