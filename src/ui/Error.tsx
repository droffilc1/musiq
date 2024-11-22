import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry! An unexpected error has occurred. 😢</p>
      <p>
        {isRouteErrorResponse(error)
          ? error.data || error.statusText
          : "Unknown error"}
      </p>
    </div>
  );
}

export default Error;