import React from "react";

type IndexProps = {
  name: string;
};
const Index = ({ name }: IndexProps) => {
  return (
    <div>
      <p>Hello {name}!</p>
    </div>
  );
};

export default Index;
