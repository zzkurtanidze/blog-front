import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import BlogListing from '../../components/BlogListing';
import BlogTeaser from '../../components/BlogTeaser';
import Slider from '../../components/Slider';
import Topics from '../../components/Topics';
import { getLatestBlogs, getTopics } from '../../services';

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [topics, setTopics] = useState([]);

  const background = useColorModeValue('solidWhite', 'dark');

  const getBlogs = async () => {
    const [{ data: blogs }, { data: topics }] = await Promise.all([
      getLatestBlogs(5),
      getTopics(),
    ]);
    setBlogs(blogs);
    setLatestBlogs(blogs.slice(0, 3));
    setTopics(topics);
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <>
      <Slider latestBlogs={latestBlogs} />
      <Flex py={50} px={100} background={background} borderTop="1px solid gray">
        <BlogListing blogs={blogs} />
        <Topics topics={topics} />
      </Flex>
    </>
  );
}
