import { useState } from "react";

export const useRefresh = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh((state) => !state);

  return [refresh, handleRefresh];
};
