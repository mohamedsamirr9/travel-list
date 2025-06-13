import { useState } from "react";
import "./index.css";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <List />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>💼 Far Away 🌴</h1>;
}
function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState();

  function changeDescription(e) {
    setDescription(e.target.value);
  }
  function changeQuantity(e) {
    setQuantity(+e.target.value);
  }
  return (
    <div className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
      <select onChange={changeQuantity} value={quantity}>
        {Array.from({ length: 20 }, (_, i) => (
          <option value={i + 1}>{i + 1}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        onChange={changeDescription}
        value={description}
      />
      <button>add</button>
    </div>
  );
}
function List() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <div className="stats">
      <p>Start adding some items to your packing list 🚀</p>
    </div>
  );
}
