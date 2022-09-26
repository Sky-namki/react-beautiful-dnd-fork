// @flow
import memoizeOne from 'memoize-one';
import { values } from '../native-with-fallback';
import type {
  DroppableDimension,
  DroppableDimensionMap,
  DraggableDimension,
  DraggableDimensionMap,
} from '../types';

/**
 * Sort by nested level - deepest levels must be first
 * fixes https://github.com/atlassian/react-beautiful-dnd/issues/2385#issuecomment-1251003147
 */
export type CompareDroppableType = { page: { contentBox: { top: number; left: number; } } };
export const compareDroppables = (
  { page: { contentBox: a } }: CompareDroppableType,
  { page: { contentBox: b } }: CompareDroppableType,
) =>
  a.left === b.left
    ? (a.top === b.top ? 0 : (a.top < b.top ? -1 : 1))
    : (a.left > b.left ? -1 : 1);

export const toDroppableMap = memoizeOne(
  (droppables: DroppableDimension[]): DroppableDimensionMap =>
    droppables
      .sort(compareDroppables)
      .reduce((previous, current) => ({ ...previous, [current.descriptor.id]: current }), {}),
);

export const toDraggableMap = memoizeOne(
  (draggables: DraggableDimension[]): DraggableDimensionMap =>
    draggables.reduce((previous, current) => {
      previous[current.descriptor.id] = current;
      return previous;
    }, {}),
);

export const toDroppableList = memoizeOne(
  (droppables: DroppableDimensionMap): DroppableDimension[] =>
    values(droppables),
);

export const toDraggableList = memoizeOne(
  (draggables: DraggableDimensionMap): DraggableDimension[] =>
    values(draggables),
);
