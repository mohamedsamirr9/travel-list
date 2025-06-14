import { useState } from "react";
import "./index.css";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    console.log(id);
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItemm={handleAddItem} />
      <List
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        items={items}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>💼 Far Away 🌴</h1>;
}
function Form({ onAddItemm }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState();

  function changeDescription(e) {
    setDescription(e.target.value);
  }
  function changeQuantity(e) {
    setQuantity(+e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddItemm({
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    });
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select onChange={changeQuantity} value={quantity}>
        {Array.from({ length: 20 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        onChange={changeDescription}
        value={description}
      />
      <button>add</button>
    </form>
  );
}
function List({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
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
