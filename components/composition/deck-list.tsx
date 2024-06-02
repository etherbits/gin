"use client";

import DNDSortableList, {
  BaseItem,
  DisplayAttributes,
} from "../primitive/drag-drop-list";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableData } from "@dnd-kit/sortable";
import { useId, useState } from "react";

export default function DeckList<T extends BaseItem>(props: {
  initialItems: BaseItem[];
  attributes: DisplayAttributes<T>;
}) {
  const id = useId();
  const [items, setItems] = useState(props.initialItems);
  const [wasOutside, setWasOutside] = useState(false);
  // const changedItems = [];

  function swapGroup(group: BaseItem[], activeIdx: number, overIdx: number) {
    const item = group.splice(activeIdx, 1)[0];
    group.splice(overIdx, 0, item);
  }

  function sameGroupSwap(
    parentId: UniqueIdentifier,
    activeIdx: number,
    overIdx: number,
  ) {
    if (typeof parentId !== "string") return;
    const parentItemId = parentId.split(".")[1];

    const group =
      parentItemId === "root"
        ? items
        : items.find((item) => item.id === parentItemId)?.items;

    if (!group) return;

    swapGroup(group, activeIdx, overIdx);

    setItems([...items]);
  }

  function handleDragStart(e: DragStartEvent) {
    console.log(e);
    //  todo
  }

  function handleDragEnd(e: DragEndEvent) {
    const activeSortable = e.active.data.current as SortableData;
    const overSortable = e.over?.data.current as SortableData;

    if (!activeSortable || !overSortable) {
      return;
    }
    console.log(wasOutside);
    if (!wasOutside) {
      sameGroupSwap(
        overSortable.sortable.containerId,
        activeSortable.sortable.index,
        overSortable.sortable.index,
      );
    }
    setWasOutside(false);
    // setItems([...items]);
  }

  function handleDragOver(e: DragOverEvent) {
    // const overId = e.over?.id;
    // const isOutside = items.some((item) => item.id === overId);
    //
    // if (isOutside && !wasOutside && items[0].items!.length > 0) {
    //   // const item = items[0].items!.shift();
    //   // items.push(item!);
    // }
    //
    // setWasOutside(isOutside);
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
