import { ChangeEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { IUserResponse } from "types/user";
import { QUERY_KEYS } from "api/constants";
import { useChangeStatus } from "api/user";
import { generateNotification } from "utils/generateNotification";

import Status from "./Status";
import { MESSAGES } from "../constants";


const StatusContainer = () => {
  const { isLoading, mutate: changeStatus } = useChangeStatus();

  const queryClient = useQueryClient();
  const userProfile = queryClient.getQueryData<IUserResponse>([
    QUERY_KEYS.USER_PROFILE,
  ]);

  const status = userProfile?.status;

  const [statusLocal, setStatusLocal] = useState(status);
  const [editStatus, setEditStatus] = useState(false);

  const handleChangeStatusLocal = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setStatusLocal(event.target.value);
  };

  const handleClickEditStatus = () => {
    setEditStatus(true);
  };

  const handleClickSaveStatus = () => {
    statusLocal !== undefined && changeStatus({ status: statusLocal.trim() });
    setEditStatus(false);
  };

  isLoading && generateNotification({ type: "info", content: MESSAGES.CHANGE });

  return (
    <Status
      editStatus={editStatus}
      statusLocal={statusLocal}
      isLoading={isLoading}
      handleClickSaveStatus={handleClickSaveStatus}
      handleChangeStatusLocal={handleChangeStatusLocal}
      handleClickEditStatus={handleClickEditStatus}
    />
  );
};

export default StatusContainer;
