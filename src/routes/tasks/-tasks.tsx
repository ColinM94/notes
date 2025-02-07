import * as React from "react";
import { Task } from "types/tasks";

import { reactReducer } from "utils/reactReducer";
import { Button } from "components/button/button";
import { Card } from "components/card/card";
import { InputText } from "components/inputText/inputText";
import { InputCheckbox } from "components/inputCheckbox/inputCheckbox";

import styles from "./styles.module.css";

const defaultTask = (): Task => {
  return {
    id: "",
    name: "",
    description: "",
    type: "daily",
    completed: false,
  };
};
export const Tasks = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const [newTask, updateNewTask] = reactReducer<Task>({
    id: "",
    name: "",
    description: "",
    type: "daily",
    completed: false,
  });

  const handleCreateTask = () => {
    setTasks([...tasks, newTask]);

    updateNewTask(defaultTask());
  };

  return (
    <div className={styles.container}>
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.name}>{task.name}</div>

            <InputCheckbox
              value={task.completed}
              setValue={(completed) =>
                updateNewTask({
                  completed,
                })
              }
              className={styles.checkbox}
            />
          </div>
        ))}
      </div>

      <Card className={styles.createTaskCard}>
        <InputText
          value={newTask.id}
          setValue={(id) =>
            updateNewTask({
              id,
            })
          }
          surface={1}
          placeholder="ID"
        />

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

        <Button label="Create Task" surface={1} onClick={handleCreateTask} />
      </Card>
    </div>
  );
};
