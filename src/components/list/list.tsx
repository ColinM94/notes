import React from "react";
import styles from "./styles.module.css";
import { classes } from "utils/classes";

interface Props<T> {
  items: T[];
  keyExtractor: (item: T) => string;
}

export const List = <T,>(props: Props<T>) => {
  const { items, keyExtractor } = props;

  const [draggedIndex, setDraggedIndex] = React.useState<null | number>(null);
  const [mouse, setMouse] = React.useState<[number, number]>([0, 0]);
  const [dropZone, setDropZone] = React.useState<null | number>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse([e.x, e.y]);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  React.useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();

      if (dropZone === null || draggedIndex === null) return;

      const tempItems = items;
      const tempItem = items[dropZone];

      tempItems[dropZone] = items[draggedIndex];
      tempItems[draggedIndex] = tempItem;

      setDraggedIndex(null);
      setDropZone(null);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  });

  React.useEffect(() => {
    if (draggedIndex !== null) {
      const elements = Array.from(document.getElementsByClassName("dropZone"));
      const positions = elements.map((e) => e.getBoundingClientRect().top);
      const absDifferences = positions.map((v) => Math.abs(v - mouse[1]));
      let result = absDifferences.indexOf(Math.min(...absDifferences));

      console.log(result);

      //   if (result > draggedIndex) result += 1;

      setDropZone(result);
    }
  }, [draggedIndex, mouse]);

  return (
    <div className={styles.container}>
      {items.map((item, index) => {
        const isDragged = draggedIndex === index;

        return (
          <React.Fragment key={keyExtractor(item)}>
            {dropZone !== null && isDragged !== null && (
              <div
                className={classes(
                  "dropZone",
                  dropZone === index ? styles.dropZone : styles.dropZoneHidden
                )}
              />
            )}

            <div
              onMouseDown={(e) => {
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
            >
              {item.description}
            </div>

            {index === items.length && (
              <div
                className={classes(
                  "dropZone",
                  dropZone === index ? styles.dropZone : styles.dropZoneHidden
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
