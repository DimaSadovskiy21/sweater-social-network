import { useFormik } from "formik";

import { useCreatePost, useGetMyPosts } from "api/posts";

import { INITIAL_VALUES } from "./constants";
import Profile from "./Profile";

const ProfileContainer = () => {
  const { data, hasNextPage, fetchNextPage } = useGetMyPosts();

  const { isLoading, mutate: createPost } = useCreatePost();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: (values, { resetForm }) => {
      createPost(values);
      resetForm({ values: INITIAL_VALUES });
    },
  });

  const dataLength =
    data?.pages.reduce((total, page) => total + page.length, 0) || 0;

  return (
    <Profile
      formik={formik}
      posts={data?.pages}
      dataLength={dataLength}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default ProfileContainer;
