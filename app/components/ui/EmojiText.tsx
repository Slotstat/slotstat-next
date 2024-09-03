export default function EmojiText({ item }: { item: country }) {
  return (
    <span>
      <img src={item.image} alt={item.name} className="h-4 w-4" />
    </span>
  );
}
