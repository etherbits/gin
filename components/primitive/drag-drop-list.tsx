"use client";

import DNDItem from "./drag-drop-item";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Dispatch, SetStateAction, useId } from "react";

export interface DNDItemData {
  id: string;
  index: number;
  attributes: Record<string, string | number>;
}

interface Props {
  items: DNDItemData[];
  setItems: Dispatch<SetStateAction<DNDItemData[]>>;
}

export default function DNDList(props: Props) {
  const id = useId();

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
    props.items[oldIndex].index = -1;

    for (let i = newIndex; i !== oldIndex; i -= increment) {
      const item = props.items[i];
      item.index -= increment;
    }

    props.items[oldIndex].index = newIndex;

    props.setItems([...props.items].sort((a, b) => a.index - b.index));
  }

  return (
    <DndContext id={id} onDragEnd={handleDragEnd}>
      <SortableContext id={id} items={props.items}>
        <ul ref={setNodeRef} style={style}>
          {props.items.map((item) => (
            <DNDItem key={item.id} item={item} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
