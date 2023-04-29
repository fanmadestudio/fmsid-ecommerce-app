import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
        Product Collection
      </h2>

      <p className="my-4 max-w-md text-gray-500">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
        praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
        natus?
      </p>
    </>
  );
};

export default Header;
