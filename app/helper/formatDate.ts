import { format } from "date-fns";
const formatDate = (date: Date) => {
  if (!Date) return;
  const formatedDate = format(date, "dd/MM/yyyy HH:mm");
  return formatedDate;
};

export default formatDate;
