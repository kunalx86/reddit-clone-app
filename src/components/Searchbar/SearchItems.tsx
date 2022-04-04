import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { darken } from "@chakra-ui/theme-tools";
import { useRouter } from "next/dist/client/router";
import { Group, Post, User } from "../../types";

interface UserSearchProps {
  users: User[];
}

export const UserSearch: React.FC<UserSearchProps> = ({ users }) => {
  if (users.length == 0) {
    return <div>No such users</div>;
  }
  return (
    <Flex direction="column" width="inherit">
      Users
      <Flex direction="column" width="full" p={2} mr="inherit">
        {(users || []).map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </Flex>
    </Flex>
  );
};

const UserItem: React.FC<{ user: User }> = ({ user }) => (
  <Flex
    _hover={{
      backgroundColor: "gray.100",
    }}
    direction="row"
    border="1px"
    borderRadius="md"
    mt={1}
    p={2}
  >
    <Flex direction="row" p={1} alignContent="center" justifyContent="center">
      <Avatar src={user?.profile?.profilePicture} width="24px" height="24px" />
      <Flex direction="column" justifyContent="center" p={2}>
        {user?.username}
        <Text>{user?.profile?.bio}</Text>
      </Flex>
    </Flex>
  </Flex>
);

interface GroupSearchProps {
  groups: Group[];
}

export const GroupSearch: React.FC<GroupSearchProps> = ({ groups }) => {
  if (groups.length == 0) {
    return <div>No such Groups</div>;
  }
  return (
    <Flex direction="column" width="inherit">
      Groups
      <Flex direction="column" p={2}>
        {groups.map((group) => (
          <GroupItem key={group.id} group={group} />
        ))}
      </Flex>
    </Flex>
  );
};

const GroupItem: React.FC<{ group: Group }> = ({ group }) => (
  <Flex
    _hover={{
      backgroundColor: "gray.100",
    }}
    direction="row"
    border="1px"
    borderRadius="md"
    mt={1}
    p={2}
  >
    <Flex direction="row" p={1} alignContent="center" justifyContent="center">
      <Avatar src={group.profile.profilePicture} />
      <Flex direction="column" justifyContent="center" p={2}>
        {group.name}
        <Text>{group.profile.bio}</Text>
      </Flex>
    </Flex>
  </Flex>
);

interface PostSearchProps {
  posts: Post[];
}

export const PostSearch: React.FC<PostSearchProps> = ({ posts }) => {
  if (posts.length == 0) {
    return <div>No such posts</div>;
  }
  return (
    <Flex direction="column" width="inherit">
      Posts
      <Flex direction="column" p={2}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Flex>
    </Flex>
  );
};

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const router = useRouter();
  return (
    <Flex
      _hover={{
        backgroundColor: "gray.100",
      }}
      direction="row"
      border="1px"
      borderRadius="md"
      onClick={() => router.push(`/posts/${post.id}`)}
      mt={1}
      p={2}
    >
      <Flex direction="row" p={1} alignContent="center" justifyContent="center">
        <Flex direction="row" justifyContent="center" p={2}>
          {post.media.type === "IMAGE" ? (
            <Image height="32px" width="32px" src={post.media.mediaUrl} />
          ) : null}
          <Flex direction="column">
            <Text ml={2}>{post.title}</Text>
            {post.media.type === "TEXT" ? (
              <Text>{post.media.mediaText}</Text>
            ) : null}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
