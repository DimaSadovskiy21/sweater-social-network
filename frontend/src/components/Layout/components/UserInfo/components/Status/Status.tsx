import { FC } from "react";

import { IStatusProps } from "./types";
import {
  CustomStatus,
  EditStatusArea,
  NoStatus,
  StatusWrapper,
} from "./styles";

const Status: FC<IStatusProps> = ({
  editStatus,
  statusLocal,
  isLoading,
  handleClickSaveStatus,
  handleChangeStatusLocal,
  handleClickEditStatus,
}) => {
  return (
    <StatusWrapper>
      {editStatus ? (
        <EditStatusArea
          value={statusLocal}
          onBlur={handleClickSaveStatus}
          onChange={handleChangeStatusLocal}
          autoFocus
          maxLength={100}
        />
      ) : (
        <CustomStatus $isLoading={isLoading} onClick={handleClickEditStatus}>
          {statusLocal ? statusLocal : <NoStatus>add a status...</NoStatus>}
        </CustomStatus>
      )}
    </StatusWrapper>
  );
};

export default Status;
