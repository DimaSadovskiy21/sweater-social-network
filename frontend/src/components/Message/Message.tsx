import { FC } from "react";

import { IMessageProps } from "./types";
import { MessageWrapper } from "./styles";

const Message: FC<IMessageProps> = ({ message }) => <MessageWrapper>{message}</MessageWrapper>;

export default Message;
