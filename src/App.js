import { useState } from "react";
import "./index.css";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
  const [items, setItems] = useState([]);

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

  function handleClearList() {
    const confirm = window.confirm("Are You Sure To Clear All Items ?");
    confirm && setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItemm={handleAddItem} />
      <List
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
        items={items}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>💼 Far Away 🌴</h1>;
}
function Form({ onAddItemm }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function changeDescription(e) {
    setDescription(e.target.value);
  }
  function changeQuantity(e) {
    setQuantity(+e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (description === "") return;
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
function List({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sort, setSort] = useState("input");
  let sortedItems;

  if (sort === "input") sortedItems = items;
  if (sort === "description")
    sortedItems = items.toSorted((a, b) =>
      a.description.localeCompare(b.description)
    );

  if (sort === "packed")
    sortedItems = items.toSorted((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="input">SORT BY INPUT ORDER</option>
          <option value="description">SORT BY DESCRIPTION</option>
          <option value="packed">SORT BY PACKED</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
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
function Stats({ items }) {
  if (!items.length)
    return (
      <div className="stats">
        <p>Start adding some items to your packing list 🚀</p>
      </div>
    );

  let packedItemsLength = items.filter((item) => item.packed === true).length;
  let percentage = Math.round((packedItemsLength / items.length) * 100);
  return (
    <div className="stats">
      <p>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${items.length} items on your list, and you already packed ${packedItemsLength} (${percentage}%)`}
      </p>
    </div>
  );
}
