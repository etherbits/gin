"use client";

import DNDItem from "./drag-drop-item";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useId, useState } from "react";

export interface BaseItem {
  id: string;
  title: string;
  index: number;
  items?: BaseItem[];
}

export type DNDItem<T extends BaseItem> = T & Record<string, string | number>;

export type DisplayAttributes<T extends BaseItem> = Record<
  string,
  keyof DNDItem<T>
>;

type Props<T extends BaseItem> = {
  parentId?: string;
  items: BaseItem[];
  attributes: DisplayAttributes<T>;
  level?: number;
} & React.HTMLAttributes<HTMLUListElement>;

export default function DNDSortableList<T extends BaseItem>({
  parentId,
  items,
  attributes,
  level = 0,
}: Props<T>) {
  return (
    <SortableContext
      items={items.map((item) =>
        parentId ? `${parentId}>${item.id}` : item.id,
      )}
      strategy={verticalListSortingStrategy}
    >
      <ul style={{ paddingLeft: `${level * 16}px` }}>
        {items.map((item) =>
          item.items ? (
            <DNDItem
              key={item.id}
              parentId={parentId}
              item={item}
              attributes={attributes}
            >
              <DNDSortableList
                parentId={item.id}
                items={item.items}
                attributes={attributes}
                level={level + 1}
              />
            </DNDItem>
          ) : (
            <DNDItem
              key={item.id}
              parentId={parentId}
              item={item}
              attributes={attributes}
            />
          ),
        )}
      </ul>
    </SortableContext>
  );
}
