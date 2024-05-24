"use client";

import DNDItem from "./drag-drop-item";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useId, useState } from "react";

export interface DNDItemData {
  id: string;
  index: number;
  attributes: Record<string, string | number>;
  isGroup?: boolean;
}

type Props = {
  initialItems: DNDItemData[];
} & React.HTMLAttributes<HTMLUListElement>;

export default function DNDList({ initialItems, ...rest }: Props) {
  const id = useId();

  const [items, setItems] = useState<DNDItemData[]>(
    initialItems.sort((a, b) => a.index - b.index),
  );

  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over == null) return;

    const oldIndex = active.data.current?.sortable.index;
    const newIndex = over.data.current?.sortable.index;

    if (
      oldIndex === undefined ||
      newIndex === undefined ||
      oldIndex === newIndex
    )
      return;

    const increment = oldIndex > newIndex ? -1 : 1;
    items[oldIndex].index = -1;

    for (let i = newIndex; i !== oldIndex; i -= increment) {
      const item = items[i];
      item.index -= increment;
    }

    items[oldIndex].index = newIndex;

    setItems([...items].sort((a, b) => a.index - b.index));
  }

  return (
    <DndContext id={id} onDragEnd={handleDragEnd}>
      <SortableContext id={id} items={items}>
        <ul ref={setNodeRef} style={style} {...rest}>
          {items.map((item) =>
            item.isGroup ? (
              <SortableContext key={item.id} id={id+1} items={items}>
                <ul
                  ref={setNodeRef}
                  style={style}
                  {...rest}
                  className="py-4 bg-slate-600"
                >
                  {items.map((item) => (
                    <DNDItem key={item.id} item={item} />
                  ))}
                </ul>
              </SortableContext>
            ) : (
              <DNDItem key={item.id} item={item} />
            ),
          )}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
