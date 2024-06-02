"use client";

import DNDItem from "./drag-drop-item";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export type BaseItem = {
  id: string;
  title: string;
  index: number;
  items?: BaseItem[];
} & {
  new: number;
  learning: number;
  review: number;
};

export type DNDItem<T extends BaseItem> = T & Record<string, string | number>;

export type DisplayAttributes<T extends BaseItem> = Record<
  string,
  keyof DNDItem<T>
>;

type Props<T extends BaseItem> = {
  items: BaseItem[];
  attributes: DisplayAttributes<T>;
  groupId?: string;
  level?: number;
} & React.HTMLAttributes<HTMLUListElement>;

export default function DNDSortableList<T extends BaseItem>({
  level = 0,
  ...props
}: Props<T>) {
  return (
    <SortableContext
      id={"sortable." + (props.groupId ?? "root")}
      items={props.items.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <ul style={{ paddingLeft: `${level * 16}px` }}>
        {props.items.map((item) =>
          item.items ? (
            <DNDItem key={item.id} item={item} attributes={props.attributes}>
              {item.items.length > 0 && (
                <DNDSortableList
                  groupId={item.id}
                  items={item.items}
                  attributes={props.attributes}
                  level={level + 1}
                />
              )}
            </DNDItem>
          ) : (
            <DNDItem key={item.id} item={item} attributes={props.attributes} />
          ),
        )}
      </ul>
    </SortableContext>
  );
}
