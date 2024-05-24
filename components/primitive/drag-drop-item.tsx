"use client";

import { DNDItemData } from "./drag-drop-list";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  item: DNDItemData;
}

export default function DNDItem({ item }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {Object.entries(item.attributes).map(([title, value]) => (
        <span key={`${item}-${title}`}>{value}</span>
      ))}
    </li>
  );
}
