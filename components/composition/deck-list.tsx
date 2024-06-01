"use client";

import DNDItem from "../primitive/drag-drop-item";
import DNDSortableList, {
  BaseItem,
  DisplayAttributes,
} from "../primitive/drag-drop-list";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useId, useState } from "react";

export default function DeckList<T extends BaseItem>(props: {
  initialItems: BaseItem[];
  attributes: DisplayAttributes<T>;
}) {
  const id = useId();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [items, setItems] = useState(props.initialItems);

  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id);
    console.log(e);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  function findItem(id: string) {
    const ids = id.split(">");
    const item = items.find((item) => item.id === ids[0]);
    console.log(id);

    if (!item) return null;

    if (ids.length == 1) return item;

    return item.items?.find((innerItem) => innerItem.id == ids[1]);
  }

  return (
    <DndContext id={id} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <DNDSortableList items={items} attributes={props.attributes} />
      <DragOverlay>
        {activeId ? (
          <DNDItem
            item={findItem(activeId as string)}
            attributes={props.attributes}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
