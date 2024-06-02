"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BaseItem, DNDItem, DisplayAttributes } from "./drag-drop-list";

interface Props<T extends BaseItem> {
  item: DNDItem<T>;
  attributes: DisplayAttributes<T>;
  children?: React.ReactNode;
}

export default function DNDItem<T extends BaseItem>({
  item,
  attributes,
  children,
}: Props<T>) {
  const {
    attributes: attrs,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isOver ? "#ababab" : "transparent",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      className="flex flex-col gap-4 "
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attrs}
    >
      <div className="flex gap-2">
        {Object.entries(attributes).map(([title, key]) => (
          <span key={`${item}-${title}`}>{item[key]}</span>
        ))}
      </div>
      {children}
    </li>
  );
}
