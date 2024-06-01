"use client";

import { BaseItem, DNDItemData, DisplayAttributes } from "./drag-drop-list";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props<T extends BaseItem> {
  parentId?: string;
  item: DNDItemData<T>;
  attributes: DisplayAttributes<T>;
  children?: React.ReactNode;
}

export default function DNDItem<T extends BaseItem>({
  parentId,
  item,
  attributes,
  children,
}: Props<T>) {
  const sortableId = parentId ? `${parentId}>${item.id}` : item.id;

  const {
    attributes: attrs,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
    isDragging,
  } = useSortable({ id: sortableId });

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
