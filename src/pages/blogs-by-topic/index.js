import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BlogTeaser from '../../components/BlogTeaser';
import { getBlogsByTopic } from '../../services/index';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function BlogsByTopicPage({ match }) {
  const [blogs, setBlogs] = useState();
  const [bookmarkedBlogs, setBookmarkedBlogs] = useLocalStorage(
    'bookmarks',
    []
  );

  const topic = match.params.topic;

  const getBlogs = async () => {
    const { data: blogs } = await getBlogsByTopic(topic);
    setBlogs(blogs);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Box w={'60%'} m={'auto'} mt={'80px'}>
      {blogs &&
        blogs.map(blog => (
          <BlogTeaser
            blog={blog}
            bookmarkedBlogs={bookmarkedBlogs}
            setBookmarkedBlogs={setBookmarkedBlogs}
          />
        ))}
    </Box>
  );
}
