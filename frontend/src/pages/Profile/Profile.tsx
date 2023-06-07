import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Button } from "components/Button";
import { Post } from "components/Post";
import { Preloader } from "components/Loaders/Preloader";

import { IAddPostValues, IProfileProps } from "./types";
import { AddPostField, AddPostForm, PostsContainer } from "./styles";
import { PageWrapper } from "../styles";

const Profile: FC<IProfileProps<IAddPostValues>> = ({
  formik,
  posts,
  dataLength,
  isLoading,
  hasNextPage,
  fetchNextPage,
}) => {
  const { values, handleSubmit, handleChange } = formik;

  return (
    <PageWrapper>
      <AddPostForm onSubmit={handleSubmit}>
        <AddPostField
          name="content"
          value={values.content}
          onChange={handleChange}
          placeholder="enter the content..."
          disabled={isLoading}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading || !values.content.trim()}
        >
          Add Post
        </Button>
      </AddPostForm>
      <PostsContainer>
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={<Preloader />}
          dataLength={dataLength}
        >
          {posts?.map((page) =>
            page.map((post) => <Post key={post._id} {...post} />)
          )}
        </InfiniteScroll>
      </PostsContainer>
    </PageWrapper>
  );
};

export default Profile;
