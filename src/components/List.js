import { useState } from "react";
import Item from "./Item";
export default function List({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
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
