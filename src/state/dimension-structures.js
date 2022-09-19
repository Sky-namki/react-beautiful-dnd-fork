// @flow
import memoizeOne from 'memoize-one';
import { values } from '../native-with-fallback';
import type {
  DroppableDimension,
  DroppableDimensionMap,
  DraggableDimension,
  DraggableDimensionMap,
} from '../types';

export const toDroppableMap = memoizeOne(
  (droppables: DroppableDimension[]): DroppableDimensionMap =>
    droppables
      // Sort by nested level - deepest levels must be first
      // fixes https://github.com/atlassian/react-beautiful-dnd/issues/2385#issuecomment-1251003147
      .sort(
        (
          { page: { contentBox: { left: a } } },
          { page: { contentBox: { left: b } } }
        ) => (
          a === b ? 0 : (a > b ? -1 : 1)
        )
      )
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
