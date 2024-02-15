import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { withAuth0 } from "@netlify/auth0";
import connection from "@netlify/planetscale";

export const handler: Handler = withAuth0(
  async (event: HandlerEvent, context: HandlerContext) => {

    const { rows: users } = await connection.execute("SELECT * FROM  users");

    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  },
  {
    auth0: {
      required: true,
    },
  }
);
