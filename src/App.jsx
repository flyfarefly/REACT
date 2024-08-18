import { Routes, Route } from 'react-router-dom';
import PostList from './components/PostList.jsx';
import AddPost from './components/AddPost.jsx';
import EditPost from './components/EditPost.jsx';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/add" element={<AddPost />} />
                <Route path="/edit/:id" element={<EditPost />} />
            </Routes>
        </>
    );
};

export default App;
