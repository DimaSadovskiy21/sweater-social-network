import { FormikProps } from "formik";

import { IPostsListProps } from "components/PostsList/types";
export interface IProfileProps<T> extends IPostsListProps {
  formik: FormikProps<T>;
  isCreatePostLoading: boolean;
}

export interface IAddPostValues {
  content: string;
}
