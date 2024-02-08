
import S3 from "@/components/resume-forms/S3";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  const response = await fetch(`${process.env.URL}/api/resume`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
  const body = await response.json()
  
  return <S3 />;
};

export default Page;
