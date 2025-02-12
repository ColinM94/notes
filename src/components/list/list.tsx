import React from "react";

import { classes } from "utils/classes";

import { ListItem } from "./components/listItem/listItem";
import { ListProps } from "./types";
import styles from "./styles.module.css";
import { swapArrayElements } from "utils/swapArrayElements";

export const List = <T,>(props: ListProps<T>) => {
  const { items, setItems, onDeleteClick, keyExtractor } = props;

  const [draggedIndex, setDraggedIndex] = React.useState<null | number>(null);
  const [mouse, setMouse] = React.useState<[number, number]>([0, 0]);
  const [dropZoneIndex, setDropZoneIndex] = React.useState<null | number>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse([e.x, e.y]);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      setMouse([e.touches[0].clientX, e.touches[0].clientY]);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("touchmove", handleTouchMove);
  }, []);

  const handleMouseUp = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    if (dropZoneIndex === null || draggedIndex === null) return;

    const adjustedDropZoneIndex =
      draggedIndex >= dropZoneIndex ? dropZoneIndex : dropZoneIndex - 1;

    const updatedItems = swapArrayElements(
      items,
      draggedIndex,
      adjustedDropZoneIndex
    );

    setItems(updatedItems);

    // const tempItems = [...items];

    // console.log(tempItems);

    // console.log(`Swapping ${draggedIndex} with ${adjustedDropZoneIndex}`);

    // swap(tempItems, draggedIndex, adjustedDropZoneIndex);

    // setItems([...tempItems]);

    setDraggedIndex(null);
    setDropZoneIndex(null);
  };

  React.useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  });

  // console.log(`Dragged Index: ${draggedIndex}`);
  // console.log(`Drop Zone Index: ${dropZoneIndex}`);

  React.useEffect(() => {
    if (draggedIndex !== null) {
      const elements = Array.from(document.getElementsByClassName("dropZone"));
      const positions = elements.map((e) => e.getBoundingClientRect().top);
      const absDifferences = positions.map((v) => Math.abs(v - mouse[1]));
      const result = absDifferences.indexOf(Math.min(...absDifferences));

      setDropZoneIndex(result);
    }
  }, [draggedIndex, mouse]);

  return (
    <div className={styles.container}>
      {items.map((item, index) => {
        const isDragged = draggedIndex === index;

        return (
          <React.Fragment key={keyExtractor(item)}>
            {dropZoneIndex !== items.length + 1 && (
              <ListItem
                // index={index}
                className={classes(
                  "dropZone",
                  styles.dropZone,
                  dropZoneIndex === index && styles.dropZoneShow,
                  dropZoneIndex !== index && styles.dropZoneHide
                  // isDragged && styles.dropZoneNoTransition
                )}
              />
            )}

            <ListItem
              description={item.description}
              index={index}
              onDeleteClick={() => onDeleteClick(item)}
              onMouseDown={(e) => {
                e.preventDefault();
                setDraggedIndex(index);
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                setDraggedIndex(index);
              }}
              style={{
                ...(isDragged && {
                  left: `${mouse[0]}px`,
                  top: `${mouse[1]}px`,
                }),
              }}
              className={classes(styles.item, isDragged && styles.draggedItem)}
            />
          </React.Fragment>
        );
      })}

      <ListItem
        index={items.length - 1}
        className={classes(
          "dropZone",
          styles.dropZone,
          dropZoneIndex === items.length && styles.dropZoneShow,
          dropZoneIndex !== items.length && styles.dropZoneHide
          // isDragged && styles.dropZoneNoTransition
        )}
      />
    </div>
  );
};
