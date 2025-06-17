export default function Stats({ items }) {
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
