import React from "react";
import Subscribe from "src/components/Subscribe";

const App = () => {
  return (
    <div>
      <Subscribe
        title={"Subscribe to newsletter"}
        description={
          "Be the first to know about new IT books, upcoming releases, exclusive offers and more"
        }
      />
    </div>
  );
};

export default App;
