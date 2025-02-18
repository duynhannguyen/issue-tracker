import React from "react";
import Skeleton from "react-loading-skeleton";
const loading = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Skeleton
        height={80}
        width={200}
      />
      <Skeleton
        height={80}
        width={200}
      />
      <Skeleton
        height={80}
        width={200}
      />
      <Skeleton
        height={80}
        width={200}
      />
      <Skeleton
        height={80}
        width={200}
      />
      <Skeleton
        height={80}
        width={200}
      />
      <Skeleton
        height={80}
        width={200}
      />
      <Skeleton
        height={80}
        width={200}
      />
    </div>
  );
};

export default loading;
