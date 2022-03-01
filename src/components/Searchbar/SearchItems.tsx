import { Avatar } from "@chakra-ui/avatar";
import { Flex } from "@chakra-ui/layout";
import { Group, Post, User } from "../../types";

interface UserSearchProps {
  users: User[];
}

export const UserSearch: React.FC<UserSearchProps> = ({ users }) => {
  if (users.length == 0) {
    return <div>No such users</div>;
  }
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
  if (groups.length == 0) {
    return <div>No such Groups</div>;
  }
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
  if (posts.length == 0) {
    return <div>No such posts</div>;
  }
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
