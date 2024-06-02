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

export default function ItemList<T extends BaseItem>(props: {
  items: T[];
  setItems: (items: T[]) => void;
  attributes: DisplayAttributes<T>;
}) {
  const id = useId();
  const [wasOutsideGroup, setWasOutsideGroup] = useState(false);

  function getGroup(parentId: UniqueIdentifier) {
    if (typeof parentId !== "string") return;
    const parentItemId = parentId.split(".")[1];

    const group =
      parentItemId === "root"
        ? props.items
        : props.items.find((item) => item.id === parentItemId)?.items;

    return group;
  }

  function swapGroup(group: BaseItem[], activeIdx: number, overIdx: number) {
    const item = group.splice(activeIdx, 1)[0];
    group.splice(overIdx, 0, item);
  }

  function sameGroupSwap(
    parentId: UniqueIdentifier,
    activeIdx: number,
    overIdx: number,
  ) {
    const group = getGroup(parentId);

    if (!group) return;

    swapGroup(group, activeIdx, overIdx);

    props.setItems(props.items);
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
    if (!wasOutsideGroup) {
      sameGroupSwap(
        overSortable.sortable.containerId,
        activeSortable.sortable.index,
        overSortable.sortable.index,
      );
    }
    setWasOutsideGroup(false);
  }

  function handleDragOver(e: DragOverEvent) {
    const activeSortable = e.active.data.current as SortableData;
    const overSortable = e.over?.data.current as SortableData;

    if (!activeSortable || !overSortable) {
      return;
    }

    const isOutside =
      overSortable.sortable.containerId !== activeSortable.sortable.containerId;

    if (isOutside && !wasOutsideGroup) {
      const activeGroup = getGroup(activeSortable.sortable.containerId);
      const overGroup = getGroup(overSortable.sortable.containerId);
      if (!activeGroup || !overGroup || activeGroup.length == 0) return;

      const item = activeGroup.splice(activeSortable.sortable.index, 1)[0];
      overGroup.push(item!);
    }

    setWasOutsideGroup(isOutside);
  }

  return (
    <DndContext
      id={id}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <DNDSortableList items={props.items} attributes={props.attributes} />
    </DndContext>
  );
}
