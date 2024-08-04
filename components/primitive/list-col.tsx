export default function ListCol(props: { item: { title: string } }) {
  return (
    <div className="rounded-lg bg-charcoal-950 px-4 py-3 shadow-sm">
      {props.item.title}
    </div>
  );
}
