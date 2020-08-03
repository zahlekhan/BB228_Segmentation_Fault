import React from "react";
import UserContext from "../contexts/UserContext";

const WithContexts = (OriginalComponent) => {
  return function contextComponent(props) {
    return (
      <UserContext.Consumer>
        {(context) => <OriginalComponent {...props} context={context} />}
      </UserContext.Consumer>
    );
  };
};

export default WithContexts;
