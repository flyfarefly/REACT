import {useState} from 'react';
import {useGetPostsQuery, useDeletePostMutation} from '../store/slices/apiSlice';
import {Link} from 'react-router-dom';
import {Button, Container, List, ListItem, ListItemText, TextField} from '@mui/material';
import {css} from '@emotion/react';

const containerStyle = css`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const titleStyle = css`
    text-align: center;
    color: #333;
`;

const buttonStyle = css`
    margin: 10px;
`;

const listItemStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PostList = () => {
    const [limit, setLimit] = useState('');
    const [deletePost] = useDeletePostMutation();

    // Викликайте useGetPostsQuery завжди, але обробляйте дані умовно
    const {data: posts, error, isLoading, refetch} = useGetPostsQuery(limit >= 0 ? limit : undefined);

    if (limit <= 0) {
        return (
            <Container css={containerStyle}>
                {/* eslint-disable-next-line react/no-unknown-property */}
                <h1 css={titleStyle}>Post List</h1>
                <TextField
                    label="Number of posts"
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    variant="outlined"
                    css={buttonStyle}
                />
                <Button variant="contained" color="primary" css={buttonStyle} onClick={refetch}>
                    Refresh
                </Button>
                <Link to="/add">
                    <Button variant="contained" color="primary" css={buttonStyle}>
                        Add Post
                    </Button>
                </Link>
                <div>No posts to display</div>
            </Container>
        );
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading posts</div>;

    return (
        <Container css={containerStyle}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <h1 css={titleStyle}>Post List</h1>
            <TextField
                label="Number of posts"
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                variant="outlined"
                css={buttonStyle}
            />
            <Button variant="contained" color="primary" css={buttonStyle} onClick={refetch}>
                Refresh
            </Button>
            <Link to="/add">
                <Button variant="contained" color="primary" css={buttonStyle}>
                    Add Post
                </Button>
            </Link>
            <List>
                {posts.map((post) => (
                    <ListItem key={post.id} css={listItemStyle}>
                        <ListItemText primary={post.title} secondary={post.body}/>
                        <div>
                            <Link to={`/edit/${post.id}`}>
                                <Button variant="contained" color="secondary" css={buttonStyle}>
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                variant="contained"
                                color="error"
                                css={buttonStyle}
                                onClick={() => deletePost(post.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default PostList;
