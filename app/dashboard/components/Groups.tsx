"use client";

import { Button, Dialog } from "@radix-ui/themes";
import React from "react";

const Groups = () => {
  return (
    <div>
      <p className="font-semibold mb-2">YOUR GROUPS</p>
      <Dialog.Root>
        <Dialog.Trigger>
          <button className=" bg-slate-400/30 rounded-lg text-gray-500 font-semibold p-1  h-20 w-52 hover:bg-primary transition-colors  ">
            Create new group
          </button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Create Your Group</Dialog.Title>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Groups;
