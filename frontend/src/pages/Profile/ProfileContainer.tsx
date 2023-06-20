import { useFormik } from "formik";

import { useUserProfileCache } from "hooks";

import { useCreatePost, useGetPosts } from "api/posts";
import { getDataLength } from "utils/getDataLength";
import { Preloader } from "components/Loaders/Preloader";

import { INITIAL_VALUES } from "./constants";
import Profile from "./Profile";

const ProfileContainer = () => {
  const userProfile = useUserProfileCache();

  const userId = userProfile?._id;

  const { data, hasNextPage, fetchNextPage, isFetchedAfterMount } =
    useGetPosts(userId);

  const { isLoading: isCreatePostLoading, mutate: createPostMutate } =
    useCreatePost();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: (values, { resetForm }) => {
      createPostMutate(values);
      resetForm();
    },
  });

  const dataLength = getDataLength(data?.pages);

  const checkPosts = data?.pages?.[0].length;

  return isFetchedAfterMount ? (
    <Profile
      formik={formik}
      posts={data?.pages}
      checkPosts={checkPosts}
      dataLength={dataLength}
      isLoading={isCreatePostLoading}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  ) : (
    <Preloader />
  );
};

export default ProfileContainer;
