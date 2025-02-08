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

import styles from "./styles.module.css";

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

  return (
    <div className={styles.container}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.task}>
          <div className={styles.name}>{task.description}</div>

          <InputCheckbox
            value={task.completed}
            setValue={(completed) =>
              updateNewTask({
                completed,
              })
            }
            className={styles.checkbox}
          />

          <Button icon="delete" onClick={() => handleDelete(task.id)} />
        </div>
      ))}

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
