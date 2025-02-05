import * as React from "react";
import { Task } from "types/tasks";

import styles from "./styles.module.css";

export const Tasks = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const createTask = () => {};

  return <div className={styles.container}>Tasks</div>;
};
