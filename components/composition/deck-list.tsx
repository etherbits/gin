"use client";

import DNDSortableList, {
  BaseItem,
  DisplayAttributes,
} from "../primitive/drag-drop-list";
import { DndContext, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { useId, useState } from "react";

export default function DeckList<T extends BaseItem>(props: {
  initialItems: BaseItem[];
  attributes: DisplayAttributes<T>;
}) {
  const id = useId();
  const [items, setItems] = useState(props.initialItems);
  const [wasOutside, setWasOutside] = useState(false);

  function handleDragStart(e: DragStartEvent) {
    console.log(e);
    //  todo
  }

  function handleDragEnd() {
    setWasOutside(false);
    setItems([...items]);
  }

  function handleDragOver(e: DragOverEvent) {
    const overId = e.over?.id;
    const isOutside = items.some((item) => item.id === overId);

    if (isOutside && !wasOutside && items[0].items!.length > 0) {
      const item = items[0].items!.shift();
      items.push(item!);
    }

    setWasOutside(isOutside);
  }

  return (
    <DndContext
      id={id}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <DNDSortableList items={items} attributes={props.attributes} />
    </DndContext>
  );
}
