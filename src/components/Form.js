import { useState } from "react";
export default function Form({ onAddItemm }) {
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
