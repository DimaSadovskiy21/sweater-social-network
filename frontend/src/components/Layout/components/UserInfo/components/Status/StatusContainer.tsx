import { ChangeEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { IUserResponse } from "types/user";
import { QUERY_KEYS } from "api/constants";
import { useChangeStatus } from "api/user";

import Status from "./Status";

const StatusContainer = () => {
  const queryClient = useQueryClient();
  const userProfile = queryClient.getQueryData<IUserResponse>([
    QUERY_KEYS.USER_PROFILE,
  ]);

  const status = userProfile?.status;

  const { isLoading, mutate: changeStatus } = useChangeStatus();

  const [statusLocal, setStatusLocal] = useState(status);
  const [editStatus, setEditStatus] = useState(false);

  const handleChangeStatusLocal = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setStatusLocal(event.target.value.trim());
  };

  const handleClickEditStatus = () => {
    setEditStatus(true);
  };

  const handleClickSaveStatus = () => {
    statusLocal && changeStatus({ status: statusLocal });
    setEditStatus(false);
  };

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
