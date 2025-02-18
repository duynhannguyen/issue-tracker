import GroupDialog from "./GroupDialog";
import GroupList from "./GroupList";

const Groups = () => {
  return (
    <div>
      <p className="font-semibold mb-2">YOUR GROUPS</p>
      <div className="flex gap-2 flex-col">
        <GroupList />
        <GroupDialog />
      </div>
    </div>
  );
};

export default Groups;
