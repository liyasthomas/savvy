import React from "react";
export default function About() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">
        Build better products with customer feedback
      </h1>
      <p className="py-4 md:w-3/5">
        Savvy is a scalable serverless customer feedback app - built with AWS
        Amplify, AWS AppSync, and Amazon DynamoDB on{" "}
        <a
          href="https://townhall.hashnode.com/announcing-aws-amplify-hackathon-on-hashnode"
          target="_blank"
          className="text-indigo-500 hover:text-indigo-600"
          rel="noopener noreferrer"
        >
          AWS Amplify Hackathon by Hashnode
        </a>
        .
        <br />
        <br />
        <a
          href="https://github.com/liyasthomas/savvy"
          target="_blank"
          className="text-indigo-500 hover:text-indigo-600"
          rel="noopener noreferrer"
        >
          GitHub repository
        </a>
      </p>
    </div>
  );
}
