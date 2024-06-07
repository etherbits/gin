interface Item {
  id: string;
  title: string;
}

type Props<T extends Item> = {
  items: T[];
  render: (item: T) => JSX.Element;
} & React.HTMLAttributes<HTMLUListElement>;

export default function DataList<T extends Item>(props: Props<T>) {
  const { items, render, ...rest } = props;

  return (
    <ul className="flex flex-col gap-4" {...rest}>
      {items.map((item) => {
        return <li key={item.id}>{render(item)}</li>;
      })}
    </ul>
  );
}
