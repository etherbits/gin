"use client";

import { Dispatch, InputHTMLAttributes, SetStateAction, useState } from "react";
import { useQuery } from "react-query";

type Props<T> = React.HTMLAttributes<HTMLDivElement> & {
  placeholder: string;
  field: InputHTMLAttributes<HTMLInputElement>;
  getItems: () => Promise<T[]>;
  addItem: (val: string) => Promise<T>;
  render: (item: T, setDisplay: Dispatch<SetStateAction<string>>) => React.ReactElement;
};

export function Selector<T>(props: Props<T>) {
  // const queryClient = useQueryClient();
  const query = useQuery(props.field.name!, props.getItems);
  console.log(props.field.name)

  // const mutation = useMutation(props.addItem, {
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries("todos");
  //   },
  // });

  const [isOpen, setIsOpen] = useState(true);
  const [display, setDisplay] = useState(props.placeholder);

  return (
    <div className="relative">
      <input type="hidden" {...props.field} />
      <button
        className="cursor-pointer disabled:cursor-not-allowed"
        disabled={query.status == "loading"}
        onClick={() => setIsOpen((x) => !x)}
      >
        {display}
      </button>
      <ul
        className="absolute top-full mt-4 px-4 py-3"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {query.status === "success" ? (
          query.data.map((item) => props.render(item, setDisplay))
        ) : query.status === "error" ? (
          <span className="text-red-400">
            Something went wrong with fetching the items
          </span>
        ) : (
          <span>Loading...</span>
        )}
      </ul>
    </div>
  );
}

interface SelectItemProps {
  id: string;
  value: string;
  display: string;
  setValue: (value: string) => void;
}

export function SelectItem(props: SelectItemProps) {
  return (
    <li key={props.id}>
      <button
        onClick={() => {
          props.setValue(props.value);
        }}
      >
        {props.display}
      </button>
    </li>
  );
}
