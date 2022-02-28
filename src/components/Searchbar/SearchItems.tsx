import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import { Group, Post, User } from "../../types";

interface UserSearchProps {
  users: User[];
}

export const UserSearch: React.FC<UserSearchProps> = ({ users }) => {
  return (
    <div>
      Users
      <Flex
        direction="column"
        p={2}
        border="1px"
        borderColor="gray.300"
        borderRadius="2xl"
        width="56"
      >
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </Flex>
    </div>
  );
};

const UserItem: React.FC<{ user: User }> = ({ user }) => (
  <div>
    <Flex direction="row" p={2} alignContent="center">
      <Avatar src={user.profile.profilePicture} />
      {user.username}
    </Flex>
  </div>
);

interface GroupSearchProps {
  groups: Group[];
}

export const GroupSearch: React.FC<GroupSearchProps> = ({ groups }) => {
  return (
    <div>
      Groups
      <Flex
        direction="column"
        p={2}
        border="1px"
        borderColor="gray.300"
        borderRadius="2xl"
      >
        {groups.map((group) => (
          <div key={group.id}>{group.name}</div>
        ))}
      </Flex>
    </div>
  );
};

interface PostSearchProps {
  posts: Post[];
}

export const PostSearch: React.FC<PostSearchProps> = ({ posts }) => {
  return (
    <div>
      Posts
      <Flex
        direction="column"
        p={2}
        border="1px"
        borderColor="gray.300"
        borderRadius="2xl"
      >
        {posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </Flex>
    </div>
  );
};
