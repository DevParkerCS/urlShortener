import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const UrlRedirect = () => {
  const { id } = useParams();
  useEffect(() => {
    moveToExternal();
  }, []);

  const moveToExternal = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/${id}`);
      const url = response.data;
      window.location.href =
        url.startsWith("http://") || url.startsWith("https://")
          ? url
          : "https://" + url;
    } catch (e) {
      return <h1>Page Not Found</h1>;
    }
  };

  return <div></div>;
};
