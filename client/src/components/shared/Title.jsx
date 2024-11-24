import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "mine-chat",
  description = "networking and messaging platform",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
