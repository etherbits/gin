export default function ListCol(props: {item:{title: string}}) {
  return <div className="bg-charcoal-950 shadow-sm rounded-lg px-4 py-3">{props.item.title}</div>;
}
