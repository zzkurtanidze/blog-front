import superagent from "superagent";
import superagentJsonapify from "superagent-jsonapify";
import axios from "axios";
import { toast } from "react-toastify";

superagentJsonapify(superagent);

const apiUrl = "http://localhost/omedia-exercise/web";

export const getLatestBlogs = async (limit = 10) => {
  try {
    const response = await superagent.get(
      `${apiUrl}/api/node/blog?sort=-created&page[limit]=${limit}&include=field_image,field_topic`
    );
    const body = response.body;
    const data = body;
    return data;
  } catch (err) {
    toast.error(err.message);
  }
};

export const getLatestBlogsOffset = async ({
  offset = "",
  limit = 10,
  search = "",
}) => {
  try {
    const response = await superagent.get(
      `${apiUrl}/api/node/blog?sort=-created&page[limit]=${limit}&include=field_image,field_topic&page[offset]=${offset}&filter[title][operator]=CONTAINS&filter[title][value]=${search}`
    );
    const body = response.body;
    const data = body;
    return data;
  } catch (err) {
    toast.error(err.message);
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await superagent.get(
      `${apiUrl}/api/node/blog/${id}?include=field_image,field_topic`
    );
    const body = response.body;
    const data = body;
    return data;
  } catch (err) {
    toast.error(err.status + " " + err.message);
  }
};

export const getBlogsByTopic = async (topic) => {
  const response = await superagent.get(
    `${apiUrl}/api/node/blog?filter[field_topic.name][value]=${topic}&include=field_image,field_topic`
  );
  const body = response.body;
  console.log(body);
  const data = body;
  return data;
};

export const getTopics = async () => {
  const response = await superagent.get(
    `${apiUrl}/api/taxonomy_term/topic?sort=weight`
  );
  const body = response.body;
  const data = body;
  return data;
};

export const getJWT = async ({
  username,
  password,
  client_id,
  client_secret,
  grant_type,
}) => {
  var auth = new FormData();
  auth.append("username", username);
  auth.append("password", password);
  auth.append("client_id", client_id);
  auth.append("client_secret", client_secret);
  auth.append("grant_type", grant_type);
  try {
    const { data } = await axios({
      method: "POST",
      url: `${apiUrl}/oauth/token`,
      data: auth,
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Successfully Authenticated");
    return data;
  } catch (err) {
    toast.error(err.message);
  }
};

export const getUser = () => {
  const token = localStorage.getItem("access_token") || null;
  return token;
};

export const uploadImage = async ({
  binaryStr = "",
  token = "",
  imgName = "uploaded_image.jpg",
}) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${apiUrl}/api/node/blog/field_image`,
      data: binaryStr,
      headers: {
        "Content-Type": "application/octet-stream",
        Authorization: token,
        "Content-Disposition": `file; filename="${imgName}"`,
      },
    });
    const body = response.data;
    const data = body.data;
    return data;
  } catch (err) {
    toast.error(err.message);
  }
};

export const newBlog = async ({ blog, token }) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${apiUrl}/api/node/blog`,
      data: {
        data: {
          type: "node--blog",
          attributes: {
            title: blog.title,
            body: {
              value: blog.body,
              format: "plain_text",
            },
          },
          relationships: {
            field_image: {
              data: {
                type: "file--file",
                id: blog.imageId,
              },
              meta: {
                alt: "test",
                title: "test",
                width: null,
                height: null,
              },
            },
            field_topic: {
              data: {
                type: "taxonomy_term--topic",
                id: "912e72cc-2c83-4d40-8a45-49dabe040380",
              },
            },
          },
        },
      },
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
        Authorization: token,
      },
    });
    console.log(response);
  } catch (err) {
    toast.error(err.message);
  }
};
