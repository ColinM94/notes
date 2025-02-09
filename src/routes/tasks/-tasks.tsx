import * as React from "react";
import { Task } from "types/tasks";
import { UnsubscribeFunc } from "pocketbase";

import { reactReducer } from "utils/reactReducer";
import { Button } from "components/button/button";
import { Card } from "components/card/card";
import { InputText } from "components/inputText/inputText";
import { InputCheckbox } from "components/inputCheckbox/inputCheckbox";
import { subscribeToCollection } from "services/database/subscribeToCollection";
import { createRecord } from "services/database/createRecord";
import { deleteRecord } from "services/database/deleteRecord";
import { FormSubmitEvent } from "types/general";
import { useAppStore } from "stores/appStore";
import { classes } from "utils/classes";
import { updateRecord } from "services/database/updateRecord";

import styles from "./styles.module.css";
import { List } from "components/list/list";

const defaultTask = (userId: string): Task => {
  return {
    id: "",
    name: "",
    description: "",
    frequency: "daily",
    completed: false,
    userId,
  };
};

export const Tasks = () => {
  const { user } = useAppStore();

  const [tasks, setTasks] = React.useState<Task[]>([]);

  const [newTask, updateNewTask] = reactReducer<Task>(defaultTask(user.id));
  const [dragged, setDragged] = React.useState<number | null>(null); // storing the dragged item as an index
  const [mouse, setMouse] = React.useState<[number, number]>([0, 0]);
  const [dropZone, setDropZone] = React.useState(0);

  React.useEffect(() => {
    let unsubscribe: UnsubscribeFunc | undefined;

    (async () => {
      unsubscribe = await subscribeToCollection<Task>({
        collection: "tasks",
        setData: setTasks,
      });
    })();

    return () => {
      unsubscribe?.();
    };
  }, []);

  // get mouse coordenates
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse([e.x, e.y]);
    };

    document.addEventListener("mousemove", handler);

    return () => document.removeEventListener("mousemove", handler);
  }, []);

  // get closest drop zone
  React.useEffect(() => {
    if (dragged !== null) {
      // get all drop-zones
      const elements = Array.from(document.getElementsByClassName("dropZone"));
      // get all drop-zones' y-axis position
      // if we were using a horizontally-scrolling list, we would get the .left property
      const positions = elements.map((e) => e.getBoundingClientRect().top);
      // get the difference with the mouse's y position
      const absDifferences = positions.map((v) => Math.abs(v - mouse[1]));

      // get the item closest to the mouse
      let result = absDifferences.indexOf(Math.min(...absDifferences));

      // if (result > dragged) result += 1;

      setDropZone(result);
    }
  }, [dragged, mouse]);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dragged !== null) {
        e.preventDefault();
        setDragged(null);
      }
    };

    document.addEventListener("mouseup", handler);
    return () => document.removeEventListener("mouseup", handler);
  });

  const handleDelete = async (taskId: string) => {
    await deleteRecord({
      collection: "tasks",
      id: taskId,
    });
  };

  const handleSubmit = async (event?: FormSubmitEvent) => {
    event?.preventDefault();

    if (!newTask) return;

    await createRecord<Task>({
      collection: "tasks",
      data: newTask,
    });

    updateNewTask(defaultTask(user.id));
  };

  const renderTask = (task: Task, index: number) => {
    const isDragged = dragged === index;

    return (
      <>
        {dragged !== null && !isDragged && (
          <div
            className={classes(
              "dropZone",
              styles.task,
              dropZone === index - 1 ? styles.dropZone : styles.dropZoneHidden
            )}
          />
        )}

        <div
          key={task.id}
          onMouseDown={(e) => {
            e.preventDefault();
            setDragged(index);
          }}
          style={{
            ...(isDragged && {
              left: `${mouse[0]}px`,
              top: `${mouse[1]}px`,
            }),
          }}
          className={classes(styles.task, isDragged && styles.floating)}
        >
          <div>#{index}</div>
          <div className={styles.name}>{task.description}</div>

          <InputCheckbox
            value={task.completed}
            setValue={(completed) =>
              updateRecord<Task>({
                collection: "tasks",
                id: task.id,
                data: {
                  completed,
                },
              })
            }
            className={styles.checkbox}
          />

          <Button icon="delete" onClick={() => handleDelete(task.id)} />
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.tasks}>
        {tasks.map((task, index) => {
          return renderTask(task, index);
        })}
      </div> */}

      <List items={tasks} keyExtractor={(item) => item.id} />

      {dragged !== null && (
        <div
          className={classes(
            "dropZone",
            styles.task,
            dropZone === tasks.length - 1
              ? styles.dropZone
              : styles.dropZoneHidden
          )}
        />
      )}

      <Card className={styles.createTaskCard}>
        <form onSubmit={handleSubmit} className={styles.createTaskForm}>
          <InputText
            value={newTask.name}
            setValue={(name) =>
              updateNewTask({
                name,
              })
            }
            surface={1}
            placeholder="Name"
          />

          <InputText
            value={newTask.description}
            setValue={(description) =>
              updateNewTask({
                description,
              })
            }
            surface={1}
            placeholder="Description"
          />

          <Button label="Create Task" surface={1} onClick={handleSubmit} />
        </form>
      </Card>
    </div>
  );
};
