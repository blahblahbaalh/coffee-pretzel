import { useState } from "react";
import Table from "../Layout/Table/Table";
import Todo from "../Layout/Todo/Todo";

import styles from "./cafe.module.css";

function CafePage() {
  const [ isCollapsed, setIsCollapsed ] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  }

  return (
    <>
      <Todo className={styles.todo} onClick={handleToggleCollapse} isCollapsed={isCollapsed} isTable={true}/>
      <Table className={styles.table} />
      <button>Peep Around</button>
    </>
  );
}

export default CafePage;
