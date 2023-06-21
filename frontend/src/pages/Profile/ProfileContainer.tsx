import { useFormik } from "formik";

import { useUserProfileCache } from "hooks";

import { useCreatePost, useGetPosts } from "api/posts";

import { INITIAL_VALUES } from "./constants";
import Profile from "./Profile";

const ProfileContainer = () => {
  const userProfile = useUserProfileCache();

  const userId = userProfile?._id;

  const { data, hasNextPage, isFetchedAfterMount, fetchNextPage } = useGetPosts(userId);

  const { mutate: createPostMutate, isLoading: isCreatePostLoading } = useCreatePost();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: (values, { resetForm }) => {
      createPostMutate(values);
      resetForm();
    },
  });

  return (
    <Profile
      formik={formik}
      posts={data?.pages}
      isPostsFetching={!isFetchedAfterMount}
      isCreatePostLoading={isCreatePostLoading}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default ProfileContainer;
