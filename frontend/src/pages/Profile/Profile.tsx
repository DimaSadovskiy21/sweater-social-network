import { FC } from "react";

import { Button } from "components/Button";
import { PostsList } from "components/PostsList";

import { MESSAGES } from "./constants";
import { AddPostField, AddPostForm } from "./styles";
import { IAddPostValues, IProfileProps } from "./types";

const Profile: FC<IProfileProps<IAddPostValues>> = ({
  formik,
  isCreatePostLoading,
  isPostsFetching,
  ...postsListProps
}) => {
  const { values, handleSubmit, getFieldProps } = formik;

  const isAddPostDisabled = isPostsFetching || isCreatePostLoading;

  return (
    <>
      <AddPostForm onSubmit={handleSubmit}>
        <AddPostField
          placeholder="Enter the content..."
          disabled={isAddPostDisabled}
          {...getFieldProps("content")}
        />
        <Button
          type="submit"
          isLoading={isAddPostDisabled}
          disabled={isAddPostDisabled || !values.content.trim()}
        >
          Add Post
        </Button>
      </AddPostForm>
      <PostsList
        noPostsMessage={MESSAGES.NO_POSTS}
        isPostsFetching={isPostsFetching}
        {...postsListProps}
      />
    </>
  );
};

export default Profile;
