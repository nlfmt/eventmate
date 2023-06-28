import React from "react";
import c from "./DotNavigation.module.scss";

const DotNavigation = ({ count }: { count: number }) => {
  return (
    <div className={c.table}>
      <div className={c.cell}>
        <ul className={c.dots}>
          {(count >= 0 && <li className={c.dot_active}></li>) || (
            <li className={c.dot_inactive}></li>
          )}
          {(count >= 1 && <li className={c.dot_active}></li>) || (
            <li className={c.dot_inactive}></li>
          )}
          {(count >= 2 && <li className={c.dot_active}></li>) || (
            <li className={c.dot_inactive}></li>
          )}
          {(count >= 3 && <li className={c.dot_active}></li>) || (
            <li className={c.dot_inactive}></li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DotNavigation;
